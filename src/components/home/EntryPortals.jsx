import { HandHelping, Briefcase, Users, Building2 } from "lucide-react";
import CTACard from "../shared/CTACard";

const portals = [
  {
    icon: HandHelping,
    title: "I Need Help",
    description: "Facing barriers to employment, housing, or stability? Start your journey with us today. We are here to walk alongside you.",
    linkTo: "/get-help",
    linkLabel: "Request Help",
  },
  {
    icon: Briefcase,
    title: "I Want to Hire",
    description: "Partner with us to access motivated, job-ready candidates who are committed to building stable careers.",
    linkTo: "/employers",
    linkLabel: "Employer Partnership",
  },
  {
    icon: Users,
    title: "I Want to Refer",
    description: "Are you a probation officer, case manager, or community partner? Refer someone who could benefit from our programs.",
    linkTo: "/partners",
    linkLabel: "Make a Referral",
  },
  {
    icon: Building2,
    title: "I Want to Partner",
    description: "Join our network of community organizations, agencies, and supporters working together to rebuild lives.",
    linkTo: "/partners",
    linkLabel: "Become a Partner",
  },
];

export default function EntryPortals() {
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal) => (
            <CTACard key={portal.title} {...portal} />
          ))}
        </div>
      </div>
    </section>
  );
}