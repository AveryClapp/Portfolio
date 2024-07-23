import React, { useState } from "react";
import { ChevronDown, ChevronUp, Settings, LogOut } from "lucide-react";

const MenuItem = ({ icon: Icon, label, items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
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

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Settings, label: "Introduction", items: [] },
    {
      icon: Settings,
      label: "About Me",
      items: [
        { label: "Tech Stack", href: "#" },
        { label: "Projects", href: "#" },
        { label: "Experience", href: "#" },
      ],
    },
    { icon: Settings, label: "Hobbies", items: [] },
    { icon: Settings, label: "Contact Me", items: [] },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <span className="sr-only">Open sidebar</span>
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <span className="text-white text-xl font-semibold">
            Avery's Portfolio
          </span>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </nav>

        <div className="absolute bottom-0 w-full">
          <div className="flex items-center px-4 py-3 bg-gray-800">
            <img
              className="h-8 w-8 rounded-full"
              src="https://i.ibb.co/L1LQtBm/Ellipse-1.png"
              alt="User avatar"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Alexis Enache</p>
              <p className="text-xs text-gray-300">alexis81@gmail.com</p>
            </div>
            <button className="ml-auto bg-gray-700 flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <LogOut className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
