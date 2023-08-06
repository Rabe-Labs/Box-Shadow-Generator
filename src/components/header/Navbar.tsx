"use client";
import { useState, useEffect } from "react";
import "./navbar.css";
import { Button } from "../ui/button";
import { BookMarked, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useModal from "@/hooks/useModal";
import { signOut, useSession } from "next-auth/react";
import UserInfo, { UserInfoSm } from "./UserInfo";
import { Separator } from "../ui/separator";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { handleModalStatusChange, handleModalTypeChange } = useModal();
  const { status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="mx-auto px-4 py-5 flex justify-between items-center border-b-2 border-b-gray-200 relative">
      <h1 className="text-lg font-bold w-fit p-3 cursor-pointer header__logo">
        <span className="p-1 bg-black text-white rounded-sm">Box</span> Shadow.
      </h1>
      <nav>
        {/* SMALLER SCREEN */}
        <Popover onOpenChange={() => setIsNavOpen((prev) => !prev)}>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="flex lg:hidden relative"
            >
              {isNavOpen ? <X /> : <Menu />}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit p-0 border-2 border-black mr-4"
            sideOffset={8}
            side="bottom"
          >
            <ul
              className={cn(
                `flex flex-col lg:hidden justify-center items-left gap-2 
            py-3 px-4 z-50 bg-white shadow-md rounded-sm sidebar__animate`
              )}
            >
              {/* SAVES SM */}
              <li className="inline-block">
                <Button
                  disabled={isLoading}
                  onClick={() => {
                    handleModalStatusChange();
                    handleModalTypeChange("save");
                  }}
                  variant={"link"}
                  className="flex items-center gap-1 text-sm h-6"
                >
                  <BookMarked size="1.1em" /> Saves
                </Button>
              </li>
              <Separator className="my-1" />

              {/* AVATAR SM */}
              <li className="inline-block">
                {status === "authenticated" ? (
                  <UserInfoSm />
                ) : (
                  <Button
                    disabled={isLoading}
                    onClick={() => {
                      handleModalStatusChange();
                      handleModalTypeChange("auth");
                    }}
                    variant="default"
                    size="md"
                    className="h-10"
                  >
                    {isLoading ? (
                      <div className="flex gap-2">
                        <div id="loading"></div>
                        Loading
                      </div>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                )}
              </li>
            </ul>
          </PopoverContent>
        </Popover>

        {/* LARGER SCREEN */}
        <ul className="hidden lg:flex justify-center items-center gap-4">
          <li className="inline-block">
            <Button
              disabled={isLoading}
              onClick={() => {
                handleModalStatusChange();
                handleModalTypeChange("save");
              }}
              variant={"link"}
              className="flex items-center gap-1 text-sm sm:text-base"
            >
              <BookMarked size="1.1em" /> Saves
            </Button>
          </li>
          <li>
            {status === "authenticated" ? (
              <UserInfo />
            ) : (
              <Button
                disabled={isLoading}
                onClick={() => {
                  handleModalStatusChange();
                  handleModalTypeChange("auth");
                }}
                variant="default"
                size="md"
              >
                {isLoading ? (
                  <div className="flex gap-2">
                    <div id="loading"></div>
                    Loading
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
