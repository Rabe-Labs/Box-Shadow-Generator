import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <header className="max-w-screen-lg mx-auto px-4 py-7 flex justify-between items-center">
      <h1 className="text-2xl font-bold   w-fit p-3 cursor-pointer header__logo">
        <span className="p-1 bg-black text-white rounded-sm">Box</span> Shadow.
      </h1>
      <nav>
        <ul className="flex justify-center items-center gap-8">
          <li>
            <a href="#" className="uppercase">
              {" "}
              Saved{" "}
            </a>
          </li>
          <li
            className="uppercase border-2 border-black cursor-pointer
           hover:text-white hover:bg-black transition-all"
          >
            <a href="#" className="inline-block px-6 py-2">
              Sign in
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
