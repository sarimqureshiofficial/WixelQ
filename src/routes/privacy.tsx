import { createFileRoute } from "@tanstack/react-router";
import PageShell, { PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — WixelQ" },
      { name: "description", content: "How WixelQ handles data, cookies, analytics, and user privacy. GDPR-friendly and privacy-first by design." },
      { property: "og:title", content: "Privacy Policy — WixelQ" },
      { property: "og:description", content: "Our approach to privacy, cookies and data." },
    ],
  }),
});

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: July 8, 2026" />
      <section className="mx-auto max-w-3xl px-4 py-10 prose-invert">
        <div className="glass rounded-2xl p-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            This page is maintained by the WixelQ team to explain how WixelQ ("we", "our") handles
            your information. WixelQ is designed to be privacy-first: the QR code content you enter
            is processed locally in your browser and is never sent to our servers.
          </p>

          <Section title="1. Data we collect">
            <p>
              WixelQ does not require an account. We do not collect the URLs, text, contact details,
              WiFi credentials, or any other content you enter into the QR generator — that data
              stays in your browser.
            </p>
            <p>
              We may collect anonymous, aggregated usage data (such as page views and general
              region) to understand how the site is used and improve it over time.
            </p>
          </Section>

          <Section title="2. Cookies">
            <p>
              We use a small number of essential cookies and local storage entries to remember your
              preferences (such as dark/light theme and recent QR history stored locally on your
              device). We do not use advertising cookies.
            </p>
          </Section>

          <Section title="3. Analytics">
            <p>
              We may use privacy-friendly analytics to measure aggregate traffic. Any analytics we
              use is configured to respect Do Not Track signals and does not identify you personally.
            </p>
          </Section>

          <Section title="4. Your privacy rights (GDPR / CCPA)">
            <p>
              Because WixelQ does not collect personal data tied to an identity, most GDPR and CCPA
              requests do not apply. If you contact us via the contact form, we will retain your
              message only for as long as needed to respond, and you may request deletion at any time.
            </p>
          </Section>

          <Section title="5. Third-party services">
            <p>
              Our website may use content delivery networks and hosting providers to serve the app.
              These providers process technical request metadata (like IP addresses) strictly to
              deliver the service.
            </p>
          </Section>

          <Section title="6. Contact">
            <p>
              For any privacy question, contact us at <strong>hello@wixelq.com</strong>.
            </p>
          </Section>
        </div>
      </section>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}
