import Navbar            from "./components/Navbar";
import Hero              from "./components/Hero";
import TrustStrip        from "./components/TrustStrip";
import Workspace         from "./components/Workspace";
import Features          from "./components/Features";
import Testimonials      from "./components/Testimonials";
import Pricing           from "./components/Pricing";
import FAQ               from "./components/FAQ";
import CTA               from "./components/CTA";
import Footer            from "./components/Footer";
import ScrollToTop       from "./components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* 60px nav + 40px existing banner = 100px offset */}
      <main style={{ paddingTop: 100 }}>
        <Hero />
        <TrustStrip />
        <Workspace />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
