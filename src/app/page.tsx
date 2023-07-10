import GridColumns from "@/components/columns/GridColumns";
import Navbar from "@/components/header/Navbar";
import ShadowColumn from "@/components/shadowColumn/ShadowColumn";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 h-[calc(100vh-110px)]">
        <GridColumns>
          <ShadowColumn />
        </GridColumns>
        <GridColumns className="lg:col-span-2 ">Preview</GridColumns>
        <GridColumns className="lg:col-span-2">Box Properties</GridColumns>
      </div>
    </main>
  );
}
