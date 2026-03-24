import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePostHog } from "@posthog/react";

export const PostHogPageTracker = () => {
  const location = useLocation();
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog) {
      posthog.capture("$pageview");
    }
  }, [location, posthog]);

  return null;
};
