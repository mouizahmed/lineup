import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { ServiceBrowse } from "@/components/home/ServiceBrowse";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CtaStrip } from "@/components/home/CtaStrip";
import { Footer } from "@/components/home/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceBrowse />
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
