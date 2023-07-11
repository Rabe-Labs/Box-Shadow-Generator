import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface IColumnTitleProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

const ColumnTitle = ({ name, className }: IColumnTitleProps) => {
  return (
    <h1 className={cn("lg:text-center", className)}>
      <span className="text-md drop-shadow font-medium">{name}</span>
    </h1>
  );
};

export default ColumnTitle;
