export default function PageHero({ eyebrow, title, description, image }) {
  return (
    <section className="relative bg-primary overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {eyebrow && (
          <span className="font-display text-xs font-bold tracking-widest uppercase text-secondary mb-4 block">
            {eyebrow}
          </span>
        )}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}