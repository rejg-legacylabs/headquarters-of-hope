import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import FormSuccess from "../components/shared/FormSuccess";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { generateRefId } from "../lib/generateRefId";
import { invokeHubFunction } from "@/lib/hubClient";
import { useState } from "react";
import {
  Car, Briefcase, Home, Stethoscope, Scale, FileText,
  GraduationCap, Building, ArrowRight, Users, Heart, DollarSign
} from "lucide-react";

const rideTypes = [
  { icon: Briefcase, label: "Job Interview", desc: "Getting to your first opportunity" },
  { icon: Briefcase, label: "First Day of Work", desc: "Starting a new job successfully" },
  { icon: Car, label: "Recurring Work Transportation", desc: "Regular commute support" },
  { icon: Stethoscope, label: "Medical Appointment", desc: "Healthcare and treatment access" },
  { icon: Heart, label: "Counseling / Treatment", desc: "Mental health and recovery" },
  { icon: Scale, label: "Court / Probation", desc: "Legal and compliance appointments" },
  { icon: FileText, label: "DMV / ID Appointment", desc: "Document and ID obtainment" },
  { icon: Building, label: "Benefits Office", desc: "SNAP, Social Security, housing benefits" },
  { icon: GraduationCap, label: "School or Training", desc: "Workforce and skills development" },
  { icon: Home, label: "Housing Appointment", desc: "Securing stable housing" },
  { icon: ArrowRight, label: "Emergency Approved Support", desc: "Case manager pre-approved urgent need" },
];

const supporterWays = [
  {
    icon: Car,
    title: "Donate a Ride",
    desc: "Cover the cost of a single ride — as little as $15 can get a participant to a job interview.",
  },
  {
    icon: DollarSign,
    title: "Sponsor Transportation",
    desc: "Sponsor weekly, monthly, or per-participant transportation to keep people connected to work and services.",
  },
  {
    icon: Users,
    title: "Transportation Partner",
    desc: "If your organization provides transport services, partner with us to expand participant access.",
  },
  {
    icon: Heart,
    title: "In-Kind Vehicle Support",
    desc: "Donate a vehicle, contribute fuel cards, or support fleet maintenance to expand our capacity.",
  },
];

