import { useState } from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import FormSuccess from "../components/shared/FormSuccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { generateRefId } from "../lib/generateRefId";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";

const inquiryTypes = ["Participant Help", "Partner Inquiry", "Employer Inquiry", "Volunteer Interest", "Donation Question", "General Contact"];

const contactInfo = [
  { icon: Phone, label: "Phone", value: "737-255-8355" },
  { icon: Mail, label: "Email", value: "info@headquartersofhope.org" },
  { icon: MapPin, label: "Location", value: "509 Sandstone Trail, Buda, TX 78610" },
  { icon: Clock, label: "Hours", value: "Monday - Friday, 9:00 AM - 5:00 PM" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", inquiry_type: "", subject: "", message: "",
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reference_id = generateRefId("CON");
    await base44.entities.ContactSubmission.create({
      ...form,
      reference_id,
      source: "website_public",
      status: "new",
    });
    setRefId(reference_id);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We Are Here to Help"
        description="Have a question, want to get involved, or need support? Reach out and our team will get back to you promptly."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <h3 className="font-heading text-2xl font-bold text-primary mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs font-display tracking-wide uppercase text-muted-foreground font-bold mb-0.5">{item.label}</p>
                      <p className="text-sm text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-primary rounded-xl">
                <h4 className="font-heading text-lg font-semibold text-white mb-2">Need Immediate Help?</h4>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  If you need immediate support with employment, housing, or reentry services, you can also submit our intake form directly.
                </p>
                <a href="/get-help">
                  <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-xs tracking-wide uppercase gap-1">
                    Go to Intake Form <ArrowRight className="w-3 h-3" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <FormSuccess
                  title="Message Sent Successfully"
                  message="Thank you for reaching out. Our team will review your message and respond within 1-2 business days."
                  referenceId={refId}
                />
              ) : (
                <>
                  <SectionHeading eyebrow="Send a Message" title="Contact Form" align="left" />
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label>Full Name *</Label><Input required value={form.name} onChange={(e) => updateField("name", e.target.value)} /></div>
                      <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} /></div>
                      <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
                      <div>
                        <Label>Inquiry Type</Label>
                        <Select value={form.inquiry_type} onValueChange={(v) => updateField("inquiry_type", v)}>
                          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                          <SelectContent>{inquiryTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div><Label>Subject</Label><Input value={form.subject} onChange={(e) => updateField("subject", e.target.value)} /></div>
                    <div><Label>Message *</Label><Textarea required value={form.message} onChange={(e) => updateField("message", e.target.value)} rows={5} /></div>
                    <Button type="submit" size="lg" disabled={loading} className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
                      {loading ? "Sending..." : "Send Message"} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}