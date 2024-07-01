// components/Sidebar.js
"use client";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/Button";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        size="icon"
        variant="destructive"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 left-3 z-50 bg-red-500 size-6 duration-800 transition-all"
      >
        {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
      </Button>

      <div
        className={`fixed inset-y-0 left-0 ${isOpen ? "w-64" : "w-0 md:w-16"} md:relative bg-gray-800 text-white flex flex-col transition-width duration-300`}
      >
        <Button variant="destructive" size="icon" onClick={() => setIsOpen(!isOpen)} className="absolute size-6 top-5 -right-3 rounded-full hidden md:flex bg-red-500">
          {isOpen ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        </Button>

        <nav className={`${isOpen ? "block" : "hidden"} md:block mt-8`}>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Link 1
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Link 2
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Link 3
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
