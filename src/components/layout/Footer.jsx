import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { label: "About Us", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Transportation", path: "/transportation" },
  { label: "How It Works", path: "/success-pathways" },
  { label: "FAQ", path: "/faq" },
];

const getInvolved = [
  { label: "Get Help", path: "/get-help" },
  { label: "Refer Someone", path: "/partners" },
  { label: "Employers", path: "/employers" },
  { label: "Support Us", path: "/support" },
  { label: "Funding & Sponsorship", path: "/funding" },
];

const programs = [
  { label: "Job Readiness", path: "/job-readiness" },
  { label: "Housing Support", path: "/housing-support" },
  { label: "Transportation", path: "/transportation" },
  { label: "Life Skills", path: "/programs" },
  { label: "Reentry Support", path: "/success-pathways" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" fill="currentColor" />
              </div>
              <div className="leading-tight">
                <span className="font-display text-sm font-bold tracking-wide uppercase block text-white">Headquarters</span>
                <span className="text-[10px] font-body tracking-widest uppercase text-white/60">of Hope Foundation</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Rebuilding lives through structured opportunity, dignity, and long-term support. Every person deserves a pathway to stability.
            </p>
            <div className="space-y-2.5 text-sm text-white/70">
              <a href="tel:7372558355" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-secondary" />
                <span>737-255-8355</span>
              </a>
              <a href="mailto:info@headquartersofhope.org" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-secondary" />
                <span>info@headquartersofhope.org</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-secondary mt-0.5" />
                <span>509 Sandstone Trail, Buda, TX 78610</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/70 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-5">Get Involved</h4>
            <ul className="space-y-2.5">
              {getInvolved.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/70 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-5">Programs</h4>
            <ul className="space-y-2.5">
              {programs.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/70 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Headquarters of Hope Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <span>A 501(c)(3) Nonprofit &middot; EIN 39-3366072</span>
            <Link to="/sms-terms" className="hover:text-white/80 transition-colors underline">SMS Terms &amp; Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}