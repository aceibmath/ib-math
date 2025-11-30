// src/app/terms/page.js
export const metadata = {
  title: "Terms of Service | AceIBMath",
};

export default function TermsPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Terms of Service</h1>
      <p className="text-muted">Last updated: 1 Sept 2025</p>

      <h5 className="mt-4">1. Agreement</h5>
      <p>
        By accessing AceIBMath you agree to these Terms and our Privacy Policy. If you
        do not agree, please do not use the service.
      </p>

      <h5 className="mt-4">2. Accounts & Security</h5>
      <p>
        You are responsible for the activity on your account. Do not share credentials
        or attempt to bypass access controls.
      </p>

      <h5 className="mt-4">3. Subscriptions & Billing</h5>
      <p>
        Premium plans are billed by Stripe. Fees are non-refundable except where
        required by law. You can manage or cancel your subscription in your account.
      </p>

      <h5 className="mt-4">4. Content & License</h5>
      <p>
        All learning materials are provided for personal educational use. You may not
        redistribute or resell our content without permission.
      </p>

      <h5 className="mt-4">5. Prohibited Use</h5>
      <ul>
        <li>Unauthorized access, scraping or reverse engineering.</li>
        <li>Sharing premium materials publicly.</li>
        <li>Any unlawful or harmful activity.</li>
      </ul>

      <h5 className="mt-4">6. Termination</h5>
      <p>
        We may suspend or terminate access for breaches of these Terms or for security reasons.
      </p>

      <h5 className="mt-4">7. Disclaimers & Liability</h5>
      <p>
        The service is provided “as is” without warranties. To the extent permitted by
        law, our liability is limited to the amount you paid in the last 12 months.
      </p>

      <h5 className="mt-4">8. Changes</h5>
      <p>
        We may update these Terms. Material changes will be announced within the app or
        by email.
      </p>

      <h5 className="mt-4">9. Contact</h5>
      <p>
        For questions, contact us at{" "}
        <a href="mailto:contact@aceibmath.com">contact@aceibmath.com</a>.
      </p>
    </div>
  );
}
