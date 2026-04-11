import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList, Search, Map, Briefcase, Home, Users, TrendingUp } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Request Help / Intake",
    description: "It all starts with reaching out. You can complete our intake form online, be referred by a partner organization, or contact us directly. There is no wrong way to begin.",
    detail: "We make the process simple and supportive. Your initial request gives our team the information needed to understand your situation and begin planning your support.",
  },
  {
    num: "02",
    icon: Search,
    title: "Assessment & Review",
    description: "Our team reviews your intake information and conducts a thorough assessment of your needs, strengths, goals, and current barriers.",
    detail: "This is not a test. It is a conversation. We want to understand where you are, where you want to be, and what is standing in the way.",
  },
  {
    num: "03",
    icon: Map,
    title: "Personalized Support Plan",
    description: "Based on your assessment, we create a customized support plan that addresses your specific needs across employment, housing, life skills, and community reentry.",
    detail: "Your plan is yours. It is built around your goals and adapted as your needs evolve. We do not use one-size-fits-all approaches.",
  },
  {
    num: "04",
    icon: Briefcase,
    title: "Job Readiness & Support Services",
    description: "You begin participating in the programs and services identified in your plan, including job readiness training, digital literacy, life skills, and more.",
    detail: "Our team walks alongside you through every step, providing guidance, encouragement, and accountability as you build your skills and confidence.",
  },
  {
    num: "05",
    icon: Home,
    title: "Housing Connection",
    description: "If housing is part of your plan, we work to connect you with approved housing providers and transitional support resources.",
    detail: "Stable housing is the foundation for everything else. We coordinate with our housing partners to find the right fit for your situation.",
  },
  {
    num: "06",
    icon: Users,
    title: "Employer Connection & Placement",
    description: "When you are ready, we connect you with employers in our network who value prepared, motivated candidates.",
    detail: "Our employer partners understand the journey our participants are on and are committed to supportive, second-chance hiring practices.",
  },
  {
    num: "07",
    icon: TrendingUp,
    title: "Ongoing Progress & Stabilization",
    description: "Your journey does not end at placement. We continue to provide support, check-ins, and resources to help you maintain stability and continue growing.",
    detail: "Long-term success requires long-term support. We are here for the wins, the challenges, and everything in between.",
  },
];

export default function SuccessPathways() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="Your Pathway to Stability"
        description="From the moment you reach out to the day you achieve lasting stability, here is what the journey looks like with Headquarters of Hope Foundation."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary/20 to-accent" />

            <div className="space-y-12 lg:space-y-16">
              {steps.map((step) => (
                <div key={step.num} className="relative pl-16 lg:pl-24">
                  <div className="absolute left-0 top-0 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white border-2 border-secondary flex items-center justify-center shadow-sm">
                    <step.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
                    <span className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-2 block">
                      Step {step.num}
                    </span>
                    <h3 className="font-heading text-xl lg:text-2xl font-bold text-primary mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed italic">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Begin Your Pathway?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            You do not need to have it all figured out. You just need to take the first step. We will walk with you from there.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-help">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/partners">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase">
                Refer Someone
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}