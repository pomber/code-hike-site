import { CodeSpring } from "@code-hike/smooth-code";
import theme from "shiki/themes/github-light.json";

export function HomeDemo({ code }) {
  return (
    <div className="flex gap-6 w-full">
      <div className="bg-gray-300 h-80 rounded flex-1 shadow-lg">
        <CodeSpring
          config={{
            theme,
            minZoom: 0.5,
            htmlProps: { style: { height: "100%" } },
          }}
          step={{ code, focus: "2:8", annotations: [] }}
        />
      </div>
      <div className="bg-gray-300 h-80 rounded flex-1 shadow-lg">
        Get a React component
      </div>
    </div>
  );
}
