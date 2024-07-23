import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Welcome from "../Welcome/Welcome";
import About from "../About/About";
import Hobbies from "../Hobbies/Hobbies";
import Contact from "../Contact/Contact";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-0 left-0 m-4 z-50">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Welcome />
            <About />
            <Hobbies />
            <Contact />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
