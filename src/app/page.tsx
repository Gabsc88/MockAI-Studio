import Header from '@/app/_components/header';
import HeroSection from '@/app/_components/hero-section';
import HowItWorks from '@/app/_components/how-it-works';
import UseCases from '@/app/_components/use-cases';
import PromptSuggestions from '@/app/_components/prompt-suggestions';
import MockupShowcase from '@/app/_components/mockup-showcase';
import Technology from '@/app/_components/technology';
import ForTeams from '@/app/_components/for-teams';
import Testimonials from '@/app/_components/testimonials';
import Pricing from '@/app/_components/pricing';
import FinalCta from '@/app/_components/final-cta';
import Footer from '@/app/_components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <UseCases />
        <PromptSuggestions />
        <MockupShowcase />
        <Technology />
        <ForTeams />
        <Testimonials />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
