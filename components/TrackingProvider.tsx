'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initTracking, trackPageView, destroyTracking } from '@/lib/tracking';

export default function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initTracking();
    return () => destroyTracking();
  }, []);

  useEffect(() => {
    // Track route changes
    trackPageView(pathname, document.title);
  }, [pathname]);

  return <>{children}</>;
}
