export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="font-heading font-bold text-3xl text-primary mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl text-primary mb-3">Overview</h2>
        <p className="text-sm text-foreground leading-relaxed">
          Headquarters of Hope Foundation, Inc. (&ldquo;HOH&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share information about you when you use our website, programs, and services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl text-primary mb-3">Information We Collect</h2>
        <p className="text-sm text-foreground leading-relaxed mb-3">We may collect the following categories of information:</p>
        <ul className="space-y-2 text-sm text-foreground leading-relaxed">
          <li className="pl-4 border-l-2 border-secondary"><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</li>
          <li className="pl-4 border-l-2 border-secondary"><strong>Program Information:</strong> Information you provide when applying for or participating in our programs, including housing, employment, and reentry services.</li>
          <li className="pl-4 border-l-2 border-secondary"><strong>Communications:</strong> Records of your correspondence with us, including emails, contact form submissions, and phone calls.</li>
          <li className="pl-4 border-l-2 border-secondary"><strong>Donation Information:</strong> Donation history and payment information processed through our secure third-party payment processors.</li>
          <li className="pl-4 border-l-2 border-secondary"><strong>Website Usage:</strong> Information about how you use our website, including IP address, browser type, and pages visited.</li>
          <li className="pl-4 border-l-2 border-secondary"><strong>SMS/Text Messaging:</strong> Mobile phone number and opt-in consent if you choose to receive SMS communications from us.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl text-primary mb-3">How We Use Your Information</h2>
        <ul className="space-y-2 text-sm text-foreground leading-relaxed">
          <li className="pl-4 border-l-2 border-secondary">To provide, operate, and improve our programs and services.</li>
          <li className="pl-4 border-l-2 border-secondary">To communicate with you about your inquiries, applications, and program participation.</li>
          <li className="pl-4 border-l-2 border-secondary">To send you program updates, newsletters, and fundraising communications (where you have opted in).</li>
          <li className="pl-4 border-l-2 border-secondary">To process donations and maintain donor records.</li>
          <li className="pl-4 border-l-2 border-secondary">To comply with legal obligations and regulatory requirements.</li>
          <li className="pl-4 border-l-2 border-secondary">To send SMS/text messages where you have provided explicit consent.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl text-primary mb-3">How We Share Your Information</h2>
        <p className="text-sm text-foreground leading-relaxed mb-3">
          We do not sell your personal information. We may share information with:
        </p>
        <ul className="space-y-2 text-sm text-foreground leading-relaxed mb-4">
          <li className="pl-4 border-l-2 border-secondary"><strong>Service Providers:</strong> Vendors and partners who assist us in operating our website and delivering our programs, bound by confidentiality agreements.</li>
          <li className="pl-4 border-l-2 border-secondary"><strong>Partner Organizations:</strong> Referral partners, courts, and agencies involved in your program participation, with your consent where required.</li>
          <li className="pl-4 border-l-2 border-secondary"><strong>Legal Requirements:</strong> When required by law, court order, or to protect the rights and safety of our participants and staff.</li>
        </ul>
        <p className="text-sm text-foreground leading-relaxed font-medium bg-muted px-4 py-3 rounded-lg border-l-4 border-secondary">
          All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl text-primary mb-3">Data Security</h2>
        <p className="text-sm text-foreground leading-relaxed">
          We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl text-primary mb-3">Your Rights</h2>
        <p className="text-sm text-foreground leading-relaxed mb-3">You have the right to:</p>
        <ul className="space-y-2 text-sm text-foreground leading-relaxed">
          <li className="pl-4 border-l-2 border-secondary">Access, correct, or request deletion of your personal information.</li>
          <li className="pl-4 border-l-2 border-secondary">Opt out of marketing and SMS communications at any time by texting STOP or contacting us directly.</li>
          <li className="pl-4 border-l-2 border-secondary">Request information about what personal data we hold about you.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl text-primary mb-3">Contact Us</h2>
        <p className="text-sm text-foreground leading-relaxed">
          If you have questions about this Privacy Policy or how we handle your information, please contact us:
        </p>
        <div className="mt-4 text-sm text-foreground space-y-1">
          <p><strong>Headquarters of Hope Foundation, Inc.</strong></p>
          <p>509 Sandstone Trail, Buda, TX 78610</p>
          <p>Email: <a href="mailto:info@headquartersofhope.org" className="text-secondary underline hover:no-underline">info@headquartersofhope.org</a></p>
          <p>Phone: <a href="tel:7372558355" className="text-secondary underline hover:no-underline">737-255-8355</a></p>
          <p>EIN: 39-3366072</p>
        </div>
      </section>
    </div>
  );
}
