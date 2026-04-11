import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function ProgramCard({ icon: Icon, title, description, outcomes, linkTo, linkLabel }) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 lg:p-8 flex flex-col h-full">
      <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-primary mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{description}</p>
      {outcomes && outcomes.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-display tracking-wide uppercase text-secondary font-bold mb-2">Key Outcomes</p>
          <ul className="space-y-1.5">
            {outcomes.map((outcome, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      )}
      {linkTo && (
        <Link to={linkTo} className="inline-flex items-center text-sm font-medium text-secondary hover:gap-2 gap-1 transition-all mt-auto">
          {linkLabel || "Learn More"} <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}