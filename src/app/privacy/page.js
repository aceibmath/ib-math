// src/app/privacy/page.js
export const metadata = {
  title: "Privacy Policy | AceIBMath",
};

export default function PrivacyPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Privacy Policy</h1>
      <p className="text-muted">Last updated: 1 Sept 2025</p>

      <p>
        AceIBMath (“we”, “us”, “our”) provides IB Mathematics learning resources. This
        policy explains what personal data we collect, why, and how we protect it.
      </p>

      <h5 className="mt-4">Data We Collect</h5>
      <ul>
        <li>
          <strong>Google Sign-In</strong> (scopes: <code>openid</code>, <code>email</code>, <code>profile</code>) — we receive
          your name, email address and profile picture to create and manage your account.
        </li>
        <li>
          <strong>Usage data</strong> — basic analytics and logs to keep the service secure and improve features.
        </li>
        <li>
          <strong>Billing</strong> (for Premium) — handled by Stripe. We do not store full card details on our servers.
        </li>
      </ul>

      <h5 className="mt-4">How We Use Your Data</h5>
      <ul>
        <li>Authentication and account management.</li>
        <li>Providing and improving our learning content and features.</li>
        <li>Fraud prevention and security.</li>
        <li>Customer support and important service messages.</li>
      </ul>

      <h5 className="mt-4">Sharing</h5>
      <p>
        We do not sell your personal data. We share it only with essential processors
        (e.g., Firebase Authentication, Stripe) to operate the service.
      </p>

      <h5 className="mt-4">Retention</h5>
      <p>
        We keep your data for as long as your account is active or as needed to provide
        the service. You can request deletion of your account at any time.
      </p>

      <h5 className="mt-4">Cookies</h5>
      <p>
        We use cookies for session management, security and preferences. You can control
        cookies in your browser settings.
      </p>

      <h5 className="mt-4">Children</h5>
      <p>
        AceIBMath is not directed to children under 13. If you believe a child has
        provided us personal data, please contact us to remove it.
      </p>

      <h5 className="mt-4">Contact</h5>
      <p>
        Questions about this policy? Email us at{" "}
        <a href="mailto:contact@aceibmath.com">contact@aceibmath.com</a>.
      </p>
    </div>
  );
}
