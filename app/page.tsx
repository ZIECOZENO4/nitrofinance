import CardContent from "@/components/homepage/cardcontent";
import HomeHero from "@/components/homepage/hero";
import HomeNavBar from "@/components/homepage/navbar";

export default function Home() {
  return (
    <div className="div">
      <HomeNavBar />
      <HomeHero />
<CardContent />
    </div>
  );
}
