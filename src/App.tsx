import { useState, useEffect } from "react";
import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import Problem      from "./components/Problem";
import HowItWorks   from "./components/HowItWorks";
import Features     from "./components/Features";
import Testimonials from "./components/Testimonials";
import Roadmap      from "./components/Roadmap";
import Pricing      from "./components/Pricing";
import Waitlist     from "./components/Waitlist";
import CTA          from "./components/CTA";
import Footer       from "./components/Footer";
import DemoPlayer   from "./demo/DemoPlayer";
import AdminPage    from "./pages/Admin";

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const fn = () => setHash(window.location.hash);
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  return hash;
}

export default function App() {
  const [showDemo, setShowDemo] = useState(false);
  const hash = useHashRoute();

  if (hash === "#/admin") {
    return <AdminPage />;
  }

  return (
    <div
      className="scroll-smooth"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      <Navbar onWatchDemo={() => setShowDemo(true)} />
      <Hero   onWatchDemo={() => setShowDemo(true)} />
      <Problem />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Roadmap />
      <Waitlist />
      <Pricing />
      <CTA />
      <Footer />

      {showDemo && <DemoPlayer onClose={() => setShowDemo(false)} />}
    </div>
  );
}
