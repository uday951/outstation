// JSON-LD builders. Only states facts the business has published.
// Deliberately absent: aggregateRating, reviews, medical credentials, FAQPage
// (Google retired FAQ rich results in May 2026) and geo coordinates
// (the reference site's coordinates are the city centre, not the LB Nagar address).
import { business } from '../data/business';

export const orgId = (site: string) => `${site}/#organization`;

export function organization(site: string) {
  return {
    '@type': 'MedicalBusiness',
    '@id': orgId(site),
    additionalType: 'https://en.wikipedia.org/wiki/Ambulance',
    name: business.name,
    alternateName: business.operator,
    url: site,
    logo: `${site}/logo.png`,
    image: `${site}/og.jpg`,
    telephone: business.phoneE164,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    hasMap: business.mapsUrl,
    areaServed: [
      { '@type': 'City', name: 'Hyderabad' },
      { '@type': 'City', name: 'Secunderabad' },
      { '@type': 'Country', name: 'India', description: 'Outstation patient transfers originating from Hyderabad, arranged case by case.' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.phoneE164,
      contactType: 'customer support',
      areaServed: 'IN',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    founder: { '@type': 'Person', name: business.founder },
    taxID: business.gstin,
    subOrganization: business.brands.map((b) => ({ '@type': 'Organization', name: b.name, url: b.url })),
  };
}

export function website(site: string) {
  return { '@type': 'WebSite', '@id': `${site}/#website`, url: site, name: business.name, publisher: { '@id': orgId(site) } };
}

export function webpage(site: string, url: string, name: string, description: string, type = 'WebPage') {
  return { '@type': type, '@id': `${url}#webpage`, url, name, description, isPartOf: { '@id': `${site}/#website` }, about: { '@id': orgId(site) }, inLanguage: 'en-IN' };
}

export function breadcrumbs(site: string, items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${site}${c.href === '/' ? '' : c.href}` })),
  };
}

export function service(site: string, url: string, name: string, description: string, serviceType: string, area: unknown) {
  return { '@type': 'Service', '@id': `${url}#service`, name, description, serviceType, url, provider: { '@id': orgId(site) }, areaServed: area };
}

export function article(site: string, url: string, headline: string, description: string, published: string, modified: string) {
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline,
    description,
    url,
    datePublished: published,
    dateModified: modified,
    image: `${site}/og.jpg`,
    author: { '@id': orgId(site) },
    publisher: { '@id': orgId(site) },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    inLanguage: 'en-IN',
  };
}
