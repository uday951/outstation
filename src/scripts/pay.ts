import { validatePayment } from '../lib/payment';
import type { Errors, Fields } from '../lib/enquiry';

declare global {
  interface Window { Cashfree?: (o: { mode: string }) => { checkout: (o: { paymentSessionId: string; redirectTarget: string }) => Promise<unknown> }; }
}

const SDK_URL = 'https://sdk.cashfree.com/js/v3/cashfree.js';

const failureText: Record<string, string> = {
  not_configured: 'Online payment is not available right now.',
  gateway_error: 'The payment provider could not start this payment.',
  rate_limited: 'Too many attempts were made from this connection.',
  sdk: 'The secure checkout could not load. Please check your connection.',
  network: 'We could not reach our server. Please check your connection.',
};

// Loaded only when someone actually pays, so no third-party script runs on any other visit.
function loadSdk() {
  return new Promise<void>((resolve, reject) => {
    if (window.Cashfree) return resolve();
    const s = document.createElement('script');
    s.src = SDK_URL;
    s.onload = () => (window.Cashfree ? resolve() : reject(new Error('sdk')));
    s.onerror = () => reject(new Error('sdk'));
    document.head.append(s);
  });
}

const form = document.querySelector<HTMLFormElement>('form[data-pay]');
if (form) {
  form.noValidate = true;
  const submit = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  const label = submit.querySelector<HTMLElement>('[data-label]')!;
  const idle = label.textContent ?? '';
  let attempted = false;

  // A coordinator can send a link such as /pay?ref=BA-261104-9FEF&amount=5000
  const q = new URLSearchParams(location.search);
  const refInput = form.querySelector<HTMLInputElement>('[name=reference]')!;
  const amountInput = form.querySelector<HTMLInputElement>('[name=amount]')!;
  if (q.get('ref')) refInput.value = q.get('ref')!;
  if (q.get('amount')) amountInput.value = q.get('amount')!;

  const read = (): Fields => {
    const out: Fields = {};
    new FormData(form).forEach((v, k) => { if (typeof v === 'string') out[k] = v; });
    return out;
  };

  const paint = (errors: Errors) => {
    form.querySelectorAll<HTMLElement>('.field').forEach((f) => {
      const input = f.querySelector<HTMLInputElement>('input');
      const slot = f.querySelector<HTMLElement>('.error');
      if (!input || !slot) return;
      const msg = errors[input.name];
      slot.textContent = msg ?? '';
      if (msg) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    });
  };

  const summary = (errors: Errors) => {
    const box = form.querySelector<HTMLElement>('[data-summary]')!;
    const order = [...form.elements].map((el) => (el as HTMLInputElement).name);
    const keys = Object.keys(errors).sort((a, b) => order.indexOf(a) - order.indexOf(b));
    if (!keys.length) { box.hidden = true; return; }
    box.innerHTML = '';
    const h = document.createElement('h3');
    h.textContent = keys.length === 1 ? 'One detail needs fixing' : `${keys.length} details need fixing`;
    const ul = document.createElement('ul');
    keys.forEach((k) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${form.id}-${k}`;
      a.textContent = errors[k];
      li.append(a);
      ul.append(li);
    });
    box.append(h, ul);
    box.hidden = false;
    box.focus();
  };

  const busy = (on: boolean) => {
    submit.disabled = on;
    if (on) {
      submit.setAttribute('aria-busy', 'true');
      label.textContent = 'Opening secure payment…';
      const s = document.createElement('span');
      s.className = 'spinner';
      s.setAttribute('aria-hidden', 'true');
      submit.prepend(s);
    } else {
      submit.removeAttribute('aria-busy');
      label.textContent = idle;
      submit.querySelector('.spinner')?.remove();
    }
  };

  const fail = (code: string) => {
    const box = form.querySelector<HTMLElement>('[data-failure]')!;
    box.querySelector<HTMLElement>('[data-failure-text]')!.textContent = failureText[code] ?? failureText.gateway_error;
    box.hidden = false;
    box.focus();
  };

  form.addEventListener('input', () => { if (attempted) paint(validatePayment(read())); });

  // Coming back from Cashfree with the Back button restores this page as it was, so reset the button.
  window.addEventListener('pageshow', (e) => { if (e.persisted) busy(false); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    attempted = true;
    form.querySelector<HTMLElement>('[data-failure]')!.hidden = true;
    const fields = read();
    const errors = validatePayment(fields);
    paint(errors);
    summary(errors);
    if (Object.keys(errors).length) return;

    busy(true);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json().catch(() => ({}));
      if (data.code === 'invalid' && data.errors) { paint(data.errors); summary(data.errors); busy(false); return; }
      if (!res.ok || !data.ok) { fail(data.code ?? 'gateway_error'); busy(false); return; }

      try {
        await loadSdk();
      } catch {
        fail('sdk');
        busy(false);
        return;
      }
      // Cashfree takes over this tab, then sends the customer to /pay/status.
      const result = (await window.Cashfree!({ mode: data.mode }).checkout({ paymentSessionId: data.paymentSessionId, redirectTarget: '_self' })) as { error?: unknown } | undefined;
      if (result?.error) { fail('gateway_error'); busy(false); }
    } catch {
      fail('network');
      busy(false);
    }
  });
}
