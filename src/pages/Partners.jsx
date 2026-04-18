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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateRefId } from "../lib/generateRefId";
import { invokeHubFunction } from "@/lib/hubClient";
import { Users, ClipboardCheck, ArrowRight, Phone, CheckCircle, Building2 } from "lucide-react";

const orgTypes = ["Probation/Parole", "Community Organization", "Nonprofit", "Workforce Agency", "Church/Faith-Based", "Reentry Organization", "Government Agency", "Other"];
const needOptions = ["Employment", "Housing", "Life Skills", "Digital Literacy", "Transportation", "Document Assistance", "Reentry Support", "Other"];
const urgencyOptions = ["Standard", "Urgent", "Emergency"];
const partnerOrgTypes = ["Nonprofit", "Faith-Based Organization", "Government Agency", "Workforce Agency", "Legal Aid", "Healthcare Provider", "Community Group", "Educational Institution", "Corporate/Business", "Other"];
const partnershipInterests = ["Referral Partner", "Resource Sharing", "Co-Programming", "Funding/Grants", "Volunteer Pipeline", "Employment Pipeline", "Training Collaboration", "Other"];

const steps = [
  { icon: ClipboardCheck, title: "Submit Referral", text: "Complete the referral form with as much information as possible about the individual you are referring." },
  { icon: Phone, title: "We Reach Out", text: "Our team reviews the referral and contacts the individual within 2-3 business days to begin the intake process." },
  { icon: Users, title: "Assessment", text: "We conduct a comprehensive needs assessment and develop a personalized support plan." },
  { icon: CheckCircle, title: "Support Begins", text: "The individual is connected to the appropriate programs and services based on their specific needs." },
];

