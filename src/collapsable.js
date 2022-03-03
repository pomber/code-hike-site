import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React from "react";

export function Collapsable({
  children,
  openText = "Show",
  closeText = "Hide",
}) {
  const [isOpen, setOpen] = React.useState(false);
  const [header, ...content] = React.Children.toArray(children);
  return (
    <Collapsible.Root onOpenChange={(open) => setOpen(open)}>
      <div className="flex mt-4">
        <div className="flex-1">{header?.props?.children}</div>
        <Collapsible.Trigger className="bg-gray-200 px-2 rounded w-20 text-right">
          <span className="pr-1">{isOpen ? closeText : openText}</span>
          <ChevronDownIcon
            aria-hidden
            className="inline-block"
            style={{
              transition: "transform 300ms",
              transform: `rotate(${isOpen ? 180 : 0}deg)`,
            }}
          />
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content className="collapsable-content">
        {content}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
