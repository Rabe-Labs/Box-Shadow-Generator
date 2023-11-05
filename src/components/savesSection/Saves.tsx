import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import useModal from "@/hooks/useModal";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SavesAccordin from "./SavesAccordin";
const Saves = () => {
  const { status, data: session } = useSession();
  const { handleModalStatusChange, handleModalTypeChange } = useModal();

  const isAuthenticated = status === "authenticated";

  const userEmail = session?.user?.email || "";

  const [savedData, setSavedData] = useState<any>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `http://localhost:3000/api/save/${userEmail}`
      );
      const jsonResponse = await response.json();
      console.log("Save Data :-", jsonResponse.data);
      setSavedData(jsonResponse.data);
    }
    getData();
  }, [userEmail]);

  console.log("total saved Data", savedData);

  //const { data, error, isLoading } = useQuery("savedData", getFacts);

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
          <h2 className="text-lg text-left"> Your Saves!</h2>
          <div> Total Saves: {savedData.length} </div>
          <div>
            {savedData.length > 0 ? (
              savedData.map((data: any, index) => (
                <div key={data._id}>
                  <div>
                    <SavesAccordin
                      setSavedData={setSavedData}
                      boxShadows={data.boxShadows}
                      boxId={data._id}
                      index={index}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div> No shadows found </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Saves;
