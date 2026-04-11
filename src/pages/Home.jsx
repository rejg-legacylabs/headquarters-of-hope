import HeroSection from "../components/home/HeroSection";
import EntryPortals from "../components/home/EntryPortals";
import WhatWeDo from "../components/home/WhatWeDo";
import PathwayPreview from "../components/home/PathwayPreview";
import ImpactSection from "../components/home/ImpactSection";
import HomeCTA from "../components/home/HomeCTA";

const HERO_IMAGE = "/__generating__/img_f6e613308778.png";
const KEYS_IMAGE = "/__generating__/img_aefe1714e365.png";

export default function Home() {
  return (
    <>
      <HeroSection heroImage={HERO_IMAGE} />
      <EntryPortals />
      <WhatWeDo />
      <PathwayPreview />
      <ImpactSection />
      <HomeCTA keysImage={KEYS_IMAGE} />
    </>
  );
}