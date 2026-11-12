import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePostHog } from "@posthog/react";

/**
 * Emits a single $pageview per route change, guarded against React StrictMode double-firing.
 */
export const PostHogPageTracker = () => {
  const location = useLocation();
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog || !import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN) return;

    let cancelled = false;

    // Defer capture to a microtask so React StrictMode's synchronous unmount cleanup
    // cancels the initial simulated mount before posthog.capture("$pageview") runs.
    queueMicrotask(() => {
      if (!cancelled) {
        posthog.capture("$pageview");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.search, location.hash, posthog]);

  return null;
};
