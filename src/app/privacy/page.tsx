'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
            Privacy Policy
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
              Welcome to VibeMonitor.ai (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, &quot;the Company&quot;). We respect your privacy and are committed to protecting your Personal Data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services, located at https://vibemonitor.ai (the &quot;Service&quot;). By using or accessing the Service, you agree to this Privacy Policy.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              1. Definitions
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Personal Data</strong> means any information about an identified or identifiable individual.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Usage Data</strong> means information collected automatically (such as logs, metrics, analytics) when you access or use the Service.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Account</strong> means a unique account created for you to access our Service.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Service</strong> means the Service offered by VibeMonitor.ai as described on the Site, including monitoring, alerting, root cause analysis.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>You/Your</strong> refers to you as a user of the Service, and if you are accessing on behalf of an organization, the organization.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              2. Information We Collect
            </h2>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '32px', marginBottom: '12px' }}>
              2.1. Information you provide us directly:
            </h3>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Registration data: name, organization, email, password (hashed) for an Account.</li>
              <li style={{ marginBottom: '8px' }}>Payment and billing information (via our payment processor) if you purchase paid plans.</li>
              <li style={{ marginBottom: '8px' }}>Integration credentials or tokens you grant us (e.g., GitHub, Slack, Grafana) for the purpose of providing our monitoring service.</li>
              <li style={{ marginBottom: '8px' }}>Support requests, communications, survey responses.</li>
            </ul>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '32px', marginBottom: '12px' }}>
              2.2. Usage, Logs & Monitoring Data:
            </h3>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Server logs, traces, metrics, logs from your infrastructure that you connect to us (via our integrations).</li>
              <li style={{ marginBottom: '8px' }}>Device and usage information: IP address, browser type, operating system, pages visited, referral URL, time stamps, error details.</li>
              <li style={{ marginBottom: '8px' }}>Analytics data, such as feature usage, response times, alert counts.</li>
            </ul>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '32px', marginBottom: '12px' }}>
              2.3. Cookies & Tracking Technologies:
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              We may use cookies, web beacons, tracking pixels or similar technologies to collect information about how you interact with our website. You can control cookies via browser settings.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              3. How We Use Your Information
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              We use the Personal Data and Usage Data we collect for the following purposes:
            </p>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>To provide, operate and maintain the Service.</li>
              <li style={{ marginBottom: '8px' }}>To authenticate your identity and manage your Account.</li>
              <li style={{ marginBottom: '8px' }}>To process your subscription payments, send invoices and fulfil orders.</li>
              <li style={{ marginBottom: '8px' }}>To monitor infrastructure logs/metrics you connect, detect anomalies, generate alerts, root-cause analysis and correlating errors.</li>
              <li style={{ marginBottom: '8px' }}>To send you alerts, updates, notifications (via Slack, email).</li>
              <li style={{ marginBottom: '8px' }}>To improve, personalize and optimize our Service (feature development, analytics).</li>
              <li style={{ marginBottom: '8px' }}>To comply with legal obligations and enforce our Terms.</li>
            </ul>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              4. Disclosure of Your Information
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              We may share your information in the following circumstances:
            </p>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--color-text-primary)' }}>Vendors and Service Providers:</strong> We engage third-party vendors (e.g., cloud hosting, payment processors, analytics) who help us operate the Service. They strictly follow our instructions and are subject to confidentiality.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--color-text-primary)' }}>Affiliates:</strong> If we merge, are acquired or reorganized, your information may be transferred as a business asset.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--color-text-primary)' }}>Legal and safety reasons:</strong> We may disclose information to comply with applicable laws, respond to legal process, protect our rights, property or safety of others.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'var(--color-text-primary)' }}>Aggregate or anonymized data:</strong> We may share aggregated, de-identified usage data that can&apos;t reasonably re-identify you.</li>
            </ul>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>We do not sell your Personal Data to third parties.</strong>
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              5. International Transfers
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Your information may be transferred to, stored and processed in servers located outside your country of residence (for instance, the United States or India). By using the Service you consent to this transfer and we will protect your privacy accordingly.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              6. Data Retention
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              We retain your Personal Data and Usage Data as long as your account is active or as needed to provide you the Service, comply with legal obligations, resolve disputes and enforce our agreements.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              7. Security
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              We adopt industry-standard technical and organisational measures to protect Personal Data from unauthorised access, disclosure or destruction. However, no method of transmission or storage is 100% secure; you acknowledge residual risk.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              8. Your Rights
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Depending on your jurisdiction you may have rights such as:
            </p>
            <ul style={{ fontSize: '15px', color: 'var(--color-text-secondary)', paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>Accessing the Personal Data we hold about you.</li>
              <li style={{ marginBottom: '8px' }}>Requesting correction or deletion of your Personal Data.</li>
              <li style={{ marginBottom: '8px' }}>Objecting to or restricting certain processing.</li>
              <li style={{ marginBottom: '8px' }}>Data portability.</li>
            </ul>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              To exercise your rights, please contact us at <a href="mailto:support@vibemonitor.ai" style={{ color: 'var(--color-text-primary)', textDecoration: 'underline' }}>support@vibemonitor.ai</a>.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              9. Children&apos;s Privacy
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Our Service is not directed to children under the age of 13 (or applicable age in your jurisdiction). We do not knowingly collect Personal Data from children. If you become aware a child under age has provided us Personal Data, please contact us and we will delete it.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              10. Changes to this Policy
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              We may update this Privacy Policy from time to time. We will post the new date of &quot;Last updated&quot; at the top. Your continued use of the Service after changes becomes your acceptance of the revised policy.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '48px', marginBottom: '16px' }}>
              11. Contact Us
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              If you have any questions about this Privacy Policy, you may contact us at:
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
