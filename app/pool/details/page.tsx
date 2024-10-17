

import DetailsContent from "@/components/pool/details/detailscontent";
import CryptoHeader from "@/components/pool/details/top";
import SecondNavBar from "@/components/swap/SecondNav";


export default function Pool() {
  return (
    <div className="div">
      <SecondNavBar />
      <CryptoHeader />
<DetailsContent />
    </div>
  );
}
