import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
} from '@/components';
import { JsonLd } from '@/lib/seo/JsonLd';
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  faqPageSchema,
  howToSchema,
  serviceSchema,
  softwareAppSchema,
} from '@/lib/seo/schemas';

const CUSTOMER_FAQS = [
  { question: 'How do I book a beauty service on Beautcia?', answer: 'Simply download the Beautcia app, create an account, browse beauty professionals in your area, choose your service and preferred time, and book instantly. You can filter by service type, location, rating, and price to find your perfect match.' },
  { question: 'Is it safe to pay through the app?', answer: 'Absolutely! Beautcia uses secure payment processing. Your money is held safely until your service is completed. This protects both you and the professional. No cash needed, no awkward transactions.' },
  { question: 'What if I need to cancel or reschedule my appointment?', answer: 'You can easily cancel or reschedule through the app. We recommend giving at least 24 hours notice. Cancellation policies may vary by professional, but we always aim to be fair to both customers and professionals.' },
  { question: 'How do I know the professionals are verified?', answer: 'All beauty professionals on Beautcia go through a verification process. They must provide valid identification, proof of qualifications, and portfolio photos. We only accept verified professionals onto the platform.' },
  { question: 'Can I see reviews before booking?', answer: 'Yes! All reviews are from verified customers who have actually booked and received services. You can read detailed reviews, see ratings, and make informed decisions based on real experiences.' },
  { question: 'What services can I book on Beautcia?', answer: 'Beautcia offers a wide range of beauty services including hair styling, makeup artistry, nail services, skincare treatments, massages, waxing, threading, and more. We are constantly adding new services and professionals.' },
];

const HOW_TO_STEPS = [
  { title: 'Download and Sign Up', description: 'Get the Beautcia app from Google Play or App Store. Create your account in seconds with your email or social login. It is free and takes less than a minute.' },
  { title: 'Discover and Book', description: 'Browse beauty professionals near you. Filter by service, rating, price, and availability. See real reviews and photos. Pick your perfect match and book instantly.' },
  { title: 'Pay Securely and Enjoy', description: 'Pay safely through the app. Your money is protected until your service is done. Show up, look amazing, and rate your experience. It is that simple.' },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          localBusinessSchema(),
          faqPageSchema(CUSTOMER_FAQS),
          howToSchema(HOW_TO_STEPS),
          serviceSchema(),
          softwareAppSchema(),
        ]}
      />
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
