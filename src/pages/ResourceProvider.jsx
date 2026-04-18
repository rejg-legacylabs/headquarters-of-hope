import { useState } from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import FormSuccess from "../components/shared/FormSuccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { invokeHubFunction } from "@/lib/hubClient";
import { generateRefId } from "../lib/generateRefId";
import { ArrowRight, Building2, Handshake, Heart } from "lucide-react";

const whyPartner = [
  { icon: Heart, title: "Expand Collective Impact", text: "Work alongside other community organizations to build a comprehensive support ecosystem." },
  { icon: Building2, title: "Fill Service Gaps", text: "Connect with participants who need exactly what your organization provides." },
  { icon: Handshake, title: "Sustainable Partnerships", text: "Formal partnership structure ensures reliable collaboration and shared success." },
];

export default function ResourceProvider() {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    organization_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    services_offered: "",
    service_area: "",
    notes: "",
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("🏢 FORM SUBMITTED - Resource Provider");
    try {
      const payload = {
        source_type: "resource_provider",
        data: {
          provider_name: form.organization_name.trim(),
          provider_type: "",
          contact_name: form.contact_name.trim(),
          contact_email: form.contact_email.trim(),
          contact_phone: form.contact_phone.trim(),
          address: "",
          services_offered: form.services_offered.trim(),
          notes: form.notes.trim(),
        },
        organization_id: "org1",
      };
      console.log("📤 Resource Provider Payload sent:");
      console.log("  source_type:", payload.source_type);
      console.log("  Full payload:", JSON.stringify(payload, null, 2));

      const response = await invokeHubFunction("processIntakeSubmission", payload);
      console.log("✅ Hub response:", response.data);
      console.log("  received_by_hub:", response.data?.received_by_hub);

      const reference_id = response.data?.reference_id || generateRefId("PROV");
      setRefId(reference_id);
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Function call failed:", error);
      const errorMsg = error.response?.data?.error || error.message || "Unknown error occurred";
      console.error("📋 Error details:", errorMsg);
      alert(`Submission failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Resource Partners"
        title="Join Our Service Network"
        description="Service providers and community organizations can formalize partnerships with Headquarters of Hope Foundation to collectively support our participants."
      />

      {/* Why Partner */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Partner"
            title="Strengthen Your Impact Together"
            description="When service providers partner with us, we build a comprehensive network of support for the people we serve."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whyPartner.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-primary mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 lg:py-24 bg-muted" id="provider-form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <FormSuccess
              title="Partner Registration Submitted"
              message="Thank you for registering as a resource provider. Our partnerships team will review your information and follow up within 3-5 business days to discuss collaboration opportunities."
              referenceId={refId}
            />
          ) : (
            <>
              <SectionHeading
                eyebrow="Register"
                title="Resource Provider Registration"
                description="Tell us about your organization and the services you provide. We will work with you to build a formal partnership."
                align="left"
              />
              <form onSubmit={handleSubmit} className="bg-white border border-border rounded-xl p-6 lg:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Organization Name *</Label><Input required value={form.organization_name} onChange={(e) => updateField("organization_name", e.target.value)} /></div>
                  <div><Label>Contact Name *</Label><Input required value={form.contact_name} onChange={(e) => updateField("contact_name", e.target.value)} /></div>
                  <div><Label>Email *</Label><Input type="email" required value={form.contact_email} onChange={(e) => updateField("contact_email", e.target.value)} /></div>
                  <div><Label>Phone</Label><Input value={form.contact_phone} onChange={(e) => updateField("contact_phone", e.target.value)} /></div>
                </div>

                <div><Label>Services Offered *</Label><Textarea required value={form.services_offered} onChange={(e) => updateField("services_offered", e.target.value)} rows={3} placeholder="Describe the services, programs, or resources your organization provides..." /></div>

                <div><Label>Service Area / Coverage</Label><Input value={form.service_area} onChange={(e) => updateField("service_area", e.target.value)} placeholder="City, region, or statewide" /></div>

                <div><Label>Additional Information</Label><Textarea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} rows={2} placeholder="How do you envision partnering with us? Any specific needs or opportunities?" /></div>

                <Button type="submit" size="lg" disabled={loading} className="w-full bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
                  {loading ? "Submitting..." : "Submit Registration"} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Questions About Partnership?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Contact our partnerships team to discuss how your organization can collaborate with Headquarters of Hope Foundation.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  );
}