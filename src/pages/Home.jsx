import Landing from "../components/Landing";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Landing />
      <About />
      <hr className="border-t border-main mt-20 mb-10 mx-auto w-4/5 opacity-80" />
      <Projects />
      <hr className="border-t border-main mt-20 mb-10 mx-auto w-4/5 opacity-80" />
      <Contact />
    </>
  );
}
