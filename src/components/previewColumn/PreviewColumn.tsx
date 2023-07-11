"use client";
import useShadowContainer from "@/hooks/useShadowContainer";
import { getAllBoxShadows } from "@/lib/utils";
import { CSSProperties, useEffect, useState } from "react";

const PreviewColumn = () => {
  const { contextState } = useShadowContainer();
  const [boxShadowStyle, setBoxShadowStyle] = useState<CSSProperties>();
  //console.log("contextState", contextState.containerProps);

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
    <section className="h-full w-full grid place-content-center overflow-hidden">
      <div style={{ ...contextState.containerProps, ...boxShadowStyle }} />
    </section>
  );
};

export default PreviewColumn;
