import GridColumns from "@/components/columns/GridColumns";
import Navbar from "@/components/header/Navbar";
import ShadowSection from "@/components/shadowSection/ShadowSection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 px-4">
        <GridColumns className="">
          <ShadowSection />
        </GridColumns>
        <GridColumns className="lg:col-span-2 ">Preview</GridColumns>
        <GridColumns className="lg:col-span-2">Box Properties</GridColumns>
      </div>
    </main>
  );
}
