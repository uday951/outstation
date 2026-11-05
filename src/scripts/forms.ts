// Progressive enhancement for enquiry forms. Without JavaScript the forms post normally
// and the server answers with a real result page.
import { validate, whatsappText, type FormType, type Fields, type Errors } from '../lib/enquiry';

const LABEL_FALLBACK = 'This field';

function read(form: HTMLFormElement): Fields {
  const out: Fields = {};
  new FormData(form).forEach((v, k) => { if (typeof v === 'string') out[k] = v; });
  return out;
}

function paintErrors(form: HTMLFormElement, errors: Errors) {
  form.querySelectorAll<HTMLElement>('.field').forEach((f) => {
    const input = f.querySelector<HTMLInputElement>('input,select,textarea');
    const slot = f.querySelector<HTMLElement>('.error');
    if (!input || !slot) return;
    const msg = errors[input.name];
    slot.textContent = msg ?? '';
    if (msg) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  });
}

function showSummary(form: HTMLFormElement, errors: Errors) {
  const box = form.querySelector<HTMLElement>('[data-summary]')!;
  // List problems in the order the visitor sees the fields.
  const order = [...form.elements].map((el) => (el as HTMLInputElement).name);
  const keys = Object.keys(errors).sort((x, y) => order.indexOf(x) - order.indexOf(y));
  if (!keys.length) { box.hidden = true; return; }
  box.innerHTML = '';
  const h = document.createElement('h3');
  h.textContent = keys.length === 1 ? 'One detail needs fixing' : `${keys.length} details need fixing`;
  const ul = document.createElement('ul');
  keys.forEach((k) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${form.id}-${k}`;
    a.textContent = errors[k] || LABEL_FALLBACK;
    li.append(a);
    ul.append(li);
  });
  box.append(h, ul);
  box.hidden = false;
  box.focus();
}

function setBusy(btn: HTMLButtonElement, busy: boolean) {
  const label = btn.querySelector<HTMLElement>('[data-label]')!;
  if (busy) {
    btn.dataset.idle = label.textContent ?? '';
    label.textContent = 'Sending…';
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
    const s = document.createElement('span');
    s.className = 'spinner';
    s.setAttribute('aria-hidden', 'true');
    btn.prepend(s);
  } else {
    label.textContent = btn.dataset.idle ?? label.textContent;
    btn.removeAttribute('aria-busy');
    btn.disabled = false;
    btn.querySelector('.spinner')?.remove();
  }
}

const failureText: Record<string, string> = {
  rate_limited: 'Too many requests were sent from this connection. Please call or WhatsApp us instead.',
  not_configured: 'Our online form is not able to send requests right now.',
  delivery_failed: 'We could not deliver your request just now.',
  network: 'Your request could not be sent. Please check your connection.',
};

function showFailure(form: HTMLFormElement, code: string) {
  const box = form.querySelector<HTMLElement>('[data-failure]')!;
  box.querySelector<HTMLElement>('[data-failure-text]')!.textContent = failureText[code] ?? failureText.delivery_failed;
  const wa = box.querySelector<HTMLAnchorElement>('[data-wa-fallback]');
  if (wa) wa.href = `${wa.dataset.base}?text=${encodeURIComponent(whatsappText(read(form)))}`;
  box.hidden = false;
  box.focus();
}

function showSuccess(form: HTMLFormElement, reference: string) {
  const tpl = form.parentElement!.querySelector<HTMLElement>('[data-success]')!;
  tpl.querySelector<HTMLElement>('[data-ref]')!.textContent = reference;
  form.hidden = true;
  tpl.hidden = false;
  tpl.focus();
  tpl.scrollIntoView({ block: 'center' });
}

document.querySelectorAll<HTMLFormElement>('form[data-enquiry]').forEach((form) => {
  form.noValidate = true;
  const type = form.dataset.enquiry as FormType;
  const submit = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  let attempted = false;

  // Prefill from links such as /book?to=Chennai&type=ICU%20ambulance
  const q = new URLSearchParams(location.search);
  const dest = form.querySelector<HTMLInputElement>('[name=destination]');
  if (dest && q.get('to') && !dest.value) dest.value = q.get('to')!;
  const amb = form.querySelector<HTMLSelectElement>('[name=ambulanceType]');
  if (amb && q.get('type')) { const opt = [...amb.options].find((o) => o.value === q.get('type')); if (opt) amb.value = opt.value; }
  const page = form.querySelector<HTMLInputElement>('[name=page]');
  if (page) page.value = location.pathname;

  // Once someone has tried to submit, keep errors in step as they correct them.
  form.addEventListener('input', () => { if (attempted) paintErrors(form, validate(type, read(form))); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    attempted = true;
    form.querySelector<HTMLElement>('[data-failure]')!.hidden = true;
    const fields = read(form);
    const errors = validate(type, fields);
    paintErrors(form, errors);
    showSummary(form, errors);
    if (Object.keys(errors).length) return;

    setBusy(submit, true);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, formType: type }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) return showSuccess(form, data.reference);
      if (data.code === 'invalid' && data.errors) {
        paintErrors(form, data.errors);
        showSummary(form, data.errors);
        return;
      }
      showFailure(form, data.code ?? 'delivery_failed');
    } catch {
      showFailure(form, 'network');
    } finally {
      setBusy(submit, false);
    }
  });

  // "Send on WhatsApp instead": opens WhatsApp with what has been typed so far.
  form.querySelector<HTMLAnchorElement>('[data-wa-send]')?.addEventListener('click', (e) => {
    const a = e.currentTarget as HTMLAnchorElement;
    a.href = `${a.dataset.base}?text=${encodeURIComponent(whatsappText(read(form)))}`;
  });

  // Optional: fill the pickup with the visitor's location. Only runs on an explicit tap.
  const loc = form.querySelector<HTMLButtonElement>('[data-use-location]');
  if (loc) {
    if (!('geolocation' in navigator)) loc.hidden = true;
    loc.addEventListener('click', () => {
      const pickup = form.querySelector<HTMLInputElement>('[name=pickup]')!;
      const original = loc.textContent;
      loc.textContent = 'Finding your location…';
      navigator.geolocation.getCurrentPosition(
        (p) => {
          pickup.value = `Current location: https://maps.google.com/?q=${p.coords.latitude.toFixed(5)},${p.coords.longitude.toFixed(5)}`;
          loc.textContent = original;
          pickup.dispatchEvent(new Event('input', { bubbles: true }));
        },
        () => { loc.textContent = 'Location unavailable. Please type the address.'; },
        { timeout: 10000, maximumAge: 60000 },
      );
    });
  }
});
