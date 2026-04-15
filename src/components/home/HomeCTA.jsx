import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn } from "lucide-react";

export default function HomeCTA({ keysImage }) {
  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-primary">
            <div className="absolute inset-0">
              <img src={keysImage} alt="New beginnings" className="w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
            </div>
            <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl mx-auto">
                Ready to Take the First Step?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Whether you need help, want to refer someone, need transportation support, or are an employer looking to make a difference — we are ready.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/get-help">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm tracking-wide uppercase gap-2 h-12 px-8">
                    Get Help Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/transportation">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase h-12 px-8">
                    Request a Ride
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display text-sm tracking-wide uppercase h-12 px-8">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff / Partner Login Banner */}
      <section className="py-8 bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold tracking-widest uppercase text-muted-foreground mb-0.5">For Staff & Partners</p>
            <p className="text-sm text-muted-foreground">Access the internal Pathways operations dashboard to manage cases, submissions, and program workflows.</p>
          </div>
          <Link to="/admin" className="flex-shrink-0">
            <Button variant="outline" className="gap-2 font-display text-xs tracking-wide uppercase border-primary/30 text-primary hover:bg-primary hover:text-white">
              <LogIn className="w-4 h-4" /> Staff / Partner Login
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}