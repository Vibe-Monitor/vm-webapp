'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen theme-light" style={{ background: 'var(--color-background-secondary)' }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>
          <ArrowLeft className="w-4 h-4" />
          <span style={{ fontSize: '14px' }}>Back to Home</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ fontSize: '48px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Terms & Conditions
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--color-text-tertiary)', marginBottom: '48px' }}>
            Last updated: October 25, 2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose max-w-none"
        >
          <div style={{ color: 'var(--color-text-primary)', lineHeight: '1.8' }}>
            <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
              These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of the Service offered by VibeMonitor.ai (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By creating an account, accessing or using the Service, you agree to be bound by these Terms.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              1. Definitions
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Service</strong> means the online monitoring, error-detection, alerting, analysis and debugging platform provided by the Company, including the website, APIs, integrations (Slack, GitHub, Grafana) and related documentation.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>User/You</strong> means you or the entity you represent that is using the Service.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Account</strong> means a unique user account created for accessing the Service.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Subscription Plan</strong> means a paid or free plan through which you access the Service under a subscription model.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              2. Acceptance of Terms
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              By signing up for an Account or using the Service, you agree to these Terms (and our Privacy Policy). If you do not agree, you may not use the Service.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              3. Changes to Terms
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of changes (for example by posting on the Service or emailing you). Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              4. Account Registration & Access
            </h2>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>You must provide accurate, complete information when registering and maintain and promptly update your Account information.</li>
              <li style={{ marginBottom: '8px' }}>You are responsible for safeguarding your password and for any activity that occurs under your Account.</li>
              <li style={{ marginBottom: '8px' }}>You represent that you have the authority to bind the organization you represent.</li>
              <li style={{ marginBottom: '8px' }}>You agree to notify us immediately of any unauthorised use of your Account or breach of security.</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              5. Subscription, Fees & Payment
            </h2>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>The Service is offered on a free tier and paid subscription plans. Details are available on our pricing page.</li>
              <li style={{ marginBottom: '8px' }}>Payments (or renewal) are due in advance for the upcoming subscription period. If payment fails, we may suspend or terminate your Account.</li>
              <li style={{ marginBottom: '8px' }}>All fees are non-refundable except as expressly stated in these Terms or in our refund policy.</li>
              <li style={{ marginBottom: '8px' }}>We may change pricing for new or existing plans at any time, provided we give you prior notice.</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              6. License & Use of Service
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Subject to these Terms and your payment of applicable fees, we grant you a non-exclusive, non-transferable, revocable license to access and use the Service.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              You agree to use the Service only as permitted by these Terms and in compliance with applicable laws.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              You will not:
            </p>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Reverse engineer, decompile, attempt to derive the source code of, or modify the Service.</li>
              <li style={{ marginBottom: '8px' }}>Use the Service in a way that disrupts, degrades or interferes with it.</li>
              <li style={{ marginBottom: '8px' }}>Circumvent any technical measures we use to restrict access or usage.</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              7. Your Obligations & Prohibited Uses
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              You agree you will not use the Service to:
            </p>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Violate any applicable law or regulation.</li>
              <li style={{ marginBottom: '8px' }}>Infringe any third-party rights (intellectual property, privacy, etc.).</li>
              <li style={{ marginBottom: '8px' }}>Upload or transmit any malicious code, viruses or harmful software.</li>
              <li style={{ marginBottom: '8px' }}>Commit fraud, impersonation or misrepresentation.</li>
              <li style={{ marginBottom: '8px' }}>Attempt to interfere with other users&apos; access or degrade the Service&apos;s performance.</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              8. Intellectual Property
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              All rights, title and interest in and to the Service, including all software, technology, user interface, and design, remain with the Company and its licensors.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              You retain ownership of your data (logs, metrics, source code  data) that you supply to the Service. You grant us a right (limited license) to host, process, store, analyse and display that data for purpose of providing the Service.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              You grant us a worldwide, royalty-free, non-exclusive license to use aggregated and anonymised data derived from your usage for our business improvement, research and development.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              9. Data & Security
            </h2>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>We will maintain reasonable administrative, physical and technical safeguards to protect your data from unauthorised access, disclosure or destruction.</li>
              <li style={{ marginBottom: '8px' }}>You acknowledge that monitoring and logging systems carry inherent risk and you accept those risks.</li>
              <li style={{ marginBottom: '8px' }}>We do not guarantee continuous, uninterrupted or error-free operation of the Service.</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              10. Disclaimer of Warranties
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              To the maximum extent permitted by applicable law, the Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;, without warranties of any kind (express or implied). We disclaim all warranties including but not limited to merchantability, fitness for a particular purpose, non-infringement, accuracy or reliability of results.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              11. Limitation of Liability
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              In no event shall the Company, its affiliates or licensors be liable for any indirect, incidental, special, punitive or consequential damages, including loss of revenue, profits, data or business opportunity, arising out of or relating to your use of the Service, even if advised of the possibility of such damages. Our aggregate liability for any direct damages is limited to the amount you have paid to us in the twelve (12) months preceding the event giving rise to liability (or USD 100 if no payments were made), whichever is greater.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              12. Indemnification
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              You agree to defend, indemnify and hold harmless the Company, its affiliates, officers, directors, employees and agents from and against any claims, liabilities, losses, damages and expenses (including reasonable attorneys&apos; fees) arising out of your use of the Service in violation of these Terms or applicable law.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              13. Term & Termination
            </h2>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>These Terms start when you register for an Account or use the Service.</li>
              <li style={{ marginBottom: '8px' }}>Either party may terminate or suspend your Account at any time, with or without cause, by providing notice.</li>
              <li style={{ marginBottom: '8px' }}>Upon termination, your right to access the Service ends, and we may delete, archive or anonymise your data in accordance with our data retention practices. Termination does not relieve you of payment obligations incurred before termination.</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              14. Governing Law & Dispute Resolution
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              These Terms shall be governed by the laws of India and the State of Karnataka, without respect to its conflict of laws provisions. You agree to exclusive jurisdiction and venue in the courts of Bangalore, Karnataka, India.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              15. Severability & Waiver
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              If any provision of these Terms is declared invalid, that provision will be unenforceable and will not affect the remaining provisions. No waiver of any right or provision will be valid unless in writing and signed by the Company.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              16. Entire Agreement
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              These Terms (together with our Privacy Policy and any other policies referenced herein) constitute the entire agreement between you and the Company regarding the Service and supersede all prior agreements between you.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              17. Contact Information
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              If you have questions about these Terms, please contact:
            </p>
            <div style={{
              background: 'var(--color-surface)',
              padding: '24px',
              borderRadius: '12px',
              marginTop: '24px',
              borderLeft: '4px solid var(--color-primary)'
            }}>
              <p style={{ fontSize: '15px', color: 'var(--color-text-primary)', marginBottom: '8px', fontWeight: 600 }}>
                Greenfield Gate Ventures LLP
              </p>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                (Operating as VibeMonitor.ai)
              </p>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                LLP Identification Number: ACR-9694
              </p>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                Unit No 101, Oxford Towers, 139/88, HAL, H.A.L II Stage<br />
                HAL Police Station, Bangalore North<br />
                Bangalore - 560008, Karnataka, India
              </p>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Email: <a href="mailto:support@vibemonitor.ai" style={{ color: 'var(--color-text-primary)', textDecoration: 'underline' }}>support@vibemonitor.ai</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
