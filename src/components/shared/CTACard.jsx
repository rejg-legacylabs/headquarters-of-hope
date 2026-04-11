import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function CTACard({ icon: Icon, title, description, linkTo, linkLabel }) {
  return (
    <Link
      to={linkTo}
      className="group block bg-white border border-border rounded-xl p-6 lg:p-8 hover:border-secondary/50 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-secondary/10 transition-colors">
        <Icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
      <span className="inline-flex items-center text-sm font-medium text-secondary group-hover:gap-2 gap-1 transition-all">
        {linkLabel} <ChevronRight className="w-4 h-4" />
      </span>
    </Link>
  );
}