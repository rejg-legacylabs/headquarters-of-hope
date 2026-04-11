import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Users, Monitor, MessageSquare, Briefcase, Award, Target, ArrowRight } from "lucide-react";

const services = [
  { icon: FileText, title: "Resume Development", text: "Professional resume creation tailored to your skills, experience, and career goals. We help you present your strengths with confidence." },
  { icon: MessageSquare, title: "Interview Preparation", text: "Practice interviews, feedback, and coaching to help you walk into any interview feeling prepared and confident." },
  { icon: Monitor, title: "Digital Literacy", text: "From basic computer skills to online job applications and professional email, we ensure you can navigate today's digital workplace." },
  { icon: Users, title: "Mock Interviews", text: "Realistic practice sessions with constructive feedback so you know exactly what to expect and how to respond effectively." },
  { icon: Target, title: "Workplace Communication", text: "Professional communication skills including workplace etiquette, conflict resolution, and teamwork fundamentals." },
  { icon: Briefcase, title: "Employment Pathway Support", text: "Ongoing guidance through your job search process, from application to placement to retention and advancement." },
  { icon: Award, title: "Barrier Identification", text: "We identify specific barriers to employment, such as documentation gaps, transportation, or skill gaps, and create targeted solutions." },
  { icon: Users, title: "Employer Connections", text: "Direct introductions to our network of partner employers who value prepared candidates and believe in second-chance hiring." },
];

export default function JobReadiness() {
  return (
    <>
      <PageHero
        eyebrow="Job Readiness"
        title="Building Workforce Confidence & Competence"
        description="Our job readiness program equips participants with the skills, tools, and connections needed to secure and maintain meaningful employment."
        image="/__generating__/img_2ef69d5e2dc8.png"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="Comprehensive Employment Support"
            description="Employment is the cornerstone of stability. Our job readiness services address every aspect of workforce preparation, from skills to mindset to opportunity."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service) => (
              <div key={service.title} className="flex gap-4 p-6 bg-card border border-border rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              eyebrow="Getting Started"
              title="How to Access Job Readiness Services"
              description="Getting started is simple. Reach out through our intake form, or have a referral partner connect you with us. We will work together to build your employment pathway."
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-help">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2">
                Start Intake <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/employers">
              <Button size="lg" variant="outline" className="font-display text-sm tracking-wide uppercase">
                Employer Partner Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}