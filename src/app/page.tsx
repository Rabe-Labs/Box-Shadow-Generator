import BoxPropsColumn from "@/components/boxPropsColumn/BoxPropsColumn";
import GridColumns from "@/components/columns/GridColumns";
import Navbar from "@/components/header/Navbar";
import PreviewColumn from "@/components/previewColumn/PreviewColumn";
import ShadowColumn from "@/components/shadowColumn/ShadowColumn";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-[repeat(5,minmax(auto,1fr))] gap-1 h-[calc(100vh-94px)]">
        <GridColumns className="lg:min-w-[270px]">
          <ShadowColumn />
        </GridColumns>
        <GridColumns className="h-[500px] lg:h-auto lg:col-span-3 p-0">
          <PreviewColumn />
        </GridColumns>
        <GridColumns className="lg:col-span-1 lg:min-w-[300px]">
          <BoxPropsColumn />
        </GridColumns>
      </div>
    </main>
  );
}
