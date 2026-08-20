import { apiGetClient } from "./api";
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
