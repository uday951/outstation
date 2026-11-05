// Shared by the browser and the server, so both enforce the same rules.
import { normalisePhone, type Errors, type Fields } from './enquiry';

// A guard against typing mistakes, not a business rule. Larger amounts are arranged by phone.
export const MIN_ADVANCE = 100;
export const MAX_ADVANCE = 200000;

export const ORDER_ID_PATTERN = /^BA-PAY-\d{6}-[A-F0-9]{10}$/;

/** Cashfree wants a plain 10-digit Indian mobile number. */
export const tenDigitPhone = (raw: string) => normalisePhone(raw).replace(/^(\+?91|0)(?=\d{10}$)/, '');

export function validatePayment(f: Fields): Errors {
  const e: Errors = {};
  const val = (k: string) => (f[k] ?? '').trim();

  if (val('name').length < 3 || val('name').length > 80) e.name = 'Enter the name of the person paying.';
  if (!/^[6-9]\d{9}$/.test(tenDigitPhone(val('phone')))) e.phone = 'Enter a 10-digit Indian mobile number, for example 98765 43210.';
  if (val('email') && !/^[^\s@]{1,64}@[^\s@]+\.[^\s@]+$/.test(val('email'))) e.email = 'Enter a valid email address, or leave this empty.';
  if (val('reference') && !/^[A-Za-z0-9 _\/-]{1,40}$/.test(val('reference'))) e.reference = 'Use only letters, numbers and dashes, up to 40 characters.';

  const amount = val('amount');
  if (!/^\d+(\.\d{1,2})?$/.test(amount)) e.amount = 'Enter the advance amount in rupees, for example 2000.';
  else if (Number(amount) < MIN_ADVANCE) e.amount = `The minimum online payment is ₹${MIN_ADVANCE}.`;
  else if (Number(amount) > MAX_ADVANCE) e.amount = `For more than ₹${MAX_ADVANCE.toLocaleString('en-IN')}, please call us to arrange payment.`;

  if (val('agree') !== 'yes') e.agree = 'Please confirm you have read the refund and cancellation policies.';
  return e;
}
