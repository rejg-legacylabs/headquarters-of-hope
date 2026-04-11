import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Building2, Gift, HandHelping, Megaphone } from "lucide-react";

const supportWays = [
  {
    icon: Gift,
    title: "Make a Donation",
    description: "Financial contributions directly support our programs, helping participants access job readiness training, housing navigation, life skills development, and more.",
    note: "Online donation processing coming soon. Contact us directly to make a contribution.",
  },
  {
    icon: Building2,
    title: "Corporate Sponsorship",
    description: "Organizations can sponsor specific programs, events, or participant services. Your support builds visibility for your brand while building futures for our participants.",
    note: "Contact us to discuss sponsorship opportunities.",
  },
  {
    icon: Users,
    title: "Volunteer Your Time",
    description: "Share your skills and experience by volunteering as a mentor, workshop facilitator, resume reviewer, mock interviewer, or program support.",
    note: "Fill out our contact form with 'Volunteer Interest' to get started.",
  },
  {
    icon: HandHelping,
    title: "In-Kind Donations",
    description: "We accept donations of professional clothing, office supplies, technology equipment, and other resources that directly support our participants' success.",
    note: "Contact us to arrange in-kind donations.",
  },
  {
    icon: Heart,
    title: "Partner With Us",
    description: "Community organizations, faith-based groups, and service providers can partner with us to expand access and create comprehensive support networks.",
    note: "Visit our Partners page to learn more.",
  },
  {
    icon: Megaphone,
    title: "Spread the Word",
    description: "Help us reach more people who need support by sharing our mission with your network, on social media, and in your community.",
    note: "Every share helps someone find the support they need.",
  },
];

export default function Support() {
  return (
    <>
      <PageHero
        eyebrow="Support Us"
        title="Help Us Rebuild Lives"
        description="Every contribution, whether financial, in-kind, or through your time and talents, helps create pathways to stability for individuals and families."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ways to Give"
            title="How You Can Make a Difference"
            description="There are many ways to support the mission of Headquarters of Hope Foundation. Find the one that fits you."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {supportWays.map((way) => (
              <div key={way.title} className="bg-card border border-border rounded-xl p-6 lg:p-8 flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-5">
                  <way.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary mb-2">{way.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{way.description}</p>
                <p className="text-xs text-secondary font-medium italic">{way.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Contact us today to discuss how you can support the mission of Headquarters of Hope Foundation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase">
                Contact Us
              </Button>
            </Link>
            <Link to="/employers">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase">
                Employer Partnership
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}