import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import SaveCodeSection from "../codeSection/SaveCodeSection";

type Props = {};

const SavesAccordin = ({ boxShadows }: Props) => {
  return (
    <Accordion type="multiple" className="w-full">
      {boxShadows.length > 0 ? (
        boxShadows.map((boxShadow, index) => (
          <AccordinItem
            index={index}
            key={boxShadow.id}
            boxShadow={boxShadow}
          />
        ))
      ) : (
        <div>
          <p className="text-sm text-center"> No Shadow Found </p>
        </div>
      )}
    </Accordion>
  );
};

const AccordinItem = ({ boxShadow, index }) => {
  return (
    <AccordionItem value={`shadow-${index + 1}`}>
      <AccordionTrigger> Save {index + 1} </AccordionTrigger>
      <AccordionContent>
        <div className="pb-2 space-y-4">
          <div className="flex items-center">
            <SaveCodeSection AllboxShadow={boxShadow} />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SavesAccordin;
