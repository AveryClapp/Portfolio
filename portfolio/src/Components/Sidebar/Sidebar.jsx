import React, { useState } from "react";
import { Home, Briefcase, Code, Heart, Mail, ChevronRight } from "lucide-react";

const MenuItem = ({ icon: Icon, label, href, isActive }) => (
  <a
    href={href}
    className={`flex items-center w-full p-3 text-green-500 transition-all duration-300 hover:bg-green-900/30 rounded-md group ${
      isActive ? "bg-green-900/50 font-bold" : ""
    }`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="text-sm flex-grow font-mono">{label}</span>
    {isActive && <ChevronRight className="w-4 h-4" />}
  </a>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] = useState("Home");
  const menuItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: Code, label: "Tech_Stack", href: "#tech-stack" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
    { icon: Briefcase, label: "Experience", href: "#experience" },
    { icon: Heart, label: "Hobbies", href: "#hobbies" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-black transition-transform duration-300 ease-in-out transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 border-r border-green-500/30`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 bg-green-900/20 px-4">
          <span className="text-green-500 text-xl font-mono font-bold">
            Avery_Portfolio
          </span>
          <span className="text-green-500 animate-pulse">■</span>
        </div>
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              {...item}
              isActive={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </nav>
        <div className="p-4 text-green-500 font-mono text-xs">
          <p>System Status: Online</p>
          <p>Last Updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
