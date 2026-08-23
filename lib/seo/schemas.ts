import { SEO } from "./config";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO.siteName,
    url: SEO.baseUrl,
    logo: `${SEO.baseUrl}${SEO.logo}`,
    description: "The Digital Infrastructure for Beauty Services — discover, book, and experience premium beauty services.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SEO.contact.phone,
      contactType: "customer service",
      email: SEO.contact.supportEmail,
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: SEO.address.addressLocality,
      addressRegion: SEO.address.addressRegion,
      addressCountry: SEO.address.addressCountry,
    },
    sameAs: [
      SEO.social.facebook,
      SEO.social.instagram,
      SEO.social.x,
      SEO.social.tiktok,
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO.siteName,
    url: SEO.baseUrl,
    description: "Discover and book top-rated beauty professionals near you. Book instantly, pay securely, look your best.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SEO.baseUrl}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SEO.siteName,
    url: SEO.baseUrl,
    logo: `${SEO.baseUrl}${SEO.logo}`,
    description: "Beauty services booking and payment platform for customers in Nigeria.",
    telephone: SEO.contact.phone,
    email: SEO.contact.supportEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: SEO.address.addressLocality,
      addressRegion: SEO.address.addressRegion,
      addressCountry: SEO.address.addressCountry,
    },
    priceRange: "₦₦",
    sameAs: [
      SEO.social.facebook,
      SEO.social.instagram,
      SEO.social.x,
      SEO.social.tiktok,
    ],
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function howToSchema(steps: { title: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Book Beauty Services on Beautcia",
    description: "Book beauty services in 3 easy steps with Beautcia.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Beautcia — Book Beauty Services Instantly",
    description: "Discover and book top-rated beauty professionals near you. Hair stylists, makeup artists, nail techs, and more. Book instantly, pay securely, look your best.",
    provider: {
      "@type": "Organization",
      name: SEO.siteName,
      url: SEO.baseUrl,
    },
    serviceType: "Beauty Booking Platform",
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Beauty Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hair Styling" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Makeup Artistry" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nail Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Skincare" } },
      ],
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SEO.baseUrl}${item.url}`,
    })),
  };
}

export function softwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SEO.siteName,
    operatingSystem: "Android, iOS",
    applicationCategory: "LifestyleApplication",
    description: "Discover, book, and pay for premium beauty services. Connect with top-rated professionals for hair, makeup, nails, skincare, and more.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NGN",
    },
    downloadUrl: SEO.appLinks.googlePlay,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1000",
    },
  };
}