function ReferralForm() {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    referrer_name: "", referrer_organization: "", referrer_email: "", referrer_phone: "", referrer_role: "",
    organization_type: "", participant_first_name: "", participant_last_name: "", participant_dob: "", participant_phone: "",
    participant_email: "", reason_for_referral: "", primary_needs: [], urgency: "Standard", additional_notes: "",
    consent_obtained: false,
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const toggleNeed = (need) => setForm((prev) => ({
    ...prev,
    primary_needs: prev.primary_needs.includes(need) ? prev.primary_needs.filter((n) => n !== need) : [...prev.primary_needs, need],
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("👥 FORM SUBMITTED - Partner Referral");
    try {
      const payload = {
        type: "partner_referral",
        source_type: "partner_referral",
        partner_name: form.referrer_name.trim(),
        partner_organization: form.referrer_organization.trim(),
        partner_email: form.referrer_email.trim(),
        partner_phone: form.referrer_phone.trim(),
        resident_first_name: form.participant_first_name.trim(),
        resident_last_name: form.participant_last_name.trim(),
        resident_dob: form.participant_dob || "",
        resident_phone: form.participant_phone.trim(),
        resident_email: form.participant_email.trim(),
        referral_notes: `Reason: ${form.reason_for_referral}\nNeeds: ${form.primary_needs.join(", ")}\nUrgency: ${form.urgency}\nNotes: ${form.additional_notes}`,
        source: "website_partner_referral",
      };
      console.log("📤 Partner Referral Payload sent:");
      console.log("  source_type:", payload.source_type);
      console.log("  type:", payload.type);
      console.log("  Full payload:", payload);

      const response = await invokeHubFunction("processIntakeSubmission", payload);
      console.log("✅ Hub confirmed creation - Response:", response.data);

      const reference_id = response.data?.reference_id || generateRefId("REF");
      setRefId(reference_id);
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Function call failed:", error);
      const errorMsg = error.response?.data?.error || error.message || "Unknown error occurred";
      console.error("📋 Error details:", errorMsg);
      alert(`Referral failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <FormSuccess title="Referral Submitted Successfully" message="Thank you for your referral. Our team will review the submission and reach out to the participant within 2-3 business days." referenceId={refId} />;

  return (
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
          <div><Label>Date of Birth</Label><Input type="date" value={form.participant_dob} onChange={(e) => updateField("participant_dob", e.target.value)} /></div>
          <div><Label>Phone</Label><Input value={form.participant_phone} onChange={(e) => updateField("participant_phone", e.target.value)} /></div>
          <div><Label>Email</Label><Input value={form.participant_email} onChange={(e) => updateField("participant_email", e.target.value)} /></div>
        </div>
      </div>

      <div><Label>Reason for Referral</Label><Textarea value={form.reason_for_referral} onChange={(e) => updateField("reason_for_referral", e.target.value)} rows={3} /></div>

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

      <div><Label>Additional Notes</Label><Textarea value={form.additional_notes} onChange={(e) => updateField("additional_notes", e.target.value)} rows={3} /></div>

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
  );
}

function PartnershipForm() {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    organization_name: "", contact_name: "", contact_email: "", contact_phone: "",
    organization_type: "", service_area: "", partnership_interest: [],
    how_they_want_to_help: "", notes: "",
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const toggleInterest = (item) => setForm((prev) => ({
    ...prev,
    partnership_interest: prev.partnership_interest.includes(item)
      ? prev.partnership_interest.filter((i) => i !== item)
      : [...prev.partnership_interest, item],
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("🏢 FORM SUBMITTED - Partnership Inquiry");
    try {
      const reference_id = generateRefId("PTR");
      // Partnership inquiry goes to Hub as well
      const payload = {
        type: "resource_provider",
        source_type: "resource_provider",
        organization_name: form.organization_name.trim(),
        contact_name: form.contact_name.trim(),
        contact_email: form.contact_email.trim(),
        contact_phone: form.contact_phone.trim(),
        services_offered: form.how_they_want_to_help,
        service_area: form.service_area,
        notes: form.notes,
        source: "website_public",
      };
      console.log("📤 Partnership Inquiry Payload sent:");
      console.log("  source_type:", payload.source_type);
      console.log("  type:", payload.type);
      console.log("  Full payload:", payload);

      const response = await invokeHubFunction("processIntakeSubmission", payload);
      console.log("✅ Hub confirmed creation - Response:", response.data);

      setRefId(response.data?.reference_id || reference_id);
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Function call failed:", error);
      const errorMsg = error.response?.data?.error || error.message || "Unknown error occurred";
      console.error("📋 Error details:", errorMsg);
      alert(`Partnership inquiry failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <FormSuccess title="Partnership Inquiry Submitted" message="Thank you for your interest in partnering with us. Our team will review your inquiry and follow up within 3-5 business days." referenceId={refId} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><Label>Organization Name *</Label><Input required value={form.organization_name} onChange={(e) => updateField("organization_name", e.target.value)} /></div>
        <div><Label>Contact Name *</Label><Input required value={form.contact_name} onChange={(e) => updateField("contact_name", e.target.value)} /></div>
        <div><Label>Contact Email *</Label><Input type="email" required value={form.contact_email} onChange={(e) => updateField("contact_email", e.target.value)} /></div>
        <div><Label>Contact Phone</Label><Input value={form.contact_phone} onChange={(e) => updateField("contact_phone", e.target.value)} /></div>
        <div>
          <Label>Organization Type</Label>
          <Select value={form.organization_type} onValueChange={(v) => updateField("organization_type", v)}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>{partnerOrgTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Service Area / Location</Label><Input value={form.service_area} onChange={(e) => updateField("service_area", e.target.value)} placeholder="City, region, or statewide" /></div>
      </div>

      <div>
        <Label className="mb-3 block">Partnership Interest (Select all that apply)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {partnershipInterests.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={form.partnership_interest.includes(item)} onCheckedChange={() => toggleInterest(item)} />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div><Label>How Do You Want to Help?</Label><Textarea value={form.how_they_want_to_help} onChange={(e) => updateField("how_they_want_to_help", e.target.value)} rows={3} placeholder="Describe your organization and what you hope to accomplish through a partnership..." /></div>
      <div><Label>Additional Notes</Label><Textarea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} rows={2} /></div>

      <Button type="submit" size="lg" disabled={loading} className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
        {loading ? "Submitting..." : "Submit Partnership Inquiry"} <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
}

export default function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Partners & Referrals"
        title="Connect, Refer, and Partner With Us"
        description="Whether you are referring someone who needs support or your organization wants to partner with us to expand our collective impact — this is your starting point."
        image="https://media.base44.com/images/public/69da8f993c6895f2b079653b/626ef8a22_generated_b82e6692.png"
      />

      {/* Referral process steps */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How It Works" title="The Referral Process" description="Making a referral is simple. Here is what to expect after you submit." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step) => (
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

      {/* Tabbed forms */}
      <section className="py-16 lg:py-24 bg-muted" id="partner-forms">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="referral">
            <TabsList className="w-full mb-8 bg-white border border-border">
              <TabsTrigger value="referral" className="flex-1 gap-2 text-sm">
                <Users className="w-4 h-4" /> Refer a Participant
              </TabsTrigger>
              <TabsTrigger value="partnership" className="flex-1 gap-2 text-sm">
                <Building2 className="w-4 h-4" /> Organization Partnership
              </TabsTrigger>
            </TabsList>

            <TabsContent value="referral">
              <div className="mb-6">
                <h3 className="font-heading text-2xl font-bold text-primary mb-2">Partner Referral Form</h3>
                <p className="text-muted-foreground text-sm">For probation officers, case managers, social workers, and community partners referring an individual for services.</p>
              </div>
              <ReferralForm />
            </TabsContent>

            <TabsContent value="partnership">
              <div className="mb-6">
                <h3 className="font-heading text-2xl font-bold text-primary mb-2">Organization Partnership Inquiry</h3>
                <p className="text-muted-foreground text-sm">For nonprofits, agencies, faith-based organizations, and community groups interested in formally partnering with us.</p>
              </div>
              <PartnershipForm />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}