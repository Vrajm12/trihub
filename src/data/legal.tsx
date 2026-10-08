import type { ReactNode } from 'react'
import { addressLine, company, site } from '@/lib/config'

/**
 * Legal copy. Drafted to reflect how this website actually works (no
 * analytics or advertising cookies, demo requests by form or email) and
 * India's Digital Personal Data Protection Act, 2023 and IT Act, 2000.
 * Have it reviewed by counsel before relying on it, and update it whenever
 * analytics, chat widgets or new data flows are added.
 */

export interface LegalSection {
  id: string
  title: string
  body: ReactNode
}

export interface LegalDoc {
  title: string
  summary: string
  effective: string
  sections: LegalSection[]
}

const EFFECTIVE = '8 October 2026'

const Mail = ({ to = site.contactEmail }: { to?: string }) => <a href={`mailto:${to}`}>{to}</a>
const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener' : undefined}>
    {children}
  </a>
)

export const privacy: LegalDoc = {
  title: 'Privacy Policy',
  summary: `How ${company.legalName} collects, uses and protects personal data through trihub.tech.`,
  effective: EFFECTIVE,
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      body: (
        <>
          <p>
            Trihub is a business software platform built and operated by <strong>{company.legalName}</strong> (CIN{' '}
            {company.cin}), {addressLine} (“Triverse”, “we”, “us”). This policy explains how we handle personal data
            collected through <Link href={site.url}>trihub.tech</Link> (the “Website”).
          </p>
          <p>
            For the purposes of India’s Digital Personal Data Protection Act, 2023 (“DPDP Act”), we are the Data Fiduciary
            for personal data collected through the Website. Our company website is{' '}
            <Link href={company.url}>triversesolutions.co.in</Link>.
          </p>
        </>
      ),
    },
    {
      id: 'scope',
      title: 'What this policy covers',
      body: (
        <>
          <p>
            This policy covers visitors to the Website and people who contact us or request a demo. It does not cover data
            that our customers store inside their own Trihub systems. For that data, our customer is the Data Fiduciary and
            we process it on their behalf under our agreement with them; please contact the relevant organisation directly
            about it.
          </p>
        </>
      ),
    },
    {
      id: 'data-we-collect',
      title: 'Personal data we collect',
      body: (
        <>
          <p>
            <strong>Information you give us.</strong> When you request a demo or contact us, we collect your name, company,
            work email, phone number (optional), the products you are interested in and anything you write in your
            message. If you email us, we receive your email address and the contents of your message.
          </p>
          <p>
            <strong>Technical information.</strong> Like most websites, our hosting provider automatically records standard
            server logs, such as IP address, browser type, pages requested and the date and time of the request. These are
            used to operate and secure the Website.
          </p>
          <p>
            <strong>Fonts.</strong> The Website loads typefaces from Google Fonts, which means your browser connects to
            Google’s servers and shares your IP address with Google. See{' '}
            <Link href="https://policies.google.com/privacy">Google’s Privacy Policy</Link>.
          </p>
          <p>
            <strong>Cookies.</strong> The Website does not currently use advertising or analytics cookies. If we introduce
            them, we will update this policy and, where required, ask for your consent first.
          </p>
        </>
      ),
    },
    {
      id: 'how-we-use',
      title: 'How we use it',
      body: (
        <>
          <p>We use personal data only for the purposes for which it was provided, namely to:</p>
          <ul>
            <li>respond to your enquiry, schedule and run demos, and prepare proposals or quotes you ask for;</li>
            <li>communicate with you about Trihub and an ongoing conversation or engagement;</li>
            <li>operate, secure and improve the Website; and</li>
            <li>comply with legal obligations and enforce our terms.</li>
          </ul>
          <p>
            We process this data on the basis of your consent, given when you submit a form or write to us, and for
            legitimate uses permitted under the DPDP Act. We do not sell personal data, and we do not use it for automated
            decision-making that affects you.
          </p>
        </>
      ),
    },
    {
      id: 'sharing',
      title: 'Who we share it with',
      body: (
        <>
          <p>We share personal data only with:</p>
          <ul>
            <li>
              service providers that help us run the Website and our communications (for example hosting, email and form
              handling), bound to use it only on our instructions;
            </li>
            <li>professional advisers, where necessary; and</li>
            <li>authorities, where required by law or to protect our rights, users or the public.</li>
          </ul>
          <p>
            Some providers may store data on servers outside India. Where that happens, we transfer data only as permitted
            under the DPDP Act and any restrictions notified by the Government of India.
          </p>
        </>
      ),
    },
    {
      id: 'retention',
      title: 'How long we keep it',
      body: (
        <p>
          We keep enquiry and demo-request data for as long as needed to respond and to continue any resulting business
          conversation, and then delete it or anonymise it, unless we must keep it longer by law. If you withdraw consent,
          we stop processing your data and delete it within a reasonable period, except where retention is legally
          required.
        </p>
      ),
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      body: (
        <>
          <p>Subject to applicable law, you have the right to:</p>
          <ul>
            <li>get a summary of the personal data we hold about you and how we process it;</li>
            <li>have inaccurate or incomplete data corrected or updated;</li>
            <li>have your data erased when it is no longer needed for the purpose it was collected for;</li>
            <li>withdraw consent at any time, as easily as you gave it;</li>
            <li>nominate another person to exercise these rights in the event of your death or incapacity; and</li>
            <li>raise a grievance with us, and then with the Data Protection Board of India if it is not resolved.</li>
          </ul>
          <p>
            To exercise any of these rights, write to <Mail />. We may need to verify your identity before acting on a
            request.
          </p>
        </>
      ),
    },
    {
      id: 'security',
      title: 'Security',
      body: (
        <p>
          We use reasonable security safeguards to protect personal data against unauthorised access, alteration,
          disclosure or destruction, including encrypted connections (HTTPS) and restricted access. No method of
          transmission or storage is completely secure, but we will notify affected individuals and the Data Protection
          Board of India of a personal data breach as the law requires.
        </p>
      ),
    },
    {
      id: 'children',
      title: 'Children',
      body: (
        <p>
          The Website is intended for businesses and is not directed at children. We do not knowingly collect personal data
          from anyone under 18. If you believe a child has given us personal data, contact us and we will delete it.
        </p>
      ),
    },
    {
      id: 'grievance',
      title: 'Contact and grievance redressal',
      body: (
        <>
          <p>For questions about this policy or to raise a grievance, contact:</p>
          <address>
            Grievance Officer, {company.legalName}
            <br />
            {addressLine}
            <br />
            Email: <Mail />
          </address>
          <p>We will acknowledge and resolve grievances within the timelines required by applicable law.</p>
        </>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: (
        <p>
          We may update this policy as the Website or the law changes. The effective date at the top of this page shows when
          it was last revised. Material changes will be highlighted on the Website.
        </p>
      ),
    },
  ],
}

export const terms: LegalDoc = {
  title: 'Terms of Use',
  summary: `The terms that apply when you use trihub.tech, operated by ${company.legalName}.`,
  effective: EFFECTIVE,
  sections: [
    {
      id: 'agreement',
      title: 'Agreement to these terms',
      body: (
        <>
          <p>
            These Terms of Use (“Terms”) govern your use of <Link href={site.url}>trihub.tech</Link> (the “Website”),
            operated by <strong>{company.legalName}</strong> (CIN {company.cin}), {addressLine} (“Triverse”, “we”, “us”).
            By using the Website you agree to these Terms. If you do not agree, please do not use it.
          </p>
          <p>
            If you use the Website on behalf of an organisation, you confirm that you are authorised to accept these Terms
            for it.
          </p>
        </>
      ),
    },
    {
      id: 'website-vs-service',
      title: 'The Website and the Trihub service',
      body: (
        <>
          <p>
            The Website describes Trihub, our CRM, ERP, automation and custom business software. Access to Trihub itself,
            and any implementation, customisation or support services, is provided only under a separate written agreement
            or order form signed with us. If that agreement conflicts with these Terms, the agreement prevails for the
            services it covers.
          </p>
          <p>
            Requesting a demo or a quote does not create any obligation for you or for us to enter into an agreement.
          </p>
        </>
      ),
    },
    {
      id: 'pricing',
      title: 'Pricing and quotes',
      body: (
        <p>
          Pricing for Trihub is provided on request. Any quote, proposal or estimate is valid only for the period and scope
          stated in it, and becomes binding only when it is accepted in a signed agreement or order form. Taxes, including
          GST, apply as required by law.
        </p>
      ),
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      body: (
        <>
          <p>You agree not to:</p>
          <ul>
            <li>use the Website unlawfully, or in a way that infringes anyone’s rights;</li>
            <li>attempt to gain unauthorised access to the Website, its servers or related systems;</li>
            <li>interfere with its operation, including by introducing malware or overloading it;</li>
            <li>
              scrape or copy the Website’s content at scale to build a competing product, other than normal indexing by
              search engines and AI answer engines; or
            </li>
            <li>submit false information or impersonate any person or organisation.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'ip',
      title: 'Intellectual property',
      body: (
        <>
          <p>
            The Website, including its text, design, graphics, 3D visuals, code and the Trihub name and logo, is owned by or
            licensed to Triverse and protected by intellectual property laws. You may view and share links to the Website
            for personal and internal business purposes. You may not reproduce, modify or distribute its content without our
            written permission.
          </p>
          <p>Other names and trademarks mentioned on the Website belong to their respective owners.</p>
        </>
      ),
    },
    {
      id: 'content',
      title: 'Website content and illustrations',
      body: (
        <p>
          We aim to keep the Website accurate and current, but its content is for general information and may change
          without notice. Product screens, dashboards and workflows shown on the Website are illustrations: the names,
          companies, figures and records in them are sample data, not real customers or results. Available features depend
          on the plan and configuration agreed with you.
        </p>
      ),
    },
    {
      id: 'third-party',
      title: 'Third-party links',
      body: (
        <p>
          The Website may link to other websites, including <Link href={company.url}>triversesolutions.co.in</Link> and
          third-party services. We are not responsible for the content or practices of websites we do not operate.
        </p>
      ),
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      body: (
        <p>
          The Website is provided “as is” and “as available”. To the extent permitted by law, we disclaim all warranties,
          express or implied, including fitness for a particular purpose and non-infringement, and we do not guarantee that
          the Website will be uninterrupted or error-free.
        </p>
      ),
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      body: (
        <p>
          To the extent permitted by law, Triverse is not liable for any indirect, incidental, special or consequential
          loss, or for loss of profits, revenue, data or goodwill, arising from your use of the Website. Nothing in these
          Terms limits liability that cannot be limited under applicable law.
        </p>
      ),
    },
    {
      id: 'indemnity',
      title: 'Indemnity',
      body: (
        <p>
          You agree to indemnify Triverse against claims, losses and costs arising from your breach of these Terms or misuse
          of the Website.
        </p>
      ),
    },
    {
      id: 'privacy',
      title: 'Privacy',
      body: (
        <p>
          Our <Link href="/privacy/">Privacy Policy</Link> explains how we handle personal data collected through the
          Website.
        </p>
      ),
    },
    {
      id: 'law',
      title: 'Governing law and jurisdiction',
      body: (
        <p>
          These Terms are governed by the laws of India. Subject to any applicable dispute-resolution clause in a signed
          agreement, the courts at Pune, Maharashtra have exclusive jurisdiction over disputes arising from them or from
          your use of the Website.
        </p>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      body: (
        <p>
          We may update these Terms from time to time. The effective date at the top of this page shows when they were last
          revised. Continuing to use the Website after a change means you accept the updated Terms.
        </p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact',
      body: (
        <address>
          {company.legalName}
          <br />
          {addressLine}
          <br />
          Email: <Mail />
        </address>
      ),
    },
  ],
}
