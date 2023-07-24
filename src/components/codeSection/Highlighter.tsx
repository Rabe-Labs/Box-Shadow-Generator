import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

interface IHighlighterProps extends HTMLAttributes<HTMLDivElement> {
  language: string;
  children: string | string[];
  theme: any;
}

export const Highlighter = ({
  language,
  theme,
  children,
  className,
}: IHighlighterProps) => {
  return (
    <SyntaxHighlighter language={language} style={theme} className={className}>
      {children}
    </SyntaxHighlighter>
  );
};
