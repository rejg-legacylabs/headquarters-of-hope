import { useState } from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import FormSuccess from "../components/shared/FormSuccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { base44 } from "@/api/base44Client";
import { generateRefId } from "../lib/generateRefId";
import { Users, ClipboardCheck, ArrowRight, Phone, CheckCircle } from "lucide-react";

const orgTypes = ["Probation/Parole", "Community Organization", "Nonprofit", "Workforce Agency", "Church/Faith-Based", "Reentry Organization", "Government Agency", "Other"];
const needOptions = ["Employment", "Housing", "Life Skills", "Digital Literacy", "Transportation", "Document Assistance", "Reentry Support", "Other"];
const urgencyOptions = ["Standard", "Urgent", "Emergency"];

const steps = [
  { icon: ClipboardCheck, title: "Submit Referral", text: "Complete the referral form below with as much information as possible about the individual you are referring." },
  { icon: Phone, title: "We Reach Out", text: "Our team reviews the referral and contacts the individual within 2-3 business days to begin the intake process." },
  { icon: Users, title: "Assessment", text: "We conduct a comprehensive needs assessment and develop a personalized support plan." },
  { icon: CheckCircle, title: "Support Begins", text: "The individual is connected to the appropriate programs and services based on their specific needs." },
];

export default function Partners() {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    referrer_name: "", referrer_organization: "", referrer_email: "", referrer_phone: "", referrer_role: "",
    organization_type: "", participant_first_name: "", participant_last_name: "", participant_phone: "",
    participant_email: "", reason_for_referral: "", primary_needs: [], urgency: "Standard", additional_notes: "",
    consent_obtained: false,
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleNeed = (need) => {
    setForm((prev) => ({
      ...prev,
      primary_needs: prev.primary_needs.includes(need)
        ? prev.primary_needs.filter((n) => n !== need)
        : [...prev.primary_needs, need],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reference_id = generateRefId("REF");
    await base44.entities.PartnerReferral.create({
      ...form,
      reference_id,
      source: "website_public",
      status: "pending_review",
    });
    setRefId(reference_id);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Partners & Referrals"
        title="Refer Someone Who Needs Support"
        description="Whether you are a probation officer, case manager, community leader, or concerned supporter, you can connect someone to structured opportunity."
        image="/__generating__/img_91310c420817.png"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="The Referral Process"
            description="Making a referral is simple. Here is what to expect after you submit."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/5 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-primary mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Who Can Be Referred"
            title="Appropriate Referrals"
            description="Our programs serve adults facing barriers to employment, housing stability, and successful community reentry."
          />
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Individuals reentering the community after incarceration", "Adults facing employment barriers", "People experiencing housing instability",
              "Individuals needing life skills development", "Those lacking digital literacy for job searching", "People needing document or ID assistance",
              "Adults seeking structured support and accountability", "Individuals referred by courts, agencies, or community organizations"].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" id="referral-form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <FormSuccess
              title="Referral Submitted Successfully"
              message="Thank you for your referral. Our team will review the submission and reach out to the participant within 2-3 business days."
              referenceId={refId}
            />
          ) : (
            <>
              <SectionHeading eyebrow="Submit Referral" title="Partner Referral Form" align="left" />
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-4">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Your Name *</Label><Input required value={form.referrer_name} onChange={(e) => updateField("referrer_name", e.target.value)} /></div>
                    <div><Label>Organization *</Label><Input required value={form.referrer_organization} onChange={(e) => updateField("referrer_organization", e.target.value)} /></div>
                    <div><Label>Email *</Label><Input type="email" required value={form.referrer_email} onChange={(e) => updateField("referrer_email", e.target.value)} /></div>
                    <div><Label>Phone</Label><Input value={form.referrer_phone} onChange={(e) => updateField("referrer_phone", e.target.value)} /></div>
                    <div><Label>Your Role/Title</Label><Input value={form.referrer_role} onChange={(e) => updateField("referrer_role", e.target.value)} /></div>
                    <div>
                      <Label>Organization Type</Label>
                      <Select value={form.organization_type} onValueChange={(v) => updateField("organization_type", v)}>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>{orgTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-4">Participant Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>First Name *</Label><Input required value={form.participant_first_name} onChange={(e) => updateField("participant_first_name", e.target.value)} /></div>
                    <div><Label>Last Name *</Label><Input required value={form.participant_last_name} onChange={(e) => updateField("participant_last_name", e.target.value)} /></div>
                    <div><Label>Phone</Label><Input value={form.participant_phone} onChange={(e) => updateField("participant_phone", e.target.value)} /></div>
                    <div><Label>Email</Label><Input value={form.participant_email} onChange={(e) => updateField("participant_email", e.target.value)} /></div>
                  </div>
                </div>

                <div>
                  <Label>Reason for Referral</Label>
                  <Textarea value={form.reason_for_referral} onChange={(e) => updateField("reason_for_referral", e.target.value)} rows={3} />
                </div>

                <div>
                  <Label className="mb-3 block">Primary Needs</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {needOptions.map((need) => (
                      <label key={need} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox checked={form.primary_needs.includes(need)} onCheckedChange={() => toggleNeed(need)} />
                        {need}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Urgency</Label>
                  <Select value={form.urgency} onValueChange={(v) => updateField("urgency", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{urgencyOptions.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Additional Notes</Label>
                  <Textarea value={form.additional_notes} onChange={(e) => updateField("additional_notes", e.target.value)} rows={3} />
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Checkbox required checked={form.consent_obtained} onCheckedChange={(v) => updateField("consent_obtained", v)} />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I confirm that the participant has been informed of and consents to this referral to Headquarters of Hope Foundation. *
                  </p>
                </div>

                <Button type="submit" size="lg" disabled={loading || !form.consent_obtained} className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
                  {loading ? "Submitting..." : "Submit Referral"} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}