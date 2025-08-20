"use client";

import React from "react";
import { Search, Upload, User, MessageCircle } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full h-[81px] bg-[#1a1a1a] flex items-center justify-between px-16 z-50">
      {/* Left - Logo + Beta */}
      <div className="flex items-center gap-4">
        <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
          3dimli
        </span>
        <span className="text-xs text-gray-400 tracking-wider">BETA 1.0.1</span>
        <span className="text-gray-700 px-2">|</span>
      </div>

      {/* Center - Nav links + Search */}
      <div className="flex  gap-6 flex-1 ml-6 ">
        <div className="flex items-center gap-6 text-sm font-medium text-gray-300 ">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Discover</a>
          <a href="#" className="hover:text-white">Features</a>
          <a href="#" className="hover:text-white">Pricing</a>
        </div>

        {/* Search box */}
        <div className=" flex items-center bg-[#2e2e2e] rounded-xl px-3 py-2 w-full mr-5">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 outline-none"
          />
          <Search size={18} className="text-gray-400" />
        </div>
      </div>

      {/* Right - Buttons + Profile */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-[#5865F2] dark:bg-gradient-to-bl dark:from-gray-900 dark:to-primary
 text-white px-6 py-3 rounded-xl text-lg font-medium">
          <MessageCircle size={16} />
          Discord
        </button>
        
        <button
            className="relative flex items-center gap-2 bg-[#5865F2] dark:bg-gradient-to-bl dark:from-gray-900 dark:to-primary
 text-white px-6 py-3 rounded-xl text-lg font-medium overflow-x-hidden"
          >
            <Upload size={16} />
            <span className="relative z-10">Upload</span>
            <span className="absolute top-0 left-[-150%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/55 to-transparent skew-x-[-20deg] animate-[shine_2.5s_linear_infinite]" />
          </button>
        <button className="w-15 h-15 rounded-full border border-gray-600 flex items-center justify-center">
          <User size={28} className="text-gray-300" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
