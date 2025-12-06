import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-20">
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />

      {/* Placeholder pour voir qu'on peut scroller */}
      <section className="h-screen bg-background flex items-center justify-center">
        <p className="text-gray-500">
          La suite du site (À propos, Projets) viendra ici...
        </p>
      </section>
    </div>
  );
}
