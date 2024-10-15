import PoolHero from "@/components/pool/poolhero";
import PoolTable from "@/components/pool/table";
import SecondNavBar from "@/components/swap/SecondNav";


export default function Pool() {
  return (
    <div className="div">
      <SecondNavBar />
   <PoolHero />
   <PoolTable />
    </div>
  );
}
