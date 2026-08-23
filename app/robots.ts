import { MetadataRoute } from "next";
import { SEO } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SEO.baseUrl}/sitemap.xml`,
    host: SEO.baseUrl,
  };
}
