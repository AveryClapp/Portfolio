import React, { useState } from "react";
import { Home, Briefcase, Code, Heart, Mail } from "lucide-react";

const MenuItem = ({ icon: Icon, label, href }) => (
  <a
    href={href}
    className="flex items-center w-full p-3 text-gray-300 transition-colors duration-200 hover:bg-indigo-700 hover:text-white rounded-md"
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="text-sm font-medium">{label}</span>
  </a>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openMenus, setOpenMenus] = useState({});
  const menuItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: Code, label: "Tech Stack", href: "#tech-stack" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
    { icon: Briefcase, label: "Experience", href: "#experience" },
    { icon: Heart, label: "Hobbies", href: "#hobbies" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];
  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 ease-in-out transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-gray-800">
            <span className="text-white text-xl font-semibold">
              Avery's Portfolio
            </span>
          </div>
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                {...item}
                isOpen={openMenus[index]}
                toggleOpen={() => toggleMenu(index)}
                href={item.href}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
