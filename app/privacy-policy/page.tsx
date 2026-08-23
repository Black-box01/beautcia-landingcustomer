import React from 'react';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/schemas';
import '../legal-pages.css';

export const metadata = {
  title: 'Privacy Policy - Beautcia',
  description: 'Beautcia Privacy Policy - How we collect, manage and protect your personal data.',
};

export default function PrivacyPolicyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="legal-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy-policy' },
        ])}
      />
      <div className="legal-container">
        <div className="legal-header">
          <a href="/" className="legal-back-link">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last Updated: {currentYear}</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Beautcia (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and handling your personal information with care. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, and profile photo when you create an account.</li>
              <li><strong>Payment Information:</strong> Payment details are processed securely through our payment processors. We do not store your full credit card information.</li>
              <li><strong>Usage Data:</strong> Information about how you use our app, including services booked, professionals interacted with, and features used.</li>
              <li><strong>Location Data:</strong> With your permission, we collect location data to show you nearby beauty professionals.</li>
              <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers, and mobile network information.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To process bookings and payments</li>
              <li>To send you appointment confirmations and updates</li>
              <li>To provide customer support</li>
              <li>To improve our app and user experience</li>
              <li>To send promotional communications (with your consent)</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul>
              <li><strong>Beauty Professionals:</strong> To facilitate your bookings.</li>
              <li><strong>Service Providers:</strong> Third-party companies that perform services on our behalf (payment processing, analytics, etc.).</li>
              <li><strong>Legal Requirements:</strong> If required by law or in response to legal process.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: beautciaservices@gmail.com<br />
              Phone: 0805 519 9229
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <p>&copy; {currentYear} Beautcia. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
