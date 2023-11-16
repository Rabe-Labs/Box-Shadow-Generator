import GridColumns from "@/components/columns/GridColumns";
import Navbar from "@/components/header/Navbar";
import RightColumn from "@/components/rightColumn/RightColumn";
import PreviewColumn from "@/components/previewColumn/PreviewColumn";
import ShadowColumn from "@/components/leftColumn/ShadowColumn";
import Image from "next/image";
import MainDialog from "@/components/shared/Dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <main className="relative">
      <MainDialog />
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-[repeat(5,minmax(auto,1fr))] gap-1 lg:h-[calc(100vh-94px)]">
        <GridColumns className="lg:min-w-[280px] max-h-[500px] overflow-y-auto lg:max-h-none left-scrollbar">
          <ShadowColumn />
        </GridColumns>
        <GridColumns className="h-[500px] lg:h-auto lg:col-span-3 p-0">
          <PreviewColumn />
        </GridColumns>
        <GridColumns className="lg:col-span-1 lg:min-w-[300px] lg:max-h-[500px]">
          <RightColumn />
        </GridColumns>
      </div>
    </main>
  );
}
