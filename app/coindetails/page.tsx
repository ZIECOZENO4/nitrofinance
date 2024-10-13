import ExactPoolDistributionGraph from "@/components/coindetails/graph";
import CoinDetailsComponent from "@/components/coindetails/maincontent";
import HomeNavBar from "@/components/homepage/navbar";


export default function CoinDetails() {
  return (
    <div className="div">
      <HomeNavBar />
      <ExactPoolDistributionGraph />
      <CoinDetailsComponent />
    </div>
  );
}
