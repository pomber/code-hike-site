import { CodeSpring } from "@code-hike/smooth-code";
import { EditorSpring } from "@code-hike/mini-editor";
import { MiniBrowser } from "@code-hike/mini-browser";
import theme from "shiki/themes/min-light.json";

export function HomeDemo({ code }) {
  const props = {
    northPanel: {
      tabs: ["some.mdx"],
      active: "some.mdx",
      heightRatio: 1,
    },
    files: [{ name: "some.mdx", code, annotations: [], focus: "2:8" }],
    codeConfig: { theme, minZoom: 0.5 },
    frameProps: { style: { height: "100%" } },
  };
  return (
    <div className="flex gap-6 w-full home-demo">
      <div className="h-96 rounded flex-1  unreset ">
        <EditorSpring {...props} />
      </div>
      <div className="h-96 rounded flex-1 ">
        <MiniBrowser />
      </div>
    </div>
  );
}
