import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Settings, X } from "lucide-react";

const MenuItem = ({ icon: Icon, label, items = [], isOpen, toggleOpen }) => {
  return (
    <div className="w-full">
      <button
        onClick={toggleOpen}
        className="flex items-center w-full p-3 text-gray-300 transition-colors duration-200 hover:bg-gray-800 hover:text-white rounded-md"
      >
        <Icon className="w-5 h-5 mr-3" />
        <span className="text-sm font-medium">{label}</span>
        {items.length > 0 &&
          (isOpen ? (
            <ChevronUp className="w-4 h-4 ml-auto" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-auto" />
          ))}
      </button>
      {isOpen && items.length > 0 && (
        <div className="ml-6 mt-2 space-y-2">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-3 py-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-white hover:bg-gray-700"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openMenus, setOpenMenus] = useState({});

  const menuItems = [
    { icon: Settings, label: "Introduction", items: [] },
    {
      icon: Settings,
      label: "About Me",
      items: [
        { label: "Tech Stack", href: "#tech-stack" },
        { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
      ],
    },
    { icon: Settings, label: "Hobbies", items: [] },
    { icon: Settings, label: "Contact Me", items: [] },
  ];

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-gray-800 px-4">
            <span className="text-white text-xl font-semibold">
              Avery's Portfolio
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                {...item}
                isOpen={openMenus[index]}
                toggleOpen={() => toggleMenu(index)}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
