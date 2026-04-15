import { Link } from "react-router-dom";
import SectionHeading from "../shared/SectionHeading";
import { Target, Home, GraduationCap, Shield, Compass, HeartHandshake, Car } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Job Readiness & Placement",
    text: "Resume development, interview prep, digital literacy training, and direct employer connections to build lasting careers.",
    linkTo: "/job-readiness",
  },
  {
    icon: Home,
    title: "Housing Navigation",
    text: "Connecting participants to stable housing pathways, transitional support, and coordination with approved housing providers.",
    linkTo: "/housing-support",
  },
  {
    icon: Car,
    title: "Transportation Support",
    text: "Coordinated rides to job interviews, work, medical appointments, court dates, and essential services — removing a critical barrier.",
    linkTo: "/transportation",
  },
  {
    icon: GraduationCap,
    title: "Life Skills Development",
    text: "Financial literacy, communication skills, conflict resolution, and the foundational tools for independent living.",
  },
  {
    icon: Shield,
    title: "Barrier Reduction",
    text: "Addressing documentation, legal, and systemic barriers — IDs, work gear, certifications, and system navigation support.",
  },
  {
    icon: Compass,
    title: "Reentry Support",
    text: "Structured guidance for individuals transitioning back into community life after incarceration, with dignity and accountability.",
    linkTo: "/success-pathways",
  },
  {
    icon: HeartHandshake,
    title: "Community Partnerships",
    text: "Working with employers, agencies, and community organizations to create a network of support and opportunity.",
    linkTo: "/partners",
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Comprehensive Support for Lasting Change"
          description="Our integrated approach addresses the interconnected challenges of employment, housing, life skills, and community reintegration."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="group">
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.text}</p>
              {service.linkTo && (
                <Link to={service.linkTo} className="text-xs font-display font-bold tracking-wide uppercase text-secondary hover:text-secondary/80 transition-colors">
                  Learn more →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}