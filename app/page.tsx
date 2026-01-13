import HeroEnterprise from "@/components/enterprise/HeroEnterprise";
import BuyerSelector from "@/components/enterprise/BuyerSelector";
import HowItWorksPipeline from "@/components/enterprise/HowItWorksPipeline";
import AgentsModules from "@/components/enterprise/AgentsModules";
import PlatformPrimitives from "@/components/enterprise/PlatformPrimitives";
import ProofTrust from "@/components/enterprise/ProofTrust";
import FinalCTA from "@/components/enterprise/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroEnterprise />
      <BuyerSelector />
      <HowItWorksPipeline />
      <AgentsModules />
      <PlatformPrimitives />
      <ProofTrust />
      <FinalCTA />
    </>
  );
}
