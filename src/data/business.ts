// Single source of truth for business details. Every phone link, WhatsApp link,
// footer line and schema block reads from here, so a change here changes the whole site.
// Source: bestambulance.in (crawled 4 Nov 2026); reuse authorized by the site owner.

export const business = {
  name: 'Outstation Ambulance',
  shortName: 'Outstation Ambulance',
  // The registered operator. GSTIN and PAN below belong to it, so it stays named beside them.
  operator: 'Best Ambulance Service',
  phoneE164: '+918821084108',
  phoneDisplay: '+91 88210 84108',
  whatsappNumber: '918821084108',
  email: 'care@bestambulance.in',
  address: {
    // Published in the reference site's structured data, not in its visible pages.
    street: 'H. No. 5-5-871, Chintalkunta Check Post Bus Stop, near NASA Hospitals, LB Nagar',
    locality: 'Hyderabad',
    region: 'Telangana',
    postalCode: '500074',
    country: 'IN',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('5-5-871, Chintalkunta Check Post Bus Stop, LB Nagar, Hyderabad 500074'),
  hours: '24 hours, 7 days a week',
  gstin: '36BRNPJ8525Q1ZV',
  pan: 'BRNPJ8525Q',
  founder: 'Lucky',
  brands: [
    { name: 'Dhanush Ambulance', url: 'https://dhanushambulance.site', note: 'Emergency ambulance and patient transport.' },
    { name: 'Dead Body Freezer Box Hyderabad', url: 'https://deadbodyfreezerboxhyd.in', note: 'Freezer box and funeral support.' },
    { name: 'Ambulance Service 24x7', url: 'https://ambulanceservice24x7.in', note: 'Emergency response and patient transportation.' },
  ],
} as const;

export const telHref = `tel:${business.phoneE164}`;

export function waHref(message?: string) {
  const base = `https://wa.me/${business.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const fullAddress = `${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}`;
