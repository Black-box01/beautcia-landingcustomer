import { MetadataRoute } from "next";
import { SEO } from "@/lib/seo/config";
import { fetchBlogPosts } from "@/lib/cms";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO.baseUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchBlogPosts();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // If CMS is unreachable, skip dynamic routes
  }

  return [...staticRoutes, ...blogRoutes];
}
