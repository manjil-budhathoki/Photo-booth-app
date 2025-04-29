import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-14 py-6 fixed top-0 left-0 z-50 bg-transparent">
      {/* Left: Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition-all duration-300 cursor-pointer tracking-wide">
        Simjille
      </Link>

      {/* Right Links */}
      <div className="flex space-x-10 text-sm font-semibold">
        {['Home', 'FAQs', 'Contact', 'Feedback'].map((item, idx) => (
          <a key={idx} href="#" className="text-gray-700 hover:text-purple-500 transition-all duration-300">
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
