import HeroSection from "../components/home/HeroSection";
import EntryPortals from "../components/home/EntryPortals";
import WhatWeDo from "../components/home/WhatWeDo";
import PathwayPreview from "../components/home/PathwayPreview";
import ImpactSection from "../components/home/ImpactSection";
import HomeCTA from "../components/home/HomeCTA";

const HERO_IMAGE = "https://media.base44.com/images/public/69da8f993c6895f2b079653b/8f20fa388_generated_60289809.png";
const KEYS_IMAGE = "https://media.base44.com/images/public/69da8f993c6895f2b079653b/3151e9d9c_generated_28ba2622.png";

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