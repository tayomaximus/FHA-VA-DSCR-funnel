import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Kindred Mortgage Group',
  description: 'Privacy Policy for Kindred Mortgage Group, LLC.',
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://kindredmortgagegroup.com/wp-content/uploads/2024/07/2021-06-02.png"
              alt="Kindred Mortgage Group"
              style={{ height: '36px', width: 'auto', display: 'block' }}
            />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '40px' }}>
          Kindred Mortgage Group · Last Updated: April 8, 2026
        </p>

        <Section title="1. Introduction">
          <p>Kindred Mortgage Group, LLC, and its subsidiaries and affiliates (collectively, "Kindred Mortgage Group," "we," "our," or "us") are committed to maintaining your confidence and trust as it relates to the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and protect the personal information gathered:</p>
          <ul>
            <li>Through our website, www.kindredmortgagegroup.com, and any other websites or mobile applications that we own or operate where this Privacy Policy is posted or linked (collectively, the "Digital Properties");</li>
            <li>In connection with the delivery of our mortgage products and services to our customers;</li>
            <li>In connection with our business development, marketing, and agent partnership activities; and</li>
            <li>Through our other offline and business interactions.</li>
          </ul>
          <p>In this Privacy Policy, "personal information" means any information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, to an individual. Please carefully review this Privacy Policy to learn more about our information handling and privacy practices.</p>
        </Section>

        <Section title="2. Personal Information We Collect">
          <p>Depending on your use of our services and how you otherwise interact with us, we may collect or obtain information from and about you in several ways, including: (1) directly from you; (2) automatically when you visit and interact with our Digital Properties; and (3) from third parties.</p>
          <h3 style={h3Style}>2.1 Information Provided by You</h3>
          <p>When you visit and interact with our Digital Properties or otherwise engage with us, we collect personal information that you share with us. Depending on the context of your interactions, the categories of personal information we may collect include:</p>
          <ul>
            <li><strong>Contact information</strong>, including your name, street address, telephone number, and email address.</li>
            <li><strong>Identifying information</strong>, including your account credentials, Social Security number, date of birth, and other identifiers required for mortgage processing.</li>
            <li><strong>Financial information</strong>, including income documentation, bank statements, tax returns, employment records, credit history, and other financial data necessary for loan evaluation and processing.</li>
            <li><strong>Property information</strong>, including details about properties you are purchasing, refinancing, or using as collateral.</li>
            <li><strong>Correspondence and communications</strong>, including recordings of our email, phone, and text message conversations with you, and any correspondence related to providing you with our services.</li>
            <li><strong>Preferences</strong>, including how frequently you wish to receive marketing and promotional communications from us.</li>
            <li><strong>Other information you choose to provide</strong>, including information you include in any forms that you complete and submit on our Digital Properties.</li>
          </ul>
          <h3 style={h3Style}>2.2 Information Collected Through Automated Means</h3>
          <p>When you visit and interact with our Digital Properties, we (and our service providers and partners) may use cookies, pixels, web beacons, and other similar tracking technologies to collect certain information automatically, including:</p>
          <ul>
            <li><strong>Device information</strong>, which includes the Internet Protocol (IP) address and/or other unique identifiers assigned to your device, the location of your device, and other information about your browser, device, and operating system.</li>
            <li><strong>Usage information</strong>, which includes information about your interactions with our Digital Properties, such as the date and time of your visits, the pages that you visit, the amount of time you spend on a page, and other click-stream or usage information.</li>
          </ul>
          <h3 style={h3Style}>2.3 Information Collected from Other Sources</h3>
          <p>We may obtain your personal information from other sources, including credit bureaus, our service providers, lending partners, real estate agents, lead generators, and other partners. This information may include contact information, demographic information, identifiers (including full or partial Social Security number), consumer credit reports, credit scores, credit history, and financial information.</p>
        </Section>

        <Section title="3. How We Use Personal Information">
          <p>We may use personal information we collect for the following purposes:</p>
          <ul>
            <li><strong>Providing our services</strong>, including processing mortgage applications, evaluating loan eligibility, facilitating closings, and delivering pre-approval and other mortgage-related services.</li>
            <li><strong>Communicating with you</strong>, including contacting you to provide the services and information that you request, respond to your comments and questions, or send you important updates about your loan status.</li>
            <li><strong>Sending you marketing and promotional communications</strong>, including emails, text messages, and other communications about products or services that we think may interest you.</li>
            <li><strong>Personalizing our services</strong>, including tailoring the content we may send or display to you and otherwise personalizing your experience with us.</li>
            <li><strong>Supporting our real estate agent partners</strong>, including sharing relevant information with agents who referred you to us or who are assisting you with your home purchase.</li>
            <li><strong>Conducting research and analytics</strong> to develop and improve our services, including analyzing usage trends and preferences.</li>
            <li><strong>Maintaining security and preventing fraud</strong>, including monitoring and maintaining the security of our systems and detecting, preventing, and investigating fraud and other unlawful activity.</li>
            <li><strong>Satisfying our legal and regulatory obligations</strong>, including complying with applicable federal and state lending laws, regulations, and reporting requirements.</li>
            <li><strong>Supporting our business operations</strong>, including administering our general business functions and carrying out transactions.</li>
          </ul>
        </Section>

        <Section title="4. How We Disclose Personal Information">
          <p>We may disclose personal information we collect with the following categories of recipients:</p>
          <ul>
            <li><strong>Lending Partners:</strong> When you submit a request for a mortgage or other financial product, we may disclose your personal information to lenders, wholesale lenders, and other financial institutions in our network as necessary to deliver the products and services you requested.</li>
            <li><strong>Real Estate Agents and Brokers:</strong> We may share relevant information with real estate professionals who are working with you on a home purchase or sale.</li>
            <li><strong>Service Providers:</strong> We may disclose your personal information to third parties that provide business, professional, or technical support services to us, including credit reporting agencies, appraisal management companies, title companies, and closing agents.</li>
            <li><strong>Government and Regulatory Authorities:</strong> We may disclose your personal information to government and regulatory authorities as required by applicable federal, state, or local law, including in response to a subpoena, court order, or regulatory request.</li>
            <li><strong>Business Transaction Parties:</strong> We may disclose or transfer your personal information to an acquirer, successor, or assignee as part of any merger, acquisition, sale of assets, or similar transaction.</li>
            <li><strong>Marketing and Advertising Partners:</strong> We may disclose your personal information to marketing and advertising partners who assist us in serving and measuring the performance of our advertisements.</li>
            <li><strong>Other Parties:</strong> We may disclose your personal information as we believe necessary to comply with applicable law, protect our operations, investigate fraud, or protect the rights, privacy, safety, or property of ourselves or others.</li>
          </ul>
          <p>We may also disclose your personal information with your consent or when you direct us to do so.</p>
        </Section>

        <Section title="5. Your Choices">
          <ul>
            <li><strong>Marketing and Promotional Communications:</strong> You can opt out of receiving marketing and promotional communications from us at any time by following the instructions included in any such communication or by contacting us directly. Note that even if you opt out, you will still receive non-marketing or transactional messages from us, including messages about your loan status and account.</li>
            <li><strong>Cookies:</strong> You may be able to adjust your device or browser settings to limit certain tracking or to decline cookies. Refer to your browser's "Help" section for more information on how to manage cookies.</li>
            <li><strong>Access and Correct Personal Information:</strong> Depending on your state of residence, you may be able to access, correct, or request deletion of certain personal information we maintain about you. Contact us using the information below to submit a request.</li>
          </ul>
        </Section>

        <Section title="6. Information Security">
          <p>We maintain physical, electronic, and procedural measures designed to safeguard your personal information from unauthorized access and disclosure. These measures include encryption of sensitive data, secure storage systems, and restricted access controls. However, no system can be completely secure. Therefore, although we take steps to secure your information, we cannot guarantee that your information will always remain secure.</p>
        </Section>

        <Section title="7. Information Retention">
          <p>We will retain your personal information at least as long as necessary to fulfill the purposes outlined in this Privacy Policy and to satisfy our legal, regulatory, and reporting requirements, including those required under federal and state mortgage lending laws. To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the personal information; the potential risk from unauthorized use or disclosure; the purposes for which we use the information; and applicable legal requirements.</p>
        </Section>

        <Section title="8. Third-Party Services">
          <p>Our Digital Properties may contain features or links to websites and services provided by third parties, including our lending partners, real estate agent partners, and technology service providers. Any personal information you provide to the owner or operator of another website or a third-party service is provided directly to them and is subject to their privacy policy. We encourage you to review all third parties' privacy policies before providing them with your personal information.</p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>Our services are not intended for or directed to individuals under the age of 18, and we do not knowingly collect, sell, or share personal information from or about individuals under the age of 18.</p>
        </Section>

        <Section title="10. Services Limited to the United States">
          <p>Our Digital Properties are designed to provide services in the United States and are governed by the laws of the United States. We make no representation that our Digital Properties are governed by or operated in accordance with the laws of any other nation or foreign jurisdiction.</p>
        </Section>

        <Section title="11. Changes to This Privacy Policy">
          <p>We may update this Privacy Policy from time to time to reflect changes in our information handling and privacy practices and/or changes in applicable law. The "Last Updated" date at the top of this page indicates when this Privacy Policy was last revised. If we make material changes, we will provide you with additional notice as required by applicable law. We encourage you to review this Privacy Policy periodically to remain informed about our practices.</p>
        </Section>

        <Section title="12. How to Contact Us">
          <p>If you have any questions or comments about this Privacy Policy or our information handling and privacy practices, contact us using the following:</p>
          <address style={{ fontStyle: 'normal', lineHeight: '1.8' }}>
            <strong>Kindred Mortgage Group, LLC</strong><br />
            Website: <a href="https://www.kindredmortgagegroup.com" style={{ color: '#1D64D0' }}>www.kindredmortgagegroup.com</a><br />
            Email: <a href="mailto:kindredclientcare@gmail.com" style={{ color: '#1D64D0' }}>kindredclientcare@gmail.com</a>
          </address>
        </Section>

        <p style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #E2E8F0', fontSize: '13px', color: '#9CA3AF' }}>
          © 2026 Kindred Mortgage Group, LLC. All rights reserved.
        </p>
      </main>
    </div>
  )
}

// ── Local sub-components ──────────────────────────────────────────────────────

const h3Style: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 600,
  color: '#111827',
  marginTop: '24px',
  marginBottom: '8px',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '36px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
        {title}
      </h2>
      <div style={{ fontSize: '15px', color: '#374151', lineHeight: '1.75' }}>
        {children}
      </div>
    </section>
  )
}
