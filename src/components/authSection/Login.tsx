import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const Login = (props: Props) => {
  return (
    <section className="">
      <h2 className="text-xl my-4"> Sign in with the Following: </h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <Button
            variant={"default"}
            //onClick={handleGoogleSignin}
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
        <div className=" ">
          <Button
            variant={"default"}
            type="button"
            //onClick={handleGithubSignin}
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
