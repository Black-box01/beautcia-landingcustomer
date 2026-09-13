import { apiGet, apiGetClient } from "./api";
import { SITE_ID } from "./api";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------
export interface Testimonial {
  id: string | number;
  name: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface FAQ {
  id?: number;
  question: string;
  answer: string;
}

export interface ContentItem {
  id: string;
  section: string;
  order: number;
  data: Record<string, any>;
  isActive: boolean;
}

export interface SiteContentGrouped {
  settings: Record<string, any[]>;
  contentItems: Record<string, ContentItem[]>;
}

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------
export interface BlogPost {
  id: string;
  slug: string;
  image: string;
  date: string;
  title: string;
  summary: string;
  author: string;
  content: string[];
}

export interface ApiBlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string | null;
  author: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
}

function mapBlogPost(post: ApiBlogPost): BlogPost {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  // Content may be stored as a JSON-stringified array or plain text
  let paragraphs: string[];
  try {
    const parsed = JSON.parse(post.content);
    paragraphs = Array.isArray(parsed) ? parsed : [post.content];
  } catch {
    paragraphs = (post.content || "").split("\n\n").filter(Boolean);
  }

  return {
    id: post.id,
    slug: post.slug,
    image: post.image || "/logo.png",
    date,
    title: post.title,
    summary: post.summary,
    author: post.author || "Beautcia",
    content: paragraphs,
  };
}

/** Fetch published blog posts for this site (server component – uses ISR cache). */
export async function fetchBlogPosts(limit?: number): Promise<BlogPost[]> {
  const posts = await apiGet<ApiBlogPost[]>("/blog", {
    siteId: SITE_ID,
    status: "published",
  });
  if (!posts || posts.length === 0) return [];
  const mapped = posts.map(mapBlogPost);
  return limit ? mapped.slice(0, limit) : mapped;
}

/** Fetch a single blog post by slug (server component). */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await apiGet<ApiBlogPost>(`/blog/by-slug/${slug}`);
  if (!post) return null;
  return mapBlogPost(post);
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
export async function fetchTestimonialsClient(): Promise<Testimonial[]> {
  const data = await apiGetClient<any[]>("/testimonials", {
    siteId: SITE_ID,
    active: "true",
  });
  if (!data || data.length === 0) return [];
  return data.map((t) => ({
    id: t.id || t.name?.charAt(0) || '',
    name: t.name,
    avatar: t.avatar || t.name?.charAt(0) || '',
    rating: t.rating ?? 5,
    quote: t.quote,
  }));
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------
export async function fetchFAQsClient(): Promise<FAQ[]> {
  const data = await apiGetClient<any[]>("/faqs", { siteId: SITE_ID });
  if (!data || data.length === 0) return [];
  return data.map((f) => ({
    id: f.id || f.question?.slice(0, 10) || '',
    question: f.question,
    answer: f.answer,
  }));
}

// ---------------------------------------------------------------------------
// Site Content
// ---------------------------------------------------------------------------
export async function fetchSiteContentClient(): Promise<SiteContentGrouped> {
  const data = await apiGetClient<SiteContentGrouped>("/site-content", {
    siteId: SITE_ID,
  });
  return data ?? { settings: {}, contentItems: {} };
}

// ---------------------------------------------------------------------------
// Helper: get a setting value by group + key
// ---------------------------------------------------------------------------
export function getSettingValue(settings: Record<string, any[]>, group: string, key: string): string {
  const groupSettings = settings[group] || [];
  const setting = groupSettings.find((s: any) => s.key === key);
  return setting?.value || '';
}

// ---------------------------------------------------------------------------
// Helper: map ContentItems to step objects
// ---------------------------------------------------------------------------
export function mapContentItemsToSteps(
  items: ContentItem[] | undefined
): { step: number; title: string; description: string }[] {
  if (!items || items.length === 0) return [];
  return items
    .filter((i) => i.isActive)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      step: item.data.step ?? 1,
      title: item.data.title ?? '',
      description: item.data.description ?? '',
    }));
}

// ---------------------------------------------------------------------------
// Helper: map ContentItems to feature objects
// ---------------------------------------------------------------------------
export function mapContentItems(
  items: ContentItem[] | undefined
): { id: number; title: string; description: string; icon: string }[] {
  if (!items || items.length === 0) return [];
  return items
    .filter((i) => i.isActive)
    .sort((a, b) => a.order - b.order)
    .map((item, i) => ({
      id: i + 1,
      title: item.data.title ?? '',
      description: item.data.description ?? '',
      icon: item.data.icon ?? '',
    }));
}
