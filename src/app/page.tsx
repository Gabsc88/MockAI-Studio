
import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';
import HeroSection from '@/app/_components/hero-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
