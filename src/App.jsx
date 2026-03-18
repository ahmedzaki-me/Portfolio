import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import SpaceBackground from "./components/BG";
import ProjectDetails from "./pages/ProjectDetails";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import ProjectsPage from "./pages/ProjectsPage";

import useMode from "./hooks/useMode.js";

import ReactGA from "react-ga4";
const TRACKING_ID = "G-B89DW180V4";

function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({
      hitType: "pageview",
      page: "/landingpage",
      title: "Landing Page",
    });
  }, []);

  const { mode } = useMode();
  const style = "flex justify-center my-100 text-2xl text-text text-center";

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <ScrollToTop />
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
  );
}
export default App;
