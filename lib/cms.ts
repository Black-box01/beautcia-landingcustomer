import { apiGetClient } from "./api";
import { SITE_ID } from "./api";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------
export interface Testimonial {
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
// Testimonials
// ---------------------------------------------------------------------------
export async function fetchTestimonialsClient(): Promise<Testimonial[]> {
  const data = await apiGetClient<any[]>("/testimonials", {
    siteId: SITE_ID,
    active: "true",
  });
  if (!data || data.length === 0) return [];
  return data.map((t) => ({
    name: t.name,
    avatar: t.avatar || t.name?.charAt(0) || "",
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
  return data.map((f, i) => ({
    id: parseInt(f.id, 10) || i + 1,
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
      title: item.data.title ?? "",
      description: item.data.description ?? "",
    }));
}
