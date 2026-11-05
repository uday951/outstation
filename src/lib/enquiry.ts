// Shared by the browser form script and the server endpoint, so both enforce the same rules.

export type FormType = 'booking' | 'callback' | 'contact';
export type Fields = Record<string, string>;
export type Errors = Record<string, string>;

export const ambulanceTypes = [
  'Not sure, please advise',
  'Basic (BLS) ambulance',
  'Oxygen ambulance',
  'Advanced (ALS) ambulance',
  'ICU ambulance',
  'Ventilator ambulance',
  'Neonatal ambulance',
  'Freezer box / dead body transport',
];

export const patientConditions = [
  'Stable, needs help travelling',
  'Stable, but needs monitoring',
  'Critical or in ICU now',
  'Not sure, the doctor will advise',
  'Not applicable (deceased transport)',
];

export const supportNeeds = ['None', 'Oxygen', 'Ventilator', 'Not sure yet'];
export const companionOptions = ['0', '1', '2', '3', '4 or more'];
export const contactTopics = ['Outstation ambulance', 'ICU / hospital transfer', 'Scheduled patient transport', 'Freezer box service', 'Standby or contract', 'Something else'];
export const callbackWindows = ['As soon as possible', 'Within 2 hours', 'This evening', 'Tomorrow morning'];

const LIMITS: Record<string, number> = { name: 80, phone: 20, email: 120, pickup: 200, destination: 200, notes: 1000, message: 1000 };

export const normalisePhone = (raw: string) => raw.replace(/[\s\-().]/g, '');
const phoneOk = (raw: string) => /^(\+?91|0)?[6-9]\d{9}$/.test(normalisePhone(raw));

/** Today's date (yyyy-mm-dd) in India, whatever timezone the code runs in. */
export function todayIST(now = new Date()) {
  return new Date(now.getTime() + 5.5 * 3600_000).toISOString().slice(0, 10);
}

export function validate(type: FormType, f: Fields, now = new Date()): Errors {
  const e: Errors = {};
  const val = (k: string) => (f[k] ?? '').trim();

  if (val('name').length < 2) e.name = 'Enter a contact name.';
  if (!val('phone')) e.phone = 'Enter a phone number so we can call you back.';
  else if (!phoneOk(val('phone'))) e.phone = 'Enter a 10-digit Indian mobile number, for example 98765 43210.';

  if (type === 'booking') {
    if (val('pickup').length < 3) e.pickup = 'Enter the pickup hospital, area or address.';
    if (val('destination').length < 3) e.destination = 'Enter the destination city and address.';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(val('date'))) e.date = 'Choose the journey date.';
    else if (val('date') < todayIST(now)) e.date = 'The journey date cannot be in the past.';
    if (val('time') && !/^([01]\d|2[0-3]):[0-5]\d$/.test(val('time'))) e.time = 'Enter a valid time, or leave this empty.';
    if (!patientConditions.includes(val('condition'))) e.condition = 'Choose the option closest to the patient’s condition.';
    if (!ambulanceTypes.includes(val('ambulanceType'))) e.ambulanceType = 'Choose an ambulance type, or “Not sure”.';
    if (val('support') && !supportNeeds.includes(val('support'))) e.support = 'Choose one of the options.';
    if (val('companions') && !companionOptions.includes(val('companions'))) e.companions = 'Choose one of the options.';
  }
  if (type === 'callback') {
    if (val('window') && !callbackWindows.includes(val('window'))) e.window = 'Choose one of the options.';
  }
  if (type === 'contact') {
    if (val('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) e.email = 'Enter a valid email address, or leave this empty.';
    if (val('message').length < 5) e.message = 'Tell us briefly how we can help.';
    if (val('topic') && !contactTopics.includes(val('topic'))) e.topic = 'Choose one of the options.';
  }
  for (const [k, max] of Object.entries(LIMITS)) {
    if (val(k).length > max && !e[k]) e[k] = `Please keep this under ${max} characters.`;
  }
  return e;
}

const LABELS: Record<string, string> = {
  name: 'Contact name', phone: 'Phone', email: 'Email', pickup: 'Pickup', destination: 'Destination', date: 'Journey date',
  time: 'Departure time', condition: 'Patient condition', ambulanceType: 'Ambulance type', support: 'Oxygen / ventilator',
  companions: 'Family travelling', notes: 'Additional requirements', topic: 'Topic', message: 'Message', window: 'Best time to call',
  page: 'Sent from', amount: 'Amount', reference: 'Booking reference', orderId: 'Payment reference',
};

export function summarise(f: Fields) {
  return Object.entries(LABELS)
    .filter(([k]) => (f[k] ?? '').trim())
    .map(([k, label]) => `${label}: ${f[k].trim()}`)
    .join('\n');
}

/** Prefilled WhatsApp text built from whatever the visitor has typed so far. */
export function whatsappText(f: Fields) {
  const lines = ['Hello, I would like to request an outstation ambulance.'];
  const add = (label: string, k: string) => { if ((f[k] ?? '').trim()) lines.push(`${label}: ${f[k].trim()}`); };
  add('Name', 'name'); add('Phone', 'phone'); add('Pickup', 'pickup'); add('Destination', 'destination');
  add('Date', 'date'); add('Departure time', 'time'); add('Patient condition', 'condition');
  add('Ambulance type', 'ambulanceType'); add('Oxygen / ventilator', 'support');
  add('Family travelling', 'companions'); add('Other requirements', 'notes'); add('Message', 'message');
  return lines.join('\n');
}
