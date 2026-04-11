export default function SectionHeading({ eyebrow, title, description, align = "center", light = false }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-12 lg:mb-16`}>
      {eyebrow && (
        <span className={`font-display text-xs font-bold tracking-widest uppercase ${light ? "text-secondary" : "text-secondary"} mb-3 block`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold ${light ? "text-white" : "text-primary"} mb-4 leading-tight`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base lg:text-lg leading-relaxed ${light ? "text-white/80" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </div>
  );
}