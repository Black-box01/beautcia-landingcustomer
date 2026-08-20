import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import TrackingProvider from "@/components/TrackingProvider";
import EmailPopup from "@/components/EmailPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beautcia - Book Beauty Services Instantly | Hair, Makeup, Nails & More",
  description: "Discover and book top-rated beauty professionals near you. Hair stylists, makeup artists, nail techs, and more. Book instantly, pay securely, look your best. Download the Beautcia app today.",
  keywords: "beauty services, book beauty, hair stylist, makeup artist, nail technician, beauty app, booking app, beauty professionals, Lagos, Nigeria",
  authors: [{ name: "Beautcia" }],
  openGraph: {
    title: "Beautcia - Book Beauty Services Instantly",
    description: "Discover and book top-rated beauty professionals near you. Book instantly, pay securely, look your best.",
    url: "https://www.beautcia.com",
    siteName: "Beautcia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beautcia - Book Beauty Services Instantly",
    description: "Discover and book top-rated beauty professionals near you.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: '100%', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
      <head>
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.facebook.com" />
        <link rel="dns-prefetch" href="//www.tiktok.com" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Noscript fallback */}
        <noscript>
          <style>{`
            .no-js-show { display: block !important; }
          `}</style>
        </noscript>
      </head>
      <body style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <TrackingProvider>{children}</TrackingProvider>
        <EmailPopup />
        
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2145501376280698');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="lazyOnload">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableEvent","enablePageView","enableSuppression"],ttq.push(["page"]);
              var s=d.createElement("script");s.type="text/javascript";s.async=!0;s.src="https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=D7P0013C77U3CRQJQV6G&content_id=D7P0013C77U3CRQJQV6G";
              var f=d.getElementsByTagName("script")[0];f.parentNode.insertBefore(s,f);
            }(window, document, 'ttq');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wd0rfeykma");
          `}
        </Script>

        {/* Google Analytics */}
        <Script id="ga" strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" />
        <Script id="ga-config" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
