import { useEffect } from "react";
import Landing from "../components/Landing";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  useEffect(() => {
    document.title = "أحمد زكي - Ahmed Zaki | Full Stack Developer";
  }, []);

  return (
    <>
      <Landing />
      <About />
      <hr className="border-t border-main mt-10 mb-6 md:mt-20 md:mb-10 mx-auto w-4/5 opacity-80" />
      <Projects />
      <hr className="border-t border-main mt-10 mb-6 md:mt-20 md:mb-10 mx-auto w-4/5 opacity-80" />
      <Contact />
    </>
  );
}
