"use client";
import useShadowContainer from "@/hooks/useShadowContainer";
import { cn, getAllBoxShadows } from "@/lib/utils";
import { CSSProperties, useEffect, useState } from "react";

const PreviewColumn = () => {
  const { contextState } = useShadowContainer();
  const [boxShadowStyle, setBoxShadowStyle] = useState<CSSProperties>();
  //console.log("contextState", contextState.containerProps);

  const { canvasColor, ...containerProps } = contextState.containerProps;

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
      style={{ backgroundColor: canvasColor }}
      className={cn(
        "h-full w-full grid place-content-center overflow-hidden",
        canvasColor
      )}
    >
      <div style={{ ...containerProps, ...boxShadowStyle }} />
    </section>
  );
};

export default PreviewColumn;
