import * as HoverCard from "@radix-ui/react-hover-card";

export default function MyTooltipAnnotation({ children, data, theme }) {
  const border =
    typeof data === "string"
      ? data
      : theme.tokenColors.find((tc) => tc.scope?.includes("string"))?.settings
          ?.foreground || "yellow";

  return (
    <HoverCard.Root openDelay={300}>
      <HoverCard.Trigger asChild>
        <span style={{ outline: `2px solid ${border}` }}>{children}</span>
      </HoverCard.Trigger>
      <HoverCard.Content
        className="rounded w-72 p-4 bg-white shadow-lg unreset"
        sideOffset={8}
      >
        <HoverCard.Arrow className="text-white" style={{ fill: "white" }} />
        {data?.children || "Hey"}
      </HoverCard.Content>
    </HoverCard.Root>
  );
  return;
}
