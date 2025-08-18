// src/Components/Home/Home.jsx
import Header from "@/Components/Header/Header";
import Welcome from "@/Components/Welcome/Welcome";
import Footer from "@/Components/Footer/Footer";
import Projects from "@/Components/Technical/Projects";
import Experience from "@/Components/Technical/Experience";
import { Analytics } from "@vercel/analytics/next";
import Image from "next/image";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Analytics />
      <Header className="mb-6" />
      <main className="mb-6 relative z-20 flex-1">
        <div className="flex flex-col lg:flex-row">
          {/* Main content - responsive margins */}
          <div className="px-4 lg:ml-32 w-full">
            <section id="home">
              <Welcome />
            </section>
            <section id="experience">
              <Experience />
            </section>
            <section id="projects">
              <Projects />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
