/**
 * Lightweight visitor tracking module.
 * - Generates a unique sessionId per browser session
 * - Tracks page views, clicks (via event delegation), and heartbeats
 * - Captures leads (email/contact) for marketing follow-up
 * - No external dependencies, <3KB minified
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006';
const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'main_website';

let sessionId: string;
let visitorId: string | null = null;
let initialized = false;
let heartbeatInterval: ReturnType<typeof setInterval> | null = null;

function getSessionId(): string {
  if (!sessionId) {
    sessionId = sessionStorage.getItem('bv_sid') || crypto.randomUUID();
    sessionStorage.setItem('bv_sid', sessionId);
  }
  return sessionId;
}

function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
  };
}

function detectDevice(): { deviceType: string; browser: string; os: string } {
  if (typeof navigator === 'undefined') {
    return { deviceType: 'desktop', browser: 'unknown', os: 'unknown' };
  }
  const ua = navigator.userAgent;
  let deviceType = 'desktop';
  if (/Mobi|Android|iPhone/i.test(ua)) deviceType = 'mobile';
  else if (/iPad|Tablet/i.test(ua)) deviceType = 'tablet';

  let browser = 'unknown';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'chrome';
  else if (ua.includes('Firefox')) browser = 'firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'safari';
  else if (ua.includes('Edg')) browser = 'edge';

  let os = 'unknown';
  if (ua.includes('Windows')) os = 'windows';
  else if (ua.includes('Mac')) os = 'macos';
  else if (ua.includes('Linux')) os = 'linux';
  else if (ua.includes('Android')) os = 'android';
  else if (ua.includes('iOS') || ua.includes('iPhone')) os = 'ios';

  return { deviceType, browser, os };
}

async function apiPost(endpoint: string, body: Record<string, any>): Promise<void> {
  try {
    const url = `${API_URL}/visitor-analytics/${endpoint}`;
    if (navigator.sendBeacon) {
      // Use sendBeacon for reliability during page unload
      const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
    } else {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
      });
    }
  } catch {
    // Silently fail — tracking should never break the app
  }
}

export function initTracking(): void {
  if (initialized) return;
  initialized = true;

  const sid = getSessionId();
  const utm = getUTMParams();
  const device = detectDevice();

  // Track initial page visit
  apiPost('visit', {
    siteId: SITE_ID,
    sessionId: sid,
    referrer: document.referrer || null,
    landingPage: window.location.pathname,
    userAgent: navigator.userAgent,
    ...utm,
    ...device,
  });

  // Track initial page view event
  apiPost('event', {
    siteId: SITE_ID,
    sessionId: sid,
    eventType: 'page_view',
    pagePath: window.location.pathname,
    pageTitle: document.title,
  });

  // Click tracking via event delegation
  document.addEventListener('click', handleClick);

  // Heartbeat every 30 seconds
  heartbeatInterval = setInterval(() => {
    apiPost('visit', {
      siteId: SITE_ID,
      sessionId: sid,
      userAgent: navigator.userAgent,
      ...device,
    });
  }, 30000);

  // Track page visibility changes (tab switch / minimize)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      apiPost('visit', {
        siteId: SITE_ID,
        sessionId: sid,
        ...device,
      });
    }
  });

  // Track before unload
  window.addEventListener('beforeunload', () => {
    apiPost('event', {
      siteId: SITE_ID,
      sessionId: sid,
      eventType: 'page_exit',
      pagePath: window.location.pathname,
    });
  });
}

function handleClick(e: MouseEvent): void {
  const target = e.target as HTMLElement;
  if (!target) return;

  // Find the closest element with a data-track attribute or a meaningful element
  const trackEl = target.closest('[data-track]') || target.closest('a, button');
  if (!trackEl) return;

  const trackId = trackEl.getAttribute('data-track');
  const text = (trackEl.textContent || '').trim().slice(0, 100);
  const tagName = trackEl.tagName.toLowerCase();
  const href = trackEl.getAttribute('href') || '';
  const selector = buildSelector(trackEl);

  apiPost('event', {
    siteId: SITE_ID,
    sessionId: getSessionId(),
    eventType: 'click',
    pagePath: window.location.pathname,
    pageTitle: document.title,
    elementId: trackId || trackEl.id || null,
    elementText: text,
    elementSelector: selector,
    metadata: { tagName, href },
  });
}

function buildSelector(el: Element): string {
  const parts: string[] = [];
  let current: Element | null = el;
  let depth = 0;
  while (current && depth < 3) {
    let part = current.tagName.toLowerCase();
    if (current.id) {
      part += `#${current.id}`;
      parts.unshift(part);
      break;
    }
    if (current.className && typeof current.className === 'string') {
      const cls = current.className.trim().split(/\s+/).slice(0, 2).join('.');
      if (cls) part += `.${cls}`;
    }
    parts.unshift(part);
    current = current.parentElement;
    depth++;
  }
  return parts.join(' > ');
}

/** Track a route change (for Next.js App Router / SPA navigation) */
export function trackPageView(path?: string, title?: string): void {
  if (!initialized) return;
  apiPost('event', {
    siteId: SITE_ID,
    sessionId: getSessionId(),
    eventType: 'page_view',
    pagePath: path || window.location.pathname,
    pageTitle: title || document.title,
  });
  // Also heartbeat on navigation
  apiPost('visit', {
    siteId: SITE_ID,
    sessionId: getSessionId(),
    ...detectDevice(),
  });
}

/** Capture a lead's email/contact for marketing follow-up */
export function captureLead(email: string, contact?: string): void {
  apiPost('lead', {
    siteId: SITE_ID,
    sessionId: getSessionId(),
    email,
    contact: contact || undefined,
  });
}

/** Clean up tracking (for testing / HMR) */
export function destroyTracking(): void {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
  document.removeEventListener('click', handleClick);
  initialized = false;
}
