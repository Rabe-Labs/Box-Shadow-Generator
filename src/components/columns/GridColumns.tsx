import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface IGridColumnsProps extends HTMLAttributes<HTMLDivElement> {}

const GridColumns = ({ className, children }: IGridColumnsProps) => {
  return (
    <div className={cn("col bg-[#f9fafb] p-5 lg-h-full", className)}>
      {children}
    </div>
  );
};

export default GridColumns;
