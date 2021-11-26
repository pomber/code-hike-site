import { EditorSpring } from "@code-hike/mini-editor";
import { MiniBrowser } from "@code-hike/mini-browser";
import theme from "shiki/themes/min-light.json";
import React from "react";

export function HomeDemo({ code }) {
  const [focus, setFocus] = React.useState(focuses[0][0]);

  function onVideoProgress(e) {
    const { currentTime } = e.currentTarget;
    for (let i = 0; i < focuses.length; i++) {
      const [focus, end] = focuses[i];
      if (currentTime <= end) {
        setFocus(focus);
        return;
      }
    }
    setFocus(focuses[0][0]);
  }

  const props = React.useMemo(
    () => ({
      northPanel: {
        tabs: ["some.mdx"],
        active: "some.mdx",
        heightRatio: 1,
      },
      files: [{ name: "some.mdx", code, annotations: [], focus }],
      codeConfig: { theme, minZoom: 0.5 },
      frameProps: { style: { height: "100%" } },
    }),
    [code, focus]
  );
  return (
    <div className="flex gap-6 w-full home-demo relative">
      <div className="flex-1">
        <div className="text-2xl flex ml-8 mb-2">
          <Arrow />
          <span>
            Write with <span className="font-bold">MDX</span>
          </span>
        </div>
        <div className="unreset" style={{ height: 420.6 }}>
          <EditorSpring {...props} />
        </div>
      </div>
      <div className="h-96 flex-1">
        <div className="flex text-2xl justify-end mr-8 mb-2">
          <span>
            Show with <span className="font-bold">React</span>
          </span>
          <Arrow right />
        </div>
        <div style={{ height: 420.6 }}>
          <MiniBrowser url="/show">
            <video
              onTimeUpdate={onVideoProgress}
              onSeeking={onVideoProgress}
              src="./show1.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted
              controls
              loop
            />
          </MiniBrowser>
        </div>
      </div>
    </div>
  );
}

function Arrow({ right }) {
  return (
    <svg
      width="60"
      viewBox="0 0 107 99"
      className="m-3"
      style={{ transform: right ? "scale(-1, 1)" : undefined, margin: "0.6em" }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M52 24.5L54.7713 27.3844L52 24.5ZM26.6714 97.3284C28.2335 98.8905 30.7662 98.8905 32.3283 97.3284L57.7841 71.8726C59.3462 70.3105 59.3462 67.7778 57.7841 66.2157C56.222 64.6536 53.6894 64.6536 52.1273 66.2157L29.4999 88.8432L6.87246 66.2157C5.31036 64.6536 2.7777 64.6536 1.2156 66.2157C-0.346496 67.7778 -0.346496 70.3105 1.2156 71.8726L26.6714 97.3284ZM106.5 5C106.764 1.00873 106.763 1.00863 106.761 1.00852C106.76 1.00848 106.758 1.00836 106.757 1.00827C106.754 1.00808 106.751 1.00787 106.747 1.00763C106.739 1.00714 106.73 1.00654 106.718 1.00584C106.695 1.00445 106.664 1.00265 106.626 1.00055C106.549 0.996348 106.442 0.990941 106.306 0.985129C106.033 0.973507 105.644 0.960257 105.149 0.951807C104.16 0.934913 102.743 0.937172 100.982 1.01032C97.4649 1.15645 92.5491 1.58644 86.8995 2.72173C75.6357 4.9852 61.2104 10.1037 49.2287 21.6156L54.7713 27.3844C65.2897 17.2785 78.1144 12.647 88.4756 10.5649C93.6385 9.52745 98.1289 9.13577 101.314 9.00343C102.905 8.93734 104.165 8.93616 105.013 8.95064C105.437 8.95788 105.757 8.96901 105.965 8.97786C106.068 8.98228 106.144 8.98613 106.189 8.98862C106.212 8.98987 106.227 8.99078 106.235 8.99125C106.239 8.99149 106.241 8.99162 106.241 8.99162C106.241 8.99163 106.241 8.9916 106.24 8.99154C106.24 8.99151 106.239 8.99144 106.238 8.99143C106.237 8.99135 106.236 8.99127 106.5 5ZM49.2287 21.6156C37.0376 33.3286 31.2282 51.8888 28.3827 66.8598C26.9406 74.4473 26.2214 81.3296 25.8618 86.3147C25.6818 88.8102 25.5913 90.838 25.5459 92.2502C25.5232 92.9564 25.5117 93.5093 25.5058 93.8903C25.5029 94.0808 25.5014 94.2284 25.5007 94.3308C25.5003 94.382 25.5001 94.4218 25.5 94.4501C25.4999 94.4643 25.4999 94.4755 25.4999 94.4839C25.4999 94.488 25.4999 94.4915 25.4999 94.4942C25.4999 94.4955 25.4999 94.497 25.4999 94.4976C25.4999 94.4989 25.4999 94.5 29.4999 94.5C33.4999 94.5 33.4999 94.5007 33.4999 94.5013C33.4999 94.5012 33.4999 94.5016 33.4999 94.5014C33.4999 94.5012 33.4999 94.5002 33.4999 94.4985C33.4999 94.4951 33.4999 94.4888 33.4999 94.4796C33.5 94.4612 33.5001 94.4314 33.5004 94.3903C33.5011 94.3083 33.5023 94.1816 33.5049 94.0125C33.5101 93.6742 33.5205 93.1665 33.5417 92.5076C33.5842 91.1894 33.6695 89.2684 33.8411 86.8903C34.1846 82.1281 34.8716 75.5638 36.242 68.3535C39.0216 53.729 44.4623 37.2892 54.7713 27.3844L49.2287 21.6156Z"
        fill="#2563EB"
      />
    </svg>
  );
}

export const steps = [
  { delay: 4, focus: "3,5:14", top: 0 },
  // Focusing parts
  { delay: 3, focus: "18,20:29", top: 465 },
  // Multiple files
  { delay: 3, focus: "35:53", top: 1006 },
  // Annotations
  { delay: 3, focus: "57:68", top: 1530 },
  // More annotations
  { delay: 3, focus: "72:85", top: 1988 },
  // Custom Annotations
  { delay: 3, focus: "91:108", top: 2443 },
  // Code links
  { delay: 3, focus: "114:129", top: 2940 },
  // Spotlight:
  { delay: 3, focus: "135:147", top: 3440 },
  { delay: 3, focus: "147:155", top: 3440 },
  { delay: 3, focus: "155:170", top: 3440 },
  { delay: 3, focus: "170:188", top: 3440 },
  // Scrollycoding;
  { delay: 3, focus: "204:208,212:224", top: 4029 },
  { delay: 3, focus: "224:226,230:244", top: 4341 },
  { delay: 3, focus: "244:246,250:254", top: 4577 },
  { delay: 3, focus: "254:256,260:276", top: 4923 },
];

let t = -0.25;
const focuses = steps.map(({ delay, focus }) => [focus, (t = t + delay)]);
