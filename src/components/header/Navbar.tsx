import React from "react";
import "./navbar.css";
import { Button } from "../ui/button";
import { BookMarked } from "lucide-react";

const Navbar = () => {
  return (
    <header className="mx-auto px-4 py-6 flex justify-between items-center border-b-2 border-b-gray-200">
      <h1 className="text-2xl font-bold w-fit p-3 cursor-pointer header__logo">
        <span className="p-1 bg-black text-white rounded-sm">Box</span> Shadow.
      </h1>
      <nav>
        <ul className="flex justify-center items-center gap-8">
          <li>
            <a href="#" className="flex items-center gap-1 uppercase">
              <BookMarked size="1.1em" /> Saves
            </a>
          </li>
          <li className="">
            <Button variant="auth" size="md">
              Sign in
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

/**
 * 
 *  <li
            className="uppercase border-2 border-black cursor-pointer
           hover:text-white hover:bg-black transition-colors duration-700"
          >
            <a href="#" className="inline-block px-6 py-2">
              Sign in
            </a>
          </li>
 */
