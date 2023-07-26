"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          {session?.user?.image && <AvatarImage src={session?.user?.image} />}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="hidden lg:block w-fit p-4 border-2 border-black mr-4 space-y-3"
        sideOffset={8}
      >
        <h3> Hello, {session?.user?.name?.split(" ")[0]} 👋🏼 </h3>
        <Button
          onClick={() => signOut()}
          variant="auth"
          size="md"
          className="w-full h-10 text-sm"
        >
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserInfo;

export const UserInfoSm = () => {
  const { data: session } = useSession();

  return (
    <div className="flex gap-4 justify-center items-center">
      <Avatar>
        {session?.user?.image && <AvatarImage src={session?.user?.image} />}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <h3 className="text-sm">
          {" "}
          Hello, {session?.user?.name?.split(" ")[0]}
        </h3>
        <Button
          onClick={() => signOut()}
          size="md"
          className="p-0 w-full h-8 text-sm"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};
