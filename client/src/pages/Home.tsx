import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsOverview from "../components/StatsOverview";
import ProposalList from "../components/ProposalList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsOverview />
        <ProposalList />
      </main>
    </div>
  );
}
