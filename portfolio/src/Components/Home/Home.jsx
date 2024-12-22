import React from "react";
import Header from "../Header/Header";
import Welcome from "../Welcome/Welcome";
import Footer from "../Footer/Footer";
import Projects from "../Technical/Projects";
import Experience from "../Technical/Experience";
import img from "../../headshot.png";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />
      <main className="relative z-20 flex-1">
        <div className="flex">
          {/* Left column - 3/5 width */}
          <div className="px-4 ml-32 w-3/5">
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
          {/* Right column - 2/5 width */}
          <div className="w-2/5 px-4 flex justify-center">
            <img
              src={img}
              alt={"Me" || "Profile picture"}
              className="rounded-lg w-auto h-80 object-cover shadow-sm"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
