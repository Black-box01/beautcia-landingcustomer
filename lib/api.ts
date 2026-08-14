const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006";
const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || "customer_landing";

export async function apiGet<T>(path: string, params?: Record<string, string>): Promise<T | null> {
  try {
    const url = new URL(path, API_URL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          url.searchParams.set(key, value);
        }
      });
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function apiGetClient<T>(
  path: string,
  params?: Record<string, string>
): Promise<T | null> {
  try {
    const url = new URL(path, API_URL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          url.searchParams.set(key, value);
        }
      });
    }

    const res = await fetch(url.toString());
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export { API_URL, SITE_ID };
