import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Partners", path: "/partners" },
  { label: "Support Us", path: "/funding" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-secondary" fill="currentColor" />
            </div>
            <div className="leading-tight">
              <span className="font-display text-sm font-bold text-primary tracking-wide uppercase block">
                Headquarters
              </span>
              <span className="text-[10px] font-body text-muted-foreground tracking-widest uppercase">
                of Hope Foundation
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1.5 font-display text-xs tracking-wide uppercase">
                <LogIn className="w-3.5 h-3.5" /> Staff Login
              </Button>
            </Link>
            <Link to="/get-help">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display text-xs tracking-wide uppercase">
                Get Help
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md hover:bg-muted"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Link to="/get-help" onClick={() => setOpen(false)}>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display text-xs tracking-wide uppercase">
                  Get Help
                </Button>
              </Link>
              <Link to="/partners" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full text-xs font-display tracking-wide uppercase">
                  Refer Someone
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}