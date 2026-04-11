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
import { ArrowRight, Users, Award, Heart, TrendingUp, Shield, Briefcase } from "lucide-react";

const interestOptions = ["Hire Participants", "Mentorship", "Job Shadowing", "Internships", "Training Partnership", "Financial Support", "Other"];
const sizeOptions = ["1-10", "11-50", "51-200", "201-500", "500+"];

const benefits = [
  { icon: Users, title: "Prepared Candidates", text: "Our participants complete comprehensive job readiness training before placement. They arrive prepared, motivated, and accountable." },
  { icon: Award, title: "Ongoing Support", text: "We do not disappear after placement. Our team provides ongoing support for both the employer and the participant." },
  { icon: Heart, title: "Community Impact", text: "Every hire contributes to reduced recidivism, stronger families, and more vibrant communities." },
  { icon: TrendingUp, title: "Tax Incentives", text: "Many employers qualify for Work Opportunity Tax Credits and other incentives when hiring through supportive employment programs." },
  { icon: Shield, title: "Reduced Turnover", text: "Participants who receive structured support tend to be highly committed employees with strong retention rates." },
  { icon: Briefcase, title: "Diverse Talent Pipeline", text: "Access a pool of motivated individuals with varied skills, backgrounds, and perspectives who are eager to contribute." },
];

export default function Employers() {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company_name: "", contact_name: "", contact_title: "", contact_email: "", contact_phone: "",
    industry: "", company_size: "", interest_type: [], positions_available: "",
    second_chance_friendly: false, additional_notes: "",
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleInterest = (item) => {
    setForm((prev) => ({
      ...prev,
      interest_type: prev.interest_type.includes(item)
        ? prev.interest_type.filter((i) => i !== item)
        : [...prev.interest_type, item],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reference_id = generateRefId("EMP");
    await base44.entities.EmployerInquiry.create({
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
        eyebrow="Employers"
        title="Partner With Us to Rebuild Lives"
        description="Join our network of employers who are making a difference by providing meaningful employment opportunities to motivated, prepared individuals."
        image="https://media.base44.com/images/public/69da8f993c6895f2b079653b/4c6476532_generated_4bb93f6e.png"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Partner"
            title="The Benefits of Employer Partnership"
            description="When you partner with Headquarters of Hope Foundation, you gain more than employees. You gain committed team members with a strong support system behind them."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-primary mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionHeading
              eyebrow="Our Participants"
              title="What to Expect From Our Candidates"
              description="Our participants complete a comprehensive preparation process before being connected to employers."
            />
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Professional resume and interview preparation", "Digital literacy and workplace technology skills",
              "Workplace communication and soft skills training", "Conflict resolution and professionalism coaching",
              "Understanding of workplace expectations and norms", "Personal accountability and goal-setting",
              "Ongoing support from our case management team", "Commitment to stability and long-term employment"].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" id="employer-form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <FormSuccess
              title="Inquiry Submitted Successfully"
              message="Thank you for your interest in partnering with Headquarters of Hope Foundation. Our employer partnerships team will be in touch within 2-3 business days."
              referenceId={refId}
            />
          ) : (
            <>
              <SectionHeading eyebrow="Get Started" title="Employer Interest Form" align="left" />
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Company Name *</Label><Input required value={form.company_name} onChange={(e) => updateField("company_name", e.target.value)} /></div>
                  <div><Label>Contact Name *</Label><Input required value={form.contact_name} onChange={(e) => updateField("contact_name", e.target.value)} /></div>
                  <div><Label>Title</Label><Input value={form.contact_title} onChange={(e) => updateField("contact_title", e.target.value)} /></div>
                  <div><Label>Email *</Label><Input type="email" required value={form.contact_email} onChange={(e) => updateField("contact_email", e.target.value)} /></div>
                  <div><Label>Phone</Label><Input value={form.contact_phone} onChange={(e) => updateField("contact_phone", e.target.value)} /></div>
                  <div><Label>Industry</Label><Input value={form.industry} onChange={(e) => updateField("industry", e.target.value)} /></div>
                  <div>
                    <Label>Company Size</Label>
                    <Select value={form.company_size} onValueChange={(v) => updateField("company_size", v)}>
                      <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                      <SelectContent>{sizeOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Areas of Interest</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interestOptions.map((item) => (
                      <label key={item} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox checked={form.interest_type.includes(item)} onCheckedChange={() => toggleInterest(item)} />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div><Label>Positions/Roles Available</Label><Textarea value={form.positions_available} onChange={(e) => updateField("positions_available", e.target.value)} rows={2} /></div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox checked={form.second_chance_friendly} onCheckedChange={(v) => updateField("second_chance_friendly", v)} />
                  <span className="text-sm">We are open to second-chance / supportive hiring</span>
                </label>

                <div><Label>Additional Notes</Label><Textarea value={form.additional_notes} onChange={(e) => updateField("additional_notes", e.target.value)} rows={3} /></div>

                <Button type="submit" size="lg" disabled={loading} className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
                  {loading ? "Submitting..." : "Submit Inquiry"} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}