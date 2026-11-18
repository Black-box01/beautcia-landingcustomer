import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import TrackingProvider from "@/components/TrackingProvider";
import EmailPopup from "@/components/EmailPopup";

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "2129777677774407";

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
  metadataBase: new URL("https://www.beautcia.com"),
  title: "Beautcia - Book Beauty Services Instantly | Hair, Makeup, Nails & More",
  description: "Discover and book top-rated beauty professionals near you. Hair stylists, makeup artists, nail techs, and more. Book instantly, pay securely, look your best. Download the Beautcia app today.",
  keywords: [
    "beauty services",
    "book beauty",
    "hair stylist",
    "makeup artist",
    "nail technician",
    "beauty app",
    "booking app",
    "beauty professionals",
    "Lagos",
    "Nigeria",
  ],
  authors: [{ name: "Beautcia" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Beautcia - Book Beauty Services Instantly",
    description: "Discover and book top-rated beauty professionals near you. Book instantly, pay securely, look your best.",
    url: "https://www.beautcia.com",
    siteName: "Beautcia",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beautcia - Book Beauty Services Instantly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beautcia - Book Beauty Services Instantly",
    description: "Discover and book top-rated beauty professionals near you.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
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
        
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="SzVu89HQSBH9TKRzvZjLKdeMkSZYw5TOirPoELar0GA" />

        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Noscript fallback */}
        <noscript>
          <style>{`
            .no-js-show { display: block !important; }
          `}</style>
        </noscript>
      
        {/* Google Analytics (gtag) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <TrackingProvider>{children}</TrackingProvider>
        <EmailPopup />
        
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="lazyOnload">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('D9GV1J3C77UEIPGIRP30');ttq.page();
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
            })(window, document, "clarity", "script", "w7znamdru4");
          `}
        </Script>
      </body>
    </html>
  );
}