export default function Transportation() {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", phone: "", email: "",
    ride_purpose: "", pickup_location: "", destination: "",
    appointment_date: "", additional_notes: "", is_referral: false,
    referring_org: "", consent_to_contact: false,
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("🚗 FORM SUBMITTED - Transportation Request");
    try {
      const payload = {
        source_type: "website_application",
        data: {
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          preferred_name: "",
          date_of_birth: "",
          primary_language: "",
          population: "",
          notes: `TRANSPORTATION REQUEST\nPurpose: ${form.ride_purpose}\nPickup: ${form.pickup_location}\nDestination: ${form.destination}\nDate: ${form.appointment_date}\nReferred by: ${form.referring_org || "Self"}\nAdditional notes: ${form.additional_notes}`,
        },
        organization_id: "org1",
      };
      console.log("📤 Transportation Request Payload sent:");
      console.log("  source_type:", payload.source_type);
      console.log("  Full payload:", JSON.stringify(payload, null, 2));

      const response = await invokeHubFunction("processIntakeSubmission", payload);
      console.log("✅ Hub response:", response.data);
      console.log("  received_by_hub:", response.data?.received_by_hub);

      const reference_id = response.data?.reference_id || generateRefId("TRN");
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
        eyebrow="Transportation Support"
        title="Getting You Where You Need to Go"
        description="Transportation is not a luxury — it is a lifeline. We help participants access reliable transportation to jobs, appointments, housing, and essential services."
      />

      {/* Who It's For */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading eyebrow="Who We Serve" title="Transportation Support for Real Life Barriers" align="left" />
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Lack of transportation is one of the most common and most overlooked barriers to employment and stability.
                  A missed job interview, a skipped probation check-in, or an unreachable medical appointment can unravel months of progress.
                </p>
                <p className="leading-relaxed">
                  Headquarters of Hope Foundation's transportation support program connects participants with reliable, coordinated
                  rides to critical appointments and work commitments — removing one of the most persistent obstacles on the pathway to independence.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#request-form">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-xs tracking-wide uppercase gap-2">
                    Request Transportation <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <Link to="/partners">
                  <Button size="lg" variant="outline" className="font-display text-xs tracking-wide uppercase">
                    Refer a Client
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Individuals reentering after incarceration",
                "Participants without a license or vehicle",
                "Those in areas with limited public transit",
                "People securing a new job or training",
                "Participants attending required appointments",
                "Anyone with transportation as a documented barrier",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approved Ride Purposes */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Approved Ride Purposes"
            title="Where We Help You Get To"
            description="Our transportation support covers the appointments and commitments that matter most on the path to stability."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rideTypes.map((ride) => (
              <div key={ride.label} className="flex items-center gap-4 bg-white border border-border rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <ride.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-primary">{ride.label}</p>
                  <p className="text-xs text-muted-foreground">{ride.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="The Transportation Request Process"
            description="Requesting transportation support is straightforward. Our team handles coordination and scheduling."
          />
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
              {[
                { step: "01", title: "Submit a Request", text: "Fill out the transportation request form below, or have a case manager or partner submit on your behalf." },
                { step: "02", title: "Review & Approval", text: "Our team reviews the request, confirms the purpose qualifies, and coordinates availability — typically within 1 business day." },
                { step: "03", title: "Ride Coordination", text: "We coordinate your ride using approved providers. You will receive confirmation details including pickup time and contact information." },
                { step: "04", title: "Get There, Stay On Track", text: "Your ride gets you to your appointment. Our team tracks completion and follows up to support your continued progress." },
              ].map((item) => (
                <div key={item.step} className="relative pl-14 pb-10 last:pb-0">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary border-2 border-primary flex items-center justify-center">
                    <span className="font-display text-xs font-bold text-white">{item.step}</span>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h4 className="font-heading text-lg font-semibold text-primary mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Request Form */}
      <section className="py-16 lg:py-24 bg-muted" id="request-form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <FormSuccess
              title="Transportation Request Submitted"
              message="We have received your request. Our team will review it and follow up within 1 business day to confirm details and coordinate your ride."
              referenceId={refId}
            />
          ) : (
            <>
              <SectionHeading
                eyebrow="Request Support"
                title="Transportation Request Form"
                description="Fill out the form below to submit a transportation request. All requests are reviewed by our team."
                align="left"
              />
              <form onSubmit={handleSubmit} className="bg-white border border-border rounded-xl p-6 lg:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>First Name *</Label><Input required value={form.first_name} onChange={(e) => updateField("first_name", e.target.value)} /></div>
                  <div><Label>Last Name *</Label><Input required value={form.last_name} onChange={(e) => updateField("last_name", e.target.value)} /></div>
                  <div><Label>Phone *</Label><Input required value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
                  <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} /></div>
                </div>

                <div>
                  <Label>Purpose of Ride *</Label>
                  <Select value={form.ride_purpose} onValueChange={(v) => updateField("ride_purpose", v)}>
                    <SelectTrigger><SelectValue placeholder="Select ride purpose" /></SelectTrigger>
                    <SelectContent>
                      {rideTypes.map((r) => <SelectItem key={r.label} value={r.label}>{r.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Pickup Location *</Label><Input required value={form.pickup_location} onChange={(e) => updateField("pickup_location", e.target.value)} placeholder="Address or area" /></div>
                  <div><Label>Destination *</Label><Input required value={form.destination} onChange={(e) => updateField("destination", e.target.value)} placeholder="Address or location name" /></div>
                </div>

                <div>
                  <Label>Appointment / Ride Date</Label>
                  <Input type="date" value={form.appointment_date} onChange={(e) => updateField("appointment_date", e.target.value)} />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox checked={form.is_referral} onCheckedChange={(v) => updateField("is_referral", v)} />
                  <span className="text-sm">This is a referral — I am submitting on behalf of a participant</span>
                </label>

                {form.is_referral && (
                  <div>
                    <Label>Referring Organization / Case Manager Name</Label>
                    <Input value={form.referring_org} onChange={(e) => updateField("referring_org", e.target.value)} />
                  </div>
                )}

                <div>
                  <Label>Additional Notes</Label>
                  <Textarea value={form.additional_notes} onChange={(e) => updateField("additional_notes", e.target.value)} rows={3} placeholder="Any additional context that would help us coordinate..." />
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Checkbox required checked={form.consent_to_contact} onCheckedChange={(v) => updateField("consent_to_contact", v)} />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I consent to be contacted by Headquarters of Hope Foundation to coordinate this transportation request. *
                  </p>
                </div>

                <Button type="submit" size="lg" disabled={loading || !form.consent_to_contact || !form.ride_purpose} className="w-full bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
                  {loading ? "Submitting..." : "Submit Transportation Request"} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Support Transportation */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Support Transportation" title="Help Keep People Moving" light
            description="Transportation is one of our most immediate and tangible funding needs. Your support directly removes a barrier."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {supporterWays.map((way) => (
              <div key={way.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <way.icon className="w-8 h-8 text-secondary mb-4" />
                <h4 className="font-heading text-lg font-semibold text-white mb-2">{way.title}</h4>
                <p className="text-sm text-white/70 leading-relaxed">{way.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center flex flex-wrap justify-center gap-4">
            <Link to="/support">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase">
                Sponsor Transportation
              </Button>
            </Link>
            <Link to="/partners">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase">
                Become a Transportation Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}