import PageHero from "../components/shared/PageHero";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    category: "Getting Help",
    items: [
      {
        q: "Who does Headquarters of Hope Foundation serve?",
        a: "We serve adults who are facing barriers to employment, housing stability, and successful community reintegration. This includes individuals reentering the community after incarceration, people experiencing homelessness or housing instability, and anyone facing systemic barriers to self-sufficiency. Our programs are open to all individuals who are willing to engage in the process of rebuilding.",
      },
      {
        q: "How do I apply for services?",
        a: "You can start by completing our online intake form on the Get Help page. You can also be referred by a community partner, probation or parole officer, social worker, or other service provider. Once we receive your request, our team will review it and reach out to schedule an assessment within 2-3 business days.",
      },
      {
        q: "Is there a cost for services?",
        a: "No. Our programs and services are provided at no cost to participants. We are a nonprofit organization funded through grants, donations, and community partnerships.",
      },
      {
        q: "What documentation do I need?",
        a: "At the time of your initial request, you do not need any specific documentation. During the assessment process, we may discuss documentation needs based on your specific situation. If you need help obtaining documents such as identification, birth certificates, or Social Security cards, our barrier reduction support can assist with that.",
      },
      {
        q: "How long does the process take?",
        a: "The timeline varies based on individual needs and circumstances. After submitting your intake form, you can expect initial contact within 2-3 business days. The assessment and support plan development typically takes 1-2 weeks. Active program participation timelines depend on the specific services in your plan, but most participants engage for 3-6 months or longer.",
      },
    ],
  },
  {
    category: "Programs & Services",
    items: [
      {
        q: "Is housing guaranteed?",
        a: "We provide housing navigation and referral assistance, connecting participants to approved housing providers and transitional support. Housing availability depends on provider capacity and participant eligibility. While we cannot guarantee housing placement, we work diligently to connect participants to appropriate housing resources.",
      },
      {
        q: "Is employment guaranteed?",
        a: "We provide comprehensive job readiness training, resume development, interview preparation, and direct connections to employer partners. While we cannot guarantee specific job placements, our job readiness program has a strong track record of helping participants secure meaningful employment. Success depends on individual effort and engagement.",
      },
      {
        q: "What kind of jobs do participants get?",
        a: "Our employer partners span a range of industries including warehousing and logistics, food service and hospitality, construction and trades, retail, healthcare support, manufacturing, and more. We work to match participants with positions that align with their skills, interests, and goals.",
      },
    ],
  },
  {
    category: "Referrals & Partnerships",
    items: [
      {
        q: "How do I refer someone?",
        a: "Visit our Partners & Community Referrals page and complete the referral form. You will need basic information about yourself, your organization, and the individual you are referring. The participant must consent to the referral. After submission, our team will review the referral and reach out to the individual.",
      },
      {
        q: "What organizations can make referrals?",
        a: "We accept referrals from probation and parole offices, community organizations, nonprofit agencies, workforce development agencies, churches and faith-based groups, reentry organizations, government agencies, and other service providers. Individuals can also self-refer through our intake form.",
      },
      {
        q: "How does employer partnership work?",
        a: "Employers interested in partnering can complete our Employer Interest Form. Our team will reach out to discuss your hiring needs, workforce requirements, and how our prepared candidates might be a good fit. We provide ongoing support after placement to ensure success for both the employer and the participant.",
      },
    ],
  },
  {
    category: "Transportation Support",
    items: [
      {
        q: "Does Headquarters of Hope Foundation provide transportation?",
        a: "Yes. We offer coordinated transportation support for participants who have documented transportation barriers. This includes rides to job interviews, first days of work, medical appointments, court and probation check-ins, DMV visits, benefits offices, housing appointments, and more. Submit a request through our Transportation page.",
      },
      {
        q: "Who qualifies for transportation support?",
        a: "Participants who are actively engaged in our programs and have a verified transportation barrier. Requests must be for an approved purpose (employment, healthcare, legal, housing, or program-related). Case managers can also submit requests on behalf of participants.",
      },
      {
        q: "How do I request a ride?",
        a: "Visit our Transportation page and complete the Transportation Request Form. Our team reviews all requests and coordinates rides, typically confirming within 1 business day. You can also have a case manager or referral partner submit on your behalf.",
      },
      {
        q: "Can I sponsor or donate to the transportation program?",
        a: "Yes. Transportation is one of our most impactful and most needed program areas. You can sponsor rides, donate fuel cards, or support the transportation fund through our Support page or by contacting us directly.",
      },
    ],
  },
  {
    category: "General Questions",
    items: [
      {
        q: "Is Headquarters of Hope Foundation a religious organization?",
        a: "No. While we partner with faith-based organizations as part of our community network, Headquarters of Hope Foundation is a secular nonprofit. Our services are available to all individuals regardless of religious belief or affiliation.",
      },
      {
        q: "How is my information protected?",
        a: "We take privacy and confidentiality seriously. Your personal information is used only to provide you with appropriate services and is not shared with outside parties without your consent, except as required by law. Our team follows strict confidentiality protocols.",
      },
      {
        q: "Can I volunteer or donate?",
        a: "Absolutely. Visit our Support page to learn about ways to get involved, including volunteering, donations, corporate sponsorship, and in-kind contributions. Every bit of support helps us serve more individuals and families.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Find answers to common questions about our programs, services, referral process, and how to get involved."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqs.map((section) => (
              <div key={section.category}>
                <h3 className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-4">{section.category}</h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {section.items.map((item, i) => (
                    <AccordionItem key={i} value={`${section.category}-${i}`} className="bg-card border border-border rounded-lg px-4">
                      <AccordionTrigger className="text-left font-heading text-base font-semibold text-primary hover:no-underline py-4">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Our team is here to help. Reach out and we will get back to you as soon as possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display text-sm tracking-wide uppercase gap-2">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/get-help">
              <Button size="lg" variant="outline" className="font-display text-sm tracking-wide uppercase">
                Get Help
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}