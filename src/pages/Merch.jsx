import { ExternalLink, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '../components/shared/PageHero';
import SectionHeading from '../components/shared/SectionHeading';

const hashtags = ['#HopeFestAustin2026','#FreedomRising','#HeadquartersOfHope','#OperationAdvanceParty','#PathwaysHubOS','#HopeBuilders','#HOHFoundation','#AustinJuly4'];

const merchItems = [
  { name: 'Hope Fest Austin 2026 Tee', desc: 'Navy blue with gold Freedom Rising design. All proceeds support HOH Foundation.', icon: '👕', tag: 'Best Seller' },
  { name: 'Freedom Rising Hoodie', desc: 'Stay warm and show your support. HOH shield logo on chest.', icon: '🧥', tag: 'Popular' },
  { name: 'HOH Shield Hat', desc: 'Structured cap with embroidered HOH shield logo in navy and gold.', icon: '🧢', tag: 'New' },
  { name: 'Volunteer Shirt', desc: 'Official Hope Fest volunteer shirt. Identify your team with pride.', icon: '🦺', tag: 'Event Staff' },
];

export default function Merch() {
  return (
    <>
      <PageHero
        eyebrow="Official Merch"
        title="Wear the Mission"
        description="Every item sold supports Headquarters of Hope Foundation directly. Zero cost to HOH — 100% print-on-demand through Bonfire."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 lg:p-12 mb-16 text-center">
            <div className="text-4xl mb-4">🔥</div>
            <h2 className="font-heading font-black text-3xl text-white mb-3">Hope Fest Austin 2026 Collection</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">Our official merch campaign is live. Every purchase directly funds our mission — housing veterans, returning citizens, and turned-out foster youth in Austin, TX.</p>
            <a href="https://www.bonfire.com" target="_blank" rel="noreferrer">
              <Button className="bg-secondary hover:bg-secondary/90 text-primary font-display text-sm uppercase tracking-wide gap-2 px-8 py-3">
                <ShoppingBag className="w-4 h-4" /> Shop the Campaign
              </Button>
            </a>
            <p className="text-white/40 text-xs mt-4">Opens in Bonfire — our zero-cost print-on-demand partner</p>
          </div>

          <SectionHeading eyebrow="Collection" title="Available Items" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {merchItems.map(item => (
              <div key={item.name} className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-primary/5 p-8 text-center text-5xl">{item.icon}</div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-display font-bold uppercase tracking-wide text-secondary bg-secondary/10 px-2 py-0.5 rounded">{item.tag}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-primary mb-2">{item.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <SectionHeading eyebrow="Spread the Word" title="Official Hashtags" desc="Use these on every post. Help us trend on July 4th." />
            <div className="flex flex-wrap gap-3 mt-6">
              {hashtags.map(h => (
                <div key={h} className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-full">
                  <span className="font-mono text-sm text-secondary font-bold">{h}</span>
                  <button onClick={() => navigator.clipboard.writeText(h)} className="text-white/40 hover:text-white transition-colors">
                    <Share2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">Click the share icon to copy any hashtag.</p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-off-white border border-border rounded-xl p-6 text-center">
              <Heart className="w-8 h-8 text-secondary mx-auto mb-3" fill="currentColor" />
              <h3 className="font-heading font-bold text-lg text-primary mb-2">100% Goes to HOH</h3>
              <p className="text-sm text-muted-foreground">Every dollar of profit from merch sales goes directly to HOH Foundation programs.</p>
            </div>
            <div className="bg-off-white border border-border rounded-xl p-6 text-center">
              <ShoppingBag className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-primary mb-2">Zero Upfront Cost</h3>
              <p className="text-sm text-muted-foreground">Print-on-demand through Bonfire. HOH pays nothing. Items print only when purchased.</p>
            </div>
            <div className="bg-off-white border border-border rounded-xl p-6 text-center">
              <ExternalLink className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-primary mb-2">Ships Everywhere</h3>
              <p className="text-sm text-muted-foreground">Bonfire ships directly to buyers. No warehouse, no inventory, no HOH overhead.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
