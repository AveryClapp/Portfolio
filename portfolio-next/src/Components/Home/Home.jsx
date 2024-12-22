import Header from "@/Components/Header/Header"
import Welcome from "@/Components/Welcome/Welcome"
import Footer from "@/Components/Footer/Footer"
import Projects from "@/Components/Technical/Projects"
import Experience from "@/Components/Technical/Experience"
import Image from 'next/image'

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
            <Image
              src="/headshot.png"
              alt={"Me" || "Profile picture"}
              className="rounded-lg w-auto h-80 object-cover shadow-sm"
		      width={220} 
		   	  height={320}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
