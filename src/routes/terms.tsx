import { createFileRoute } from "@tanstack/react-router";
import PageShell, { PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — WixelQ" },
      { name: "description", content: "The terms that govern your use of the WixelQ QR code generator website and services." },
      { property: "og:title", content: "Terms of Service — WixelQ" },
      { property: "og:description", content: "Terms of use for WixelQ." },
    ],
  }),
});

function TermsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title="Terms of Service" description="Last updated: July 8, 2026" />
      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="glass rounded-2xl p-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <Section title="1. Website usage">
            <p>
              WixelQ is a free QR code generator. By using the site, you agree to these Terms. If
              you do not agree, please do not use WixelQ.
            </p>
          </Section>
          <Section title="2. User responsibilities">
            <p>
              You are responsible for the content you encode into QR codes. Do not use WixelQ to
              generate QR codes that link to unlawful, harmful, deceptive, or infringing content.
            </p>
          </Section>
          <Section title="3. Disclaimer">
            <p>
              WixelQ is provided "as is", without warranties of any kind, express or implied. While
              we work hard to ensure reliability, we do not guarantee that the service will always
              be available, error-free, or fit for a specific purpose.
            </p>
          </Section>
          <Section title="4. Copyright">
            <p>
              The WixelQ name, logo, and website design are owned by WixelQ. QR codes you generate
              belong to you — feel free to use them commercially. Do not copy or redistribute the
              WixelQ site itself without permission.
            </p>
          </Section>
          <Section title="5. Limitation of liability">
            <p>
              To the maximum extent permitted by law, WixelQ and its team will not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising out of or in
              connection with your use of the service.
            </p>
          </Section>
          <Section title="6. Changes">
            <p>
              We may update these Terms from time to time. Continued use of WixelQ after changes
              constitutes acceptance of the updated Terms.
            </p>
          </Section>
          <Section title="7. Contact">
            <p>
              Questions about these Terms? Email <strong>hello@wixelq.com</strong>.
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
