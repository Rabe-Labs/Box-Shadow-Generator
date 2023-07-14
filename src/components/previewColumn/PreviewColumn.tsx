"use client";
import useShadowContainer from "@/hooks/useShadowContainer";
import { cn, getAllBoxShadows } from "@/lib/utils";
import { CSSProperties, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

const PreviewColumn = () => {
  const { contextState } = useShadowContainer();
  const [boxShadowStyle, setBoxShadowStyle] = useState<CSSProperties>();
  //console.log("contextState", contextState.containerProps);

  const { canvasColor, ...containerProps } = contextState.containerProps;
  console.log("containerProps ", containerProps, boxShadowStyle);

  useEffect(() => {
    const boxShadow = getAllBoxShadows(contextState.boxShadows);

    const shadowStyle: CSSProperties = {
      boxShadow: boxShadow,
      WebkitBoxShadow: boxShadow,
      MozBoxShadow: boxShadow,
    };

    setBoxShadowStyle(shadowStyle);
  }, [contextState]);
  return (
    <section
      style={{ background: canvasColor }}
      className={cn(
        "relative h-full w-full grid place-content-center overflow-hidden"
      )}
    >
      <div style={{ ...containerProps, ...boxShadowStyle }} />

      <Badge className="absolute top-4 left-4"> Preview </Badge>
    </section>
  );
};

export default PreviewColumn;
