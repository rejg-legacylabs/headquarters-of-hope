import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Community members working together at Headquarters of Hope Foundation"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <span className="inline-block font-display text-xs font-bold tracking-widest uppercase text-secondary mb-6">
          Headquarters of Hope Foundation
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-5xl leading-tight mb-6">
          Rebuilding Lives Through{" "}
          <span className="text-secondary">Structured Opportunity</span>
        </h1>
        <p className="text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
          We help individuals overcome barriers to employment, housing, and stability,
          providing the structure and support needed to build lasting, dignified futures.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/get-help">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2 h-12 px-8">
              I Need Help <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/partners">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase h-12 px-8">
              Refer Someone
            </Button>
          </Link>
          <Link to="/employers">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase h-12 px-8">
              Employers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}