import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface IColumnTitleProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

const ColumnTitle = ({ name, className }: IColumnTitleProps) => {
  return (
    <h3 className={cn("lg:text-center", className)}>
      <span className="text-md drop-shadow font-medium">{name}</span>
    </h3>
  );
};

export default ColumnTitle;
