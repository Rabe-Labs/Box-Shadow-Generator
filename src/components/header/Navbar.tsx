"use client";
import { useState, useEffect } from "react";
import "./navbar.css";
import { Button } from "../ui/button";
import { BookMarked, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsNavOpen((prev) => !prev);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="mx-auto px-4 py-5 flex justify-between items-center border-b-2 border-b-gray-200 relative">
      <h1 className="text-lg font-bold w-fit p-3 cursor-pointer header__logo">
        <span className="p-1 bg-black text-white rounded-sm">Box</span> Shadow.
      </h1>
      <nav className="relative">
        <Button
          variant="default"
          size="icon"
          className="flex lg:hidden "
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          {isNavOpen ? <X /> : <Menu />}
        </Button>

        <ul className="hidden lg:flex justify-center items-center gap-4">
          <li className="inline-block">
            <Button
              variant={"link"}
              className="flex items-center gap-1 text-sm sm:text-base"
            >
              <BookMarked size="1.1em" /> Saves
            </Button>
          </li>
          <li>
            <Button variant="auth" size="md">
              Sign in
            </Button>
          </li>
        </ul>

        {isNavOpen && (
          <ul
            className={cn(
              `flex flex-col lg:hidden justify-center items-left gap-2 border-2 border-black 
            py-3 px-4 z-50 absolute right-0 top-10 w-[9.5rem] bg-white shadow-md rounded-sm sidebar__animate`
            )}
          >
            <li className="inline-block">
              <Button
                variant="link"
                className="flex items-center gap-1 text-sm sm:text-base"
              >
                Saves
              </Button>
            </li>
            <li className="inline-block">
              <Button
                variant="auth"
                size="md"
                className="w-full text-sm sm:text-base"
              >
                Sign in
              </Button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
