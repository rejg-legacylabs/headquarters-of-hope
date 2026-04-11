import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Eye, Shield, Users, Star, Target } from "lucide-react";

const values = [
  { icon: Heart, title: "Hope", text: "We believe every person has the capacity for meaningful change and deserves the opportunity to prove it." },
  { icon: Shield, title: "Dignity", text: "We treat every individual with respect and honor their humanity, regardless of their past." },
  { icon: Target, title: "Accountability", text: "We hold ourselves and our participants to high standards because we believe in the potential within each person." },
  { icon: Users, title: "Community", text: "Lasting change happens in community. We build networks of support that extend far beyond our programs." },
  { icon: Star, title: "Excellence", text: "We pursue quality in every service, partnership, and interaction because the people we serve deserve nothing less." },
  { icon: Eye, title: "Transparency", text: "We operate with openness and integrity, building trust through honest communication and measurable outcomes." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Who We Are"
        description="Headquarters of Hope Foundation exists because we believe that second chances, when paired with structured support, can transform lives and communities."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="Our Story"
              title="Why We Exist"
              align="left"
            />
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                Headquarters of Hope Foundation was born from a simple but powerful conviction: that every person,
                regardless of their past, deserves access to the tools, support, and opportunities needed to build
                a stable, dignified future.
              </p>
              <p className="leading-relaxed">
                Too many individuals face overlapping barriers, unemployment, housing instability, lack of documentation,
                limited digital literacy, and disconnection from community resources. These challenges do not exist in isolation.
                A person cannot hold a job without stable housing. They cannot secure housing without income. They cannot
                access opportunity without the skills and support to navigate modern systems.
              </p>
              <p className="leading-relaxed">
                We address this reality head-on. Our integrated approach connects job readiness, housing navigation,
                life skills development, and community partnership into a single, structured pathway. We do not simply
                offer services; we walk alongside people as they rebuild.
              </p>
              <p className="leading-relaxed">
                The foundation works with probation and parole officers, workforce agencies, community organizations,
                faith-based groups, and employers to create a supportive ecosystem where individuals can transition
                from instability to self-sufficiency, one step at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <span className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-3 block">Our Mission</span>
              <h3 className="font-heading text-3xl font-bold text-white mb-4">
                Empowering individuals to overcome barriers and build stable, self-sufficient lives through structured support,
                workforce readiness, and community partnership.
              </h3>
            </div>
            <div>
              <span className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-3 block">Our Vision</span>
              <h3 className="font-heading text-3xl font-bold text-white mb-4">
                A community where every person has equitable access to employment, housing stability, and the ongoing support
                needed to thrive, regardless of their background.
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="What Guides Our Work"
            description="These values are the foundation of everything we do, from how we serve participants to how we partner with communities."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val) => (
              <div key={val.title} className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                  <val.icon className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-primary mb-2">{val.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="The Problem"
              title="Why Our Work Matters"
            />
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Every year, hundreds of thousands of individuals leave incarceration or face sudden instability with
                nowhere to turn. Without employment, they cannot afford housing. Without housing, they cannot maintain
                employment. Without life skills and digital literacy, they cannot navigate the systems designed to help them.
              </p>
              <p className="leading-relaxed">
                The result is a cycle of instability, recidivism, homelessness, and lost potential. Communities suffer.
                Families suffer. Individuals who want to change are set up to fail by systems that do not address the
                interconnected nature of their challenges.
              </p>
              <p className="leading-relaxed font-medium text-primary">
                Headquarters of Hope Foundation breaks this cycle by providing a structured, integrated pathway
                that addresses employment, housing, skills, and support simultaneously, not in isolation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            Be Part of the Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Whether you need help, want to refer someone, or are looking to partner with us, we are ready to connect.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-help">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display text-sm tracking-wide uppercase">
                Get Help
              </Button>
            </Link>
            <Link to="/partners">
              <Button size="lg" variant="outline" className="font-display text-sm tracking-wide uppercase">
                Refer Someone
              </Button>
            </Link>
            <Link to="/employers">
              <Button size="lg" variant="outline" className="font-display text-sm tracking-wide uppercase">
                Employer Partnership
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}