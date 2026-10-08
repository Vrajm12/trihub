/**
 * Site-wide settings and company facts. Company details mirror
 * https://triversesolutions.co.in — keep the two in sync.
 *
 * demoEndpoint: optional POST endpoint (Formspree, a CRM webhook, your own API)
 * that receives demo requests as JSON. When empty, the form opens a pre-filled
 * email to contactEmail instead.
 */
export const site = {
  name: 'Trihub',
  url: 'https://trihub.tech',
  contactEmail: 'support@trihub.tech',
  demoEndpoint: '' as string,
}

export const company = {
  name: 'Triverse Solutions',
  legalName: 'Triverse Solutions Private Limited',
  url: 'https://triversesolutions.co.in',
  email: 'hello@triversesolutions.co.in',
  phone: '+91 84465 52477',
  cin: 'U62010PN2026PTC258471',
  udyam: 'UDYAM-MH-26-1089081',
  foundingYear: 2024,
  address: {
    street: 'Office No. 4, Sai Complex',
    locality: 'Kamshet',
    postalCode: '410405',
    region: 'Maharashtra',
    country: 'IN',
    countryName: 'India',
  },
  sameAs: [
    'https://www.linkedin.com/company/triverse-solutions',
    'https://x.com/triversesol',
    'https://www.instagram.com/triversesolutions',
    'https://www.youtube.com/@triversesolutions',
    'https://github.com/triverse-solutions',
  ],
}

export const addressLine = `${company.address.street}, ${company.address.locality} ${company.address.postalCode}, ${company.address.region}, ${company.address.countryName}`
