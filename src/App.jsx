import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Home from "./pages/Home";
import SpaceBackground from "./components/BG";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import ZakiChat from "./components/ZakiChat.jsx";
import useMode from "./hooks/useMode.js";
import { PostHogPageTracker } from "./PostHogPageTracker.jsx";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));

function RouteFallback() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <span className="h-9 w-9 rounded-full border-3 border-main border-t-transparent animate-spin" />
    </div>
  );
}

function StatusPage({ title, children }) {
  useEffect(() => {
    document.title = `${title} | Ahmed Zaki`;
  }, [title]);

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 text-2xl text-text text-center">
      <h1 className="font-bold leading-relaxed">{children}</h1>
    </section>
  );
}

function App() {
  const { mode } = useMode();
  const { t } = useTranslation();

  return (
    <>
      <PostHogPageTracker />

      <div className="flex flex-col min-h-screen justify-between">
        <ScrollToTop />
        <ZakiChat />
        {mode === "dark" && <SpaceBackground />}
        <Header />
        <main className="flex-1">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />

              <Route
                path="/blogs/"
                element={
                  <StatusPage title={t("Blogs")}>
                    {t("Coming Soon...")}
                  </StatusPage>
                }
              />

              <Route
                path="*"
                element={
                  <StatusPage title={`${t("Error 404")} - ${t("Page Not Found")}`}>
                    {t("Error 404")} <br /> {t("Page Not Found")}
                  </StatusPage>
                }
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
