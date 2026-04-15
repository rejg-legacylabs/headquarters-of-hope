import PageHero from "../components/shared/PageHero";
import ProgramCard from "../components/programs/ProgramCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Home, BookOpen, Monitor, Building2, Compass, Shield, Car } from "lucide-react";

const programs = [
  {
    icon: Briefcase,
    title: "Job Readiness & Workforce Reentry",
    description: "Comprehensive employment preparation including resume development, interview skills, workplace communication, and direct connections to employers who believe in second chances.",
    outcomes: ["Professional resume and interview readiness", "Workplace communication skills", "Direct employer connections", "Ongoing employment support"],
    linkTo: "/job-readiness",
    linkLabel: "Job Readiness Details",
  },
  {
    icon: Home,
    title: "Housing Navigation & Support",
    description: "We help participants connect to stable housing pathways, transitional support, and coordination with approved housing providers to establish the foundation for everything else.",
    outcomes: ["Housing referral assistance", "Transitional support coordination", "Stability planning", "Connection to approved providers"],
    linkTo: "/housing-support",
    linkLabel: "Housing Support Details",
  },
  {
    icon: BookOpen,
    title: "Life Skills Development",
    description: "Building the essential skills for independent, stable living including financial literacy, conflict resolution, time management, and personal accountability.",
    outcomes: ["Financial literacy and budgeting", "Communication and conflict resolution", "Time management and planning", "Personal responsibility skills"],
  },
  {
    icon: Monitor,
    title: "Digital Literacy & Career Readiness",
    description: "Equipping participants with the digital skills required in today's workforce, from basic computer literacy to online job applications and professional email communication.",
    outcomes: ["Basic computer and internet skills", "Online job application proficiency", "Professional digital communication", "Technology for daily living"],
  },
  {
    icon: Building2,
    title: "Employer Connection & Placement Support",
    description: "We partner with local and regional employers who value prepared, motivated candidates and believe in the power of supportive hiring practices.",
    outcomes: ["Job matching and placement", "Employer relationship management", "Post-placement support", "Career advancement guidance"],
    linkTo: "/employers",
    linkLabel: "Employer Partnerships",
  },
  {
    icon: Compass,
    title: "Community Reentry Support",
    description: "Structured guidance for individuals transitioning back into community life, addressing the complex web of needs that arise during reentry.",
    outcomes: ["Reentry planning and navigation", "Community resource connection", "Mentorship and accountability", "Progress monitoring and support"],
  },
  {
    icon: Car,
    title: "Transportation Coordination",
    description: "Reliable, coordinated transportation to job interviews, first days of work, medical appointments, court dates, and other critical destinations.",
    outcomes: ["Ride coordination to job interviews & work", "Medical and appointment transport", "Court and probation access", "Emergency approved ride support"],
    linkTo: "/transportation",
    linkLabel: "Transportation Details",
  },
  {
    icon: Shield,
    title: "Barrier Reduction Support",
    description: "Identifying and addressing the specific barriers, from documentation to legal challenges, that prevent individuals from accessing opportunity.",
    outcomes: ["Document and ID assistance", "Work gear and tool support", "Legal resource referrals", "System navigation support"],
  },
];

export default function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Our Programs"
        title="Comprehensive Support for Every Step"
        description="Our programs are designed to work together, addressing the interconnected challenges of employment, housing, life skills, and community reentry."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.title} {...program} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Whether you are seeking support or want to help others access these programs, we are here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-help">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase">
                Request Help
              </Button>
            </Link>
            <Link to="/partners">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase">
                Make a Referral
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}