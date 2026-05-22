export default function SMSTerms() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="font-heading font-bold text-3xl text-primary mb-2">SMS Terms &amp; Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Terms of service and privacy policy for SMS communications from Headquarters of Hope Foundation.</p>

      <section className="mb-10">
        <h2 className="font-heading font-semibold text-xl text-primary mb-4">Terms of Service</h2>
        <p className="text-sm text-foreground leading-relaxed mb-4">
          By opting in to SMS messages from <strong>Headquarters of Hope Foundation</strong>, you agree to receive text messages for customer support, service updates, and other communications related to your account.
        </p>
        <ul className="space-y-4 text-sm text-foreground leading-relaxed list-none">
          <li className="pl-4 border-l-2 border-secondary">
            You can cancel the SMS service at any time. Just text <strong>STOP</strong>. After you send the SMS message &ldquo;STOP&rdquo; to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time and we will start sending SMS messages to you again.
          </li>
          <li className="pl-4 border-l-2 border-secondary">
            If you are experiencing issues with the messaging program, you can reply with the keyword <strong>HELP</strong> for more assistance.
          </li>
          <li className="pl-4 border-l-2 border-secondary">
            Carriers are not liable for delayed or undelivered messages.
          </li>
          <li className="pl-4 border-l-2 border-secondary">
            As always, message and data rates may apply for any messages sent to you from us and to us from you. Message frequency varies. If you have any questions about your text plan or data plan, it is best to contact your wireless provider.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-heading font-semibold text-xl text-primary mb-4">Privacy Policy</h2>
        <p className="text-sm text-foreground leading-relaxed mb-4">
          <strong>Headquarters of Hope Foundation</strong> does not share mobile numbers, text messaging originator opt-in data, or consent with any third parties or affiliates for marketing or promotional purposes.
        </p>
        <p className="text-sm text-foreground leading-relaxed mb-4">
          Mobile information may be shared only with subcontractors and service providers that support the delivery of SMS services, such as messaging platforms, telecommunications providers, or customer support vendors. This information is used solely to provide and operate the messaging service.
        </p>
        <p className="text-sm text-foreground leading-relaxed">
          All other use case categories exclude text messaging originator opt-in data and consent. This information will not be shared with any third parties.
        </p>
      </section>

      <section>
        <h2 className="font-heading font-semibold text-xl text-primary mb-4">Contact</h2>
        <p className="text-sm text-foreground leading-relaxed">
          If you have any questions about our SMS Terms &amp; Privacy Policy, please contact us at{" "}
          <a href="mailto:info@headquartersofhope.org" className="text-secondary underline hover:no-underline">info@headquartersofhope.org</a>{" "}
          or call <a href="tel:7372558355" className="text-secondary underline hover:no-underline">737-255-8355</a>.
        </p>
      </section>
    </div>
  );
}