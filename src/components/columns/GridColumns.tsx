import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface GridColumnsProps extends HTMLAttributes<HTMLDivElement> {}

const GridColumns = ({ className, children }: GridColumnsProps) => {
  return (
    <div className={cn("col bg-slate-100 p-5 lg-h-full overflow", className)}>
      {children}
    </div>
  );
};

export default GridColumns;
