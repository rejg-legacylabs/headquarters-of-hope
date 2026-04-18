import { useState } from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import FormSuccess from "../components/shared/FormSuccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { generateRefId } from "../lib/generateRefId";
import { invokeHubFunction } from "@/lib/hubClient";
import { ArrowRight, Shield, AlertCircle } from "lucide-react";

const needOptions = ["Employment", "Housing", "Life Skills", "Digital Literacy", "Transportation", "Document Assistance", "Reentry Support", "Other"];

export default function GetHelp() {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", preferred_name: "", phone: "", email: "", date_of_birth: "",
    current_situation: "", primary_needs: [], housing_need: false, employment_need: false,
    transportation_barrier: false, document_barrier: false, digital_literacy_help: false,
    notes: "", consent_to_contact: false,
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
    try {
      const payload = {
        type: "resident_application",
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        dob: form.date_of_birth || "",
        phone: form.phone.trim(),
        email: form.email.trim(),
        housing_status: form.housing_need ? "seeking" : "unknown",
        employment_status: form.employment_need ? "seeking" : "unknown",
        notes: `Current situation: ${form.current_situation}\nNeeds: ${form.primary_needs.join(", ")}\nAdditional: ${form.notes}`,
        source: "website",
      };
      
      console.log("📤 Form Submission Debug:");
      console.log("  Payload:", payload);
      console.log("  Routing to Hub via invokeHubFunction...");
      
      const response = await invokeHubFunction("processIntakeSubmission", payload);
      console.log("✅ Hub confirmed creation:", response.data);
      
      const reference_id = response.data?.reference_id || generateRefId("INT");
      setRefId(reference_id);
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Hub submission failed:", error);
      const errorMsg = error.response?.data?.error || error.message || "Unknown error occurred";
      alert(`Submission failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Get Help"
        title="Your Journey Starts Here"
        description="Taking the first step is the hardest. We are here to walk with you, providing the structure and support needed to build a stable, dignified future."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Who Should Fill This Out?</h3>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>This form is for anyone who needs support with employment, housing, life skills, or community reentry. If you are facing barriers and want help building a stable future, this is your starting point.</p>
                  <p>You do not need to have everything figured out. You just need to be willing to take the first step.</p>
                </div>

                <div className="mt-8 p-4 bg-muted rounded-lg">
                  <h4 className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-2">What Happens Next?</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="font-bold text-primary">1.</span> You submit this form</li>
                    <li className="flex gap-2"><span className="font-bold text-primary">2.</span> Our team reviews your request</li>
                    <li className="flex gap-2"><span className="font-bold text-primary">3.</span> We reach out to schedule an assessment</li>
                    <li className="flex gap-2"><span className="font-bold text-primary">4.</span> Together, we build your support plan</li>
                  </ol>
                </div>

                <div className="mt-8 flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Your information is kept confidential and will only be used by our team to provide you with appropriate support and services.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <FormSuccess
                  title="Request Submitted Successfully"
                  message="Thank you for reaching out. Our team will review your request and contact you within 2-3 business days to discuss next steps. You have taken an important first step."
                  referenceId={refId}
                />
              ) : (
                <>
                  <SectionHeading eyebrow="Intake Form" title="Request Help" align="left" />
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label>First Name *</Label><Input required value={form.first_name} onChange={(e) => updateField("first_name", e.target.value)} /></div>
                        <div><Label>Last Name *</Label><Input required value={form.last_name} onChange={(e) => updateField("last_name", e.target.value)} /></div>
                        <div><Label>Preferred Name</Label><Input value={form.preferred_name} onChange={(e) => updateField("preferred_name", e.target.value)} placeholder="What should we call you?" /></div>
                        <div><Label>Date of Birth</Label><Input type="date" value={form.date_of_birth} onChange={(e) => updateField("date_of_birth", e.target.value)} /></div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label>Phone *</Label><Input required value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
                        <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} /></div>
                      </div>
                    </div>

                    <div>
                      <Label>Tell Us About Your Current Situation</Label>
                      <Textarea value={form.current_situation} onChange={(e) => updateField("current_situation", e.target.value)} rows={3} placeholder="Share as much or as little as you would like..." />
                    </div>

                    <div>
                      <Label className="mb-3 block">What Do You Need Help With?</Label>
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
                      <h3 className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-4">Specific Needs</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <Checkbox checked={form.housing_need} onCheckedChange={(v) => updateField("housing_need", v)} />
                          <span className="text-sm">I need help with housing</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <Checkbox checked={form.employment_need} onCheckedChange={(v) => updateField("employment_need", v)} />
                          <span className="text-sm">I need help finding employment</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <Checkbox checked={form.transportation_barrier} onCheckedChange={(v) => updateField("transportation_barrier", v)} />
                          <span className="text-sm">Transportation is a barrier for me</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <Checkbox checked={form.document_barrier} onCheckedChange={(v) => updateField("document_barrier", v)} />
                          <span className="text-sm">I need help with documents or ID</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <Checkbox checked={form.digital_literacy_help} onCheckedChange={(v) => updateField("digital_literacy_help", v)} />
                          <span className="text-sm">I need help with computers or technology</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label>Anything Else You Would Like Us to Know</Label>
                      <Textarea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} rows={3} />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-muted rounded-lg border border-border">
                      <Checkbox required checked={form.consent_to_contact} onCheckedChange={(v) => updateField("consent_to_contact", v)} />
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        <p className="font-medium text-foreground mb-1">Consent to Contact *</p>
                        <p>I consent to being contacted by Headquarters of Hope Foundation regarding my request for support. I understand my information will be kept confidential and used only to provide appropriate services.</p>
                      </div>
                    </div>

                    <Button type="submit" size="lg" disabled={loading || !form.consent_to_contact} className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2 w-full md:w-auto">
                      {loading ? "Submitting..." : "Submit Request"} <ArrowRight className="w-4 h-4" />
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