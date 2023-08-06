import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import useModal from "@/hooks/useModal";
import Image from "next/image";

const Saves = () => {
  const { status, data: session } = useSession();
  const { handleModalStatusChange, handleModalTypeChange } = useModal();

  const isAuthenticated = status === "authenticated";

  const userEmail = session?.user?.email || "";

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `http://localhost:3000/api/save/${userEmail}`
      );
      const data = await response.json();
      console.log("Save Data:", data);
    }
    getData();
  }, [userEmail]);

  return (
    <div>
      {!isAuthenticated ? (
        <div className="py-3 flex flex-col items-center">
          <Image
            src={"/gif/sign.gif"}
            width="400"
            height="400"
            alt="Google Icon"
          />
          <h3 className="text-lg text-center">
            Please
            <Button
              onClick={() => {
                handleModalTypeChange("auth");
              }}
              variant={"link"}
              className="text-xl inline-block text-blue-300 w-fit px-2"
            >
              sign in
            </Button>
            to view your saves!
          </h3>
        </div>
      ) : (
        <div>
          <h2 className="text-lg text-left"> Your Saves! </h2>
        </div>
      )}
    </div>
  );
};

export default Saves;
