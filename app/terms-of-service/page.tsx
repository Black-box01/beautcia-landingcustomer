import React from 'react';
import '../legal-pages.css';

export default function TermsOfServicePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <a href="/" className="legal-back-link">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-updated">Last Updated: {currentYear}</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using the Beautcia mobile application (&quot;the App&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Description of Service</h2>
            <p>
              Beautcia is a platform that connects customers with beauty professionals for booking and paying for beauty services including hair styling, makeup, nail services, skincare, and more. We act as an intermediary between customers and service providers.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. User Accounts</h2>
            <p>To use our services, you must:</p>
            <ul>
              <li>Create an account with accurate information</li>
              <li>Be at least 18 years old</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Not share your account with others</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Booking and Appointments</h2>
            <p>When booking a service through Beautcia:</p>
            <ul>
              <li>You agree to provide accurate information about the services you need</li>
              <li>Booking confirmations are subject to professional availability</li>
              <li>You must arrive on time for scheduled appointments</li>
              <li>Cancellations should be made at least 24 hours in advance</li>
              <li>We reserve the right to charge cancellation fees as per the professional&apos;s policy</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Payments and Fees</h2>
            <p>
              All payments are processed securely through our payment system. Service prices are set by individual professionals and may vary. We may charge service fees for processing transactions. All prices include applicable taxes unless stated otherwise.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Cancellation and Refund Policy</h2>
            <p>
              Cancellation policies vary by professional. Refunds are processed according to the specific professional&apos;s policy and may take 5-10 business days to appear in your account. We reserve the right to refuse refunds for no-shows or late cancellations.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any unlawful purpose</li>
              <li>Harass, abuse, or harm other users or professionals</li>
              <li>Provide false or misleading information</li>
              <li>Attempt to bypass our payment system</li>
              <li>Post fraudulent reviews or ratings</li>
              <li>Use the app to book services for commercial resale</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Professional Services</h2>
            <p>
              Beauty professionals on our platform are independent contractors. We do not guarantee the quality of services provided. If you are unsatisfied with a service, please contact our support team. We will work to resolve issues but are not liable for the actions of independent professionals.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Intellectual Property</h2>
            <p>
              All content, features, and functionality of the Beautcia app are owned by us and protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Beautcia shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify you of significant changes through the app or via email. Your continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
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
