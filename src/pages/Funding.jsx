import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Car, FileText, Wrench, DollarSign, Users, Star, ArrowRight, Heart } from "lucide-react";

const fundingTiers = [
  {
    icon: DollarSign,
    label: "Founding Partner",
    amount: "$10,000+",
    description: "Fund an entire program area for a quarter. Major recognition as a founding partner across all public materials.",
    highlight: true,
  },
  {
    icon: Home,
    label: "Sponsor a Home",
    amount: "$5,000+",
    description: "Cover the cost of transitional housing placement for one participant for 30–90 days — a complete foundation reset.",
    highlight: false,
  },
  {
    icon: Car,
    label: "Sponsor Transportation",
    amount: "$500–$2,000",
    description: "Fund weekly transportation for one participant for a month — covering work rides, appointments, and critical access.",
    highlight: false,
  },
  {
    icon: FileText,
    label: "Barrier Removal Fund",
    amount: "$250–$1,000",
    description: "Cover IDs, birth certificates, Social Security cards, work gear, tools, uniforms, and licensing fees that stand between a person and a job.",
    highlight: false,
  },
  {
    icon: Wrench,
    label: "Equipment & Tools",
    amount: "$100–$500",
    description: "Donate work boots, safety gear, or trade tools needed for participants entering construction, trades, or warehouse work.",
    highlight: false,
  },
  {
    icon: Star,
    label: "Training Scholarship",
    amount: "$100–$300",
    description: "Fund enrollment in a certification course, vocational training program, or digital literacy workshop.",
    highlight: false,
  },
  {
    icon: Users,
    label: "Mentorship Program Sponsor",
    amount: "$1,000–$3,000",
    description: "Sponsor the mentorship program for a cohort — connecting participants with trained volunteer mentors and ongoing accountability.",
    highlight: false,
  },
  {
    icon: Heart,
    label: "General Program Support",
    amount: "Any Amount",
    description: "Contribute to where the need is greatest. Every dollar is allocated to direct program delivery — participant services, materials, and support staff.",
    highlight: false,
  },
];

const impactData = [
  { value: "$15", label: "covers one ride to a job interview" },
  { value: "$75", label: "covers a professional outfit for employment" },
  { value: "$150", label: "covers a full ID and document restoration packet" },
  { value: "$500", label: "covers one week of transitional housing" },
  { value: "$1,500", label: "covers one month of full program participation" },
  { value: "$5,000", label: "can transform an entire life trajectory" },
];

export default function Funding() {
  return (
    <>
      <PageHero
        eyebrow="Funding & Sponsorship"
        title="Invest in Human Potential"
        description="Every dollar you invest in Headquarters of Hope Foundation goes directly to removing barriers, building skills, and opening doors for individuals who are ready to rebuild their lives."
      />

      {/* Impact by dollar */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Your Impact"
            title="What Your Support Can Do"
            description="Our programs are built for maximum efficiency. Here is what your contribution translates to in real, direct impact."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {impactData.map((item) => (
              <div key={item.value} className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
                <div className="font-display text-2xl font-bold text-secondary flex-shrink-0">{item.value}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding tiers */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Sponsorship Opportunities"
            title="Ways to Fund the Work"
            description="Choose the sponsorship level and area that resonates with your values. All contributions are directed to direct program services."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fundingTiers.map((tier) => (
              <div
                key={tier.label}
                className={`rounded-xl border p-6 flex flex-col ${
                  tier.highlight
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-border"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${tier.highlight ? "bg-secondary/20" : "bg-primary/5"}`}>
                  <tier.icon className={`w-5 h-5 ${tier.highlight ? "text-secondary" : "text-primary"}`} />
                </div>
                <span className={`font-display text-xs font-bold tracking-widest uppercase mb-1 ${tier.highlight ? "text-secondary" : "text-secondary"}`}>
                  {tier.amount}
                </span>
                <h3 className={`font-heading text-lg font-semibold mb-2 ${tier.highlight ? "text-white" : "text-primary"}`}>
                  {tier.label}
                </h3>
                <p className={`text-sm leading-relaxed flex-1 ${tier.highlight ? "text-white/80" : "text-muted-foreground"}`}>
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Give */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeading eyebrow="Transparency" title="How We Use Your Support" align="left" />
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Headquarters of Hope Foundation is committed to financial transparency and responsible stewardship.
                Contributions go directly to participant services — not overhead.
              </p>
              <div className="space-y-3">
                {[
                  "Direct participant program services (housing, transportation, job readiness)",
                  "Barrier removal materials (IDs, documents, work gear, tools)",
                  "Training and certification scholarships",
                  "Case management and mentorship coordination",
                  "Transportation coordination and logistics",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <p className="leading-relaxed">
                We are a 501(c)(3) nonprofit organization. All qualifying contributions are tax-deductible to the extent permitted by law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Invest in a Life?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Contact us to discuss sponsorship, partnership, or any other way you would like to support our mission.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/support">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
                Get Involved <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase">
                Contact Us
              </Button>
            </Link>
            <Link to="/employers">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase">
                Corporate Partnership
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}