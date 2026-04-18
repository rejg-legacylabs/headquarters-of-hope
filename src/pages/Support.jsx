import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import FormSuccess from "../components/shared/FormSuccess";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateRefId } from "../lib/generateRefId";
import { invokeHubFunction } from "@/lib/hubClient";
import { base44 } from "@/api/base44Client";
import { useState } from "react";
import { Users, HandHelping, Megaphone, Gift, ArrowRight, DollarSign } from "lucide-react";

const volunteerWays = [
  {
    icon: Users,
    title: "Mentorship",
    description: "Meet regularly with a participant to provide guidance, accountability, and encouragement on their path to stability.",
  },
  {
    icon: HandHelping,
    title: "Workshop Facilitation",
    description: "Lead a workshop in your area of expertise — financial literacy, resume writing, interview skills, job-specific trades, or digital literacy.",
  },
  {
    icon: Gift,
    title: "In-Kind Donations",
    description: "Donate professional clothing, office supplies, technology equipment, tools, or other resources our participants need to succeed.",
  },
  {
    icon: Megaphone,
    title: "Ambassador",
    description: "Help us reach more people by sharing our mission in your networks, your community, your faith community, or on social media.",
  },
];

const interestTypes = [
  "Volunteer - Mentorship",
  "Volunteer - Workshop Facilitation",
  "Volunteer - Resume/Interview Help",
  "In-Kind Donations",
  "Spread the Word / Ambassador",
  "Other",
];

export default function Support() {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", organization: "",
    interest_type: [], availability: "", notes: "",
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleInterest = (type) => {
    setForm((prev) => ({
      ...prev,
      interest_type: prev.interest_type.includes(type)
        ? prev.interest_type.filter((t) => t !== type)
        : [...prev.interest_type, type],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("💪 FORM SUBMITTED - Support Interest");
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        organization: form.organization.trim(),
        interest_type: form.interest_type,
        availability: form.availability,
        notes: form.notes.trim(),
        source: "website_public",
        status: "new",
      };
      console.log("📤 Payload sent:", payload);
      
      const reference_id = generateRefId("SUP");
      // Support interest is local-only, store locally
      await base44.entities.WebsiteSupportInterest.create({ ...payload, reference_id });
      console.log("✅ Local record created - Response:", reference_id);
      
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
        eyebrow="Get Involved"
        title="Volunteer & Support"
        description="Give your time, skills, or resources to help individuals rebuild their lives. Every contribution — big or small — creates real impact."
      />

      {/* Volunteer ways */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ways to Help"
            title="Share Your Time and Talent"
            description="We welcome volunteers who want to make a direct, personal difference in someone's journey toward stability."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {volunteerWays.map((way) => (
              <div key={way.title} className="bg-card border border-border rounded-xl p-6 flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                  <way.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-2">{way.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{way.description}</p>
              </div>
            ))}
          </div>

          {/* Cross-link to Funding */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-heading text-base font-semibold text-primary">Looking to Donate or Sponsor?</p>
                <p className="text-sm text-muted-foreground">Financial giving and corporate sponsorships are managed through our Funding page.</p>
              </div>
            </div>
            <Link to="/funding" className="flex-shrink-0">
              <Button className="bg-secondary hover:bg-secondary/90 text-primary font-display text-xs tracking-wide uppercase gap-2">
                View Funding Options <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Volunteer interest form */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <FormSuccess
              title="Interest Submitted — Thank You!"
              message="We have received your volunteer interest. Our team will be in touch within 3-5 business days to discuss how to get you connected."
              referenceId={refId}
            />
          ) : (
            <>
              <SectionHeading
                eyebrow="Volunteer Interest"
                title="Express Your Interest"
                description="Tell us how you would like to help and we will follow up with next steps."
                align="left"
              />
              <form onSubmit={handleSubmit} className="bg-white border border-border rounded-xl p-6 lg:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Full Name *</Label><Input required value={form.name} onChange={(e) => updateField("name", e.target.value)} /></div>
                  <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} /></div>
                  <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
                  <div><Label>Organization (if applicable)</Label><Input value={form.organization} onChange={(e) => updateField("organization", e.target.value)} /></div>
                </div>

                <div>
                  <Label className="mb-3 block">How Would You Like to Help? (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {interestTypes.map((type) => (
                      <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox checked={form.interest_type.includes(type)} onCheckedChange={() => toggleInterest(type)} />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Availability / Best Time to Connect</Label>
                  <Select value={form.availability} onValueChange={(v) => updateField("availability", v)}>
                    <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                    <SelectContent>
                      {["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Weekends", "Flexible"].map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Anything Else You Would Like Us to Know</Label>
                  <Textarea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} rows={3} placeholder="Skills, experience, or questions..." />
                </div>

                <Button type="submit" size="lg" disabled={loading || form.interest_type.length === 0} className="w-full bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
                  {loading ? "Submitting..." : "Submit Interest"} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Every Contribution Matters</h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Whether you give an hour a week or sponsor a full program, you are helping someone take the next step toward a stable life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/funding">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase">
                Funding & Sponsorship
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}