import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, Shield, Handshake, ClipboardList, Heart } from "lucide-react";

const supportAreas = [
  {
    icon: ClipboardList,
    title: "Housing Referral Assistance",
    text: "We help participants navigate the housing landscape by connecting them with approved transitional and permanent housing providers in the community.",
  },
  {
    icon: Shield,
    title: "Transitional Stabilization",
    text: "For individuals in immediate need, we coordinate with partners to provide transitional support while a longer-term housing plan is developed.",
  },
  {
    icon: Handshake,
    title: "Provider Coordination",
    text: "We maintain relationships with a network of approved housing providers, ensuring participants are connected to safe, supportive environments.",
  },
  {
    icon: Heart,
    title: "Stability & Employment Connection",
    text: "Housing stability and employment success are deeply connected. Our integrated approach ensures that housing support is paired with job readiness and life skills development.",
  },
];

export default function HousingSupport() {
  return (
    <>
      <PageHero
        eyebrow="Housing Support"
        title="Building the Foundation for Stability"
        description="Stable housing is the foundation upon which everything else is built. We help connect participants to housing pathways and stabilization support."
        image="/__generating__/img_79591a5b5954.png"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12 lg:mb-16">
            <SectionHeading
              eyebrow="Our Approach"
              title="Housing Navigation & Support"
              align="left"
            />
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                At Headquarters of Hope Foundation, we understand that stable housing is not just about having a roof overhead.
                It is about having the security, safety, and peace of mind required to focus on employment, personal growth,
                and long-term stability.
              </p>
              <p className="leading-relaxed">
                Our housing support services are designed to connect participants with appropriate housing pathways.
                We work closely with approved housing providers, transitional support organizations, and community resources
                to ensure that each individual's housing needs are addressed as part of their comprehensive support plan.
              </p>
              <p className="leading-relaxed italic text-primary/80">
                Please note: Headquarters of Hope Foundation provides housing navigation and referral assistance.
                We connect participants to housing resources and providers but do not directly operate housing facilities.
                Housing availability depends on provider capacity and participant eligibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Support Areas"
            title="How We Help With Housing"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {supportAreas.map((area) => (
              <div key={area.title} className="bg-white border border-border rounded-xl p-6 lg:p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Need Housing Support?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            If you or someone you know needs help connecting to housing resources, start the process today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-help">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
                Request Housing Support <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/partners">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase">
                Submit a Referral
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}