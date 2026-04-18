import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import SpaceBackground from "./components/BG";
import ProjectDetails from "./pages/ProjectDetails";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import ProjectsPage from "./pages/ProjectsPage";
import ZakiChat from "./components/ZakiChat.js";
import useMode from "./hooks/useMode.js";

import { PostHogPageTracker } from "./PostHogPageTracker.jsx";
import { usePostHog } from "@posthog/react";

function App() {
  const { mode } = useMode();
  const style = "flex justify-center my-100 text-2xl text-text text-center";

  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;

    const setupGeoTracking = async () => {
      try {
        const res = await fetch("/api/geo");
        const data = await res.json();

        if (data.city) {
          posthog.register({
            visitor_city: data.city,
            visitor_governorate: data.region,
            visitor_country: data.country,
          });
        }

        posthog.capture("$pageview");
      } catch (e) {
        console.error("Geo fetching failed", e);
        posthog.capture("$pageview");
      }
    };

    setupGeoTracking();
  }, [posthog]);

  return (
    <>
      <PostHogPageTracker />

      <div className="flex flex-col min-h-screen justify-between">
        <ScrollToTop />
        <ZakiChat />
        {mode === "dark" && <SpaceBackground />}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />

          <Route
            path="/blogs/"
            element={<h2 className={style}>Coming Soon...</h2>}
          />

          <Route
            path="*"
            element={
              <h2 className={style}>
                Error 404 <br /> Page Not Found
              </h2>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
export default App;
