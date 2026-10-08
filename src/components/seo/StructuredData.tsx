import { company, site } from '@/lib/config'
import { faqs } from '@/data/faq'

/**
 * JSON-LD entity graph. Rendered into the prerendered HTML so search engines
 * and AI answer engines see one consistent description of who Trihub is, who
 * publishes it, and how it relates to triversesolutions.co.in.
 */
const ORG_ID = `${company.url}/#organization`
const SITE_ID = `${site.url}/#website`
const APP_ID = `${site.url}/#software`

function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.name,
    legalName: company.legalName,
    url: company.url,
    email: company.email,
    telephone: company.phone,
    foundingDate: String(company.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      postalCode: company.address.postalCode,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
    },
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'CIN', value: company.cin },
      { '@type': 'PropertyValue', propertyID: 'Udyam', value: company.udyam },
    ],
    sameAs: company.sameAs,
    brand: { '@id': APP_ID },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.contactEmail,
      areaServed: 'IN',
      availableLanguage: ['en'],
    },
  }
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${site.url}/`,
    name: 'Trihub',
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  }
}

function software() {
  return {
    '@type': 'SoftwareApplication',
    '@id': APP_ID,
    name: 'Trihub',
    url: `${site.url}/`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'CRM, ERP and business automation',
    operatingSystem: 'Web',
    description:
      'Trihub is a business software platform that connects CRM, ERP, workflow automation, analytics and custom business software on one data model, configured around how each business works.',
    featureList: [
      'CRM: lead pipeline, contacts, follow-ups, sales stages',
      'ERP: procurement, inventory, operations, HR, projects, finance',
      'Workflow automation across modules',
      'WhatsApp, email and call activity logging',
      'Dashboards and analytics on live data',
      'Custom modules, client portals and integrations',
    ],
    publisher: { '@id': ORG_ID },
    provider: { '@id': ORG_ID },
    image: `${site.url}/og-image.png`,
  }
}

type Page = 'home' | 'privacy' | 'terms'

export function StructuredData({ page }: { page: Page }) {
  const graph: object[] = [organization(), website()]

  if (page === 'home') {
    graph.push(software(), {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  } else {
    const name = page === 'privacy' ? 'Privacy Policy' : 'Terms of Use'
    const url = `${site.url}/${page}/`
    graph.push(
      { '@type': 'WebPage', '@id': url, url, name, isPartOf: { '@id': SITE_ID }, publisher: { '@id': ORG_ID } },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trihub', item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name, item: url },
        ],
      },
    )
  }

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
