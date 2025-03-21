import Navbar from '@/components/general/Navbar';
import CTASection from '@/components/Landing/CTASection';
import FeaturesSection from '@/components/Landing/FeaturesSection';
import Footer from '@/components/Landing/Footer';
import HeroSection from '@/components/Landing/HeroSection';
import TestimonialsSection from '@/components/Landing/TestimonialSection';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
