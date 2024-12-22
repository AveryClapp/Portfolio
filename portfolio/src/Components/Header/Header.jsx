import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="top-0 w-full mb-8 bg-stone-100 z-50">
      <div className="h-16 flex items-center px-8">
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-2 text-base transition-colors ${
                isActive
                  ? "text-neutral-900 border-b-2 border-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `py-2 text-base transition-colors ${
                isActive
                  ? "text-neutral-900 border-b-2 border-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900"
              }`
            }
          >
            Blog
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
