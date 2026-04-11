import SectionHeading from "../shared/SectionHeading";

const stats = [
  { value: "500+", label: "Individuals Served" },
  { value: "85%", label: "Job Placement Rate" },
  { value: "200+", label: "Employer Partners" },
  { value: "95%", label: "Housing Stability" },
];

export default function ImpactSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Impact"
          title="Building Stability, One Life at a Time"
          description="Our results reflect the power of structured support, community partnership, and individual commitment to change."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}