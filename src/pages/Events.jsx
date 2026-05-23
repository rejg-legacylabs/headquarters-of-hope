import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, ArrowRight, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '../components/shared/PageHero';
import SectionHeading from '../components/shared/SectionHeading';

const events = [
  {
    id: 1,
    name: 'Hope Fest Austin 2026: Freedom Rising',
    date: 'July 4, 2026',
    time: '4:00 PM – 8:30 PM',
    location: 'Austin, TX (Venue TBA)',
    capacity: '300–400 Guests',
    status: 'upcoming',
    featured: true,
    tags: ['Free', 'Family-Friendly', 'Fundraiser', 'Veterans', 'Returning Citizens'],
    description: 'Our inaugural community festival and fundraiser. Free food, live entertainment, resource tables, family activities, and the official launch of Operation Advance Party. Free and open to the community — no ticket required.',
    hashtags: ['#HopeFestAustin2026', '#FreedomRising', '#OperationAdvanceParty'],
    donateUrl: 'https://zeffy.com/en-US/donation-form/e40e77a3-3a6b-4df9-b46d-f5d68d387818',
    volunteerUrl: '/volunteer',
    highlights: [
      'Freedom Rising Stage — DJ, live performance, mission moments',
      'Free Community Cookout — hot food for all attendees',
      'Resource Village — veterans, housing, employment, legal aid',
      'Family Zone — games, face painting, activities for all ages',
      'Operation Advance Party official launch moment',
    ],
  },
];

const pastEvents = [
  // Future past events will populate here
];

const SponsorLevels = () => (
  <div className="mt-16">
    <SectionHeading eyebrow="Sponsor Hope Fest" title="Support the Event" desc="Sponsorship opportunities are available at every level. Your investment makes this event free for our community." />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {[
        { level: 'Founding Presenting', amount: '$10,000', perks: 'Main banner · Stage mentions · Booth · Press release' },
        { level: 'Freedom Stage', amount: '$5,000', perks: 'Stage signage · MC shoutouts · Booth · Social feature' },
        { level: 'Community Meal', amount: '$3,500', perks: '"Meal provided by" signage · Stage recognition' },
        { level: 'Hope Partner', amount: '$1,000', perks: 'Booth · Logo on flyer · Stage mention' },
      ].map(s => (
        <div key={s.level} className="bg-white border border-border rounded-xl p-5 border-t-2 border-t-secondary">
          <div className="text-2xl font-heading font-black text-secondary mb-1">{s.amount}</div>
          <div className="text-xs font-display font-bold uppercase tracking-wide text-primary mb-2">{s.level}</div>
          <div className="text-xs text-muted-foreground leading-relaxed">{s.perks}</div>
        </div>
      ))}
    </div>
    <div className="mt-6 text-center">
      <p className="text-sm text-muted-foreground mb-4">Custom sponsorship packages and in-kind donations welcome.</p>
      <a href="mailto:info@headquartersofhope.org?subject=Hope Fest Austin 2026 Sponsorship">
        <Button className="bg-primary hover:bg-primary/90 text-white font-display text-xs uppercase tracking-wide gap-2">
          Inquire About Sponsorship <ArrowRight className="w-3 h-3" />
        </Button>
      </a>
    </div>
  </div>
);

export default function Events() {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');

  const handleRsvp = (e) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Community Events"
        title="Events & Gatherings"
        description="HOH Foundation brings the community together through events that celebrate freedom, build connections, and raise support for our mission."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Featured Event" title="Hope Fest Austin 2026" />

          {events.map(event => (
            <div key={event.id} className="mt-10 bg-primary rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="p-8 lg:p-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map(t => (
                    <span key={t} className="text-xs font-display font-bold tracking-wide uppercase bg-secondary/20 text-secondary px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                <h2 className="font-heading font-black text-3xl lg:text-4xl text-white mb-2">{event.name}</h2>
                <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-8">{event.description}</p>

                {/* Meta */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: Calendar, label: 'Date', val: event.date },
                    { icon: Clock, label: 'Time', val: event.time },
                    { icon: MapPin, label: 'Location', val: event.location },
                    { icon: Users, label: 'Capacity', val: event.capacity },
                  ].map(m => (
                    <div key={m.label} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <m.icon className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-xs font-display font-bold uppercase tracking-wide text-secondary">{m.label}</span>
                      </div>
                      <div className="text-sm font-semibold text-white">{m.val}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="grid md:grid-cols-2 gap-3 mb-8">
                  {event.highlights.map(h => (
                    <div key={h} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-secondary text-xs">✓</span>
                      </div>
                      <span className="text-sm text-white/75 leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {event.hashtags.map(h => (
                    <span key={h} className="text-xs font-mono text-secondary/70 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">{h}</span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a href={event.donateUrl} target="_blank" rel="noreferrer">
                    <Button className="bg-secondary hover:bg-secondary/90 text-primary font-display text-xs uppercase tracking-wide gap-2">
                      <Heart className="w-3 h-3" fill="currentColor" /> Donate to Support This Event
                    </Button>
                  </a>
                  <a href={event.volunteerUrl}>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-display text-xs uppercase tracking-wide gap-2">
                      Volunteer <ArrowRight className="w-3 h-3" />
                    </Button>
                  </a>
                  <a href={`mailto:info@headquartersofhope.org?subject=Hope Fest Austin 2026 Sponsorship`}>
                    <Button variant="outline" className="border-secondary/40 text-secondary hover:bg-secondary/10 font-display text-xs uppercase tracking-wide gap-2">
                      Sponsor This Event <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* RSVP */}
              <div className="bg-black/20 p-8 lg:px-12">
                <h3 className="font-heading font-bold text-white text-xl mb-2">Get Event Updates</h3>
                <p className="text-white/60 text-sm mb-5">Be the first to know when venue is announced and doors open.</p>
                {rsvpSubmitted ? (
                  <div className="bg-secondary/20 border border-secondary/30 rounded-xl p-4">
                    <p className="text-secondary font-semibold text-sm">✓ You're on the list! We'll send updates to {rsvpEmail}. Follow <span className="font-mono">#HopeFestAustin2026</span> for live updates.</p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvp} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                    <input required placeholder="Your name" value={rsvpName} onChange={e => setRsvpName(e.target.value)} className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary" />
                    <input type="email" required placeholder="Your email" value={rsvpEmail} onChange={e => setRsvpEmail(e.target.value)} className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary" />
                    <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-primary font-display text-xs uppercase tracking-wide shrink-0">Notify Me</Button>
                  </form>
                )}
              </div>
            </div>
          ))}

          <SponsorLevels />
        </div>
      </section>
    </>
  );
}
