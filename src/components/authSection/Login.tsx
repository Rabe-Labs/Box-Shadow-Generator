"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";

type Props = {
  className?: string;
};

const Login = ({ className }: Props) => {
  const { status } = useSession();
  const isLoading = status === "loading";

  return (
    <section className={className}>
      <h2 className="text-xl my-4"> Sign in with the Following: </h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          {/* GOOGLE AUTH */}
          <Button
            disabled={isLoading}
            onClick={() => signIn("google")}
            variant={"default"}
            className="flex items-center gap-2"
          >
            <Image
              src="/imgs/google.svg"
              width="20"
              height={20}
              alt="Google Icon"
            />
            Sign In with Google{" "}
          </Button>
        </div>
        <div>
          {/* GITHUB AUTH */}
          <Button
            disabled={isLoading}
            onClick={() => signIn("github")}
            variant={"default"}
            type="button"
            className="flex items-center gap-2 bg-white text-black shadow-sm
             hover:bg-slate-400/20"
          >
            <Image
              src="/imgs/github.svg"
              width={25}
              height={25}
              alt="Github Icon"
            />
            Sign In with Github{" "}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Login;
