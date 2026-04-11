import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "../shared/SectionHeading";

const steps = [
  { num: "01", title: "Request Help", text: "Reach out through our intake form or get referred by a partner organization." },
  { num: "02", title: "Assessment & Review", text: "Our team reviews your situation and identifies your most pressing needs." },
  { num: "03", title: "Personalized Plan", text: "We create a tailored support plan addressing employment, housing, and life skills." },
  { num: "04", title: "Support & Services", text: "Receive job readiness training, housing navigation, and barrier reduction support." },
  { num: "05", title: "Connection & Placement", text: "Get connected to employers, housing, and community resources for long-term stability." },
];

export default function PathwayPreview() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Pathway"
          title="How Our Process Works"
          description="From first contact to long-term stability, we walk alongside you every step of the way."
          light
        />
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-secondary/30" />
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center">
                <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-sm font-bold text-secondary">{step.num}</span>
                </div>
                <h4 className="font-heading text-lg font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-white/70 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <Link to="/success-pathways">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase">
              Learn More About Our Process
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}