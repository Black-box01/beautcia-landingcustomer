import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
} from '@/components';

export default function Home() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
