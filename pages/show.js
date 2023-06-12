import fs from "fs";
import { remarkCodeHike } from "@code-hike/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import React from "react";
import { steps } from "../src/home-demo";

export async function getStaticProps() {
  const mdxSource = await fs.promises.readFile(`./data/demos/show.mdx`, "utf8");

  const previewSource = await bundleMDX(mdxSource, {
    esbuildOptions(options) {
      options.platform = "node";
      return options;
    },
    xdmOptions(options) {
      options.remarkPlugins = [
        [remarkCodeHike, { theme: "material-palenight" }],
      ];
      return options;
    },
  });

  return { props: { code: previewSource.code } };
}

export default function Home({ code }) {
  const Component = React.useMemo(
    () => getMDXComponent(code, { react: React }),
    [code]
  );
  return (
    <main
      style={{ width: 560, margin: "0 auto", position: "relative" }}
      className="unreset"
    >
      <style jsx global>{`
        .ch-scrollycoding-preview,
        .ch-spotlight-preview {
          height: 200px !important;
        }
        .ch-scrollycoding-sticker {
          width: 347px !important;
        }

        .ch-spotlight-tabs {
          min-width: 194px;
        }
      `}</style>
      <Component />
      <button
        id="start-button"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          background: "red",
          display: "none",
        }}
        onClick={() => {
          setTimeout(tour, 500);
        }}
      >
        Start
      </button>
    </main>
  );
}

function tour() {
  document.getElementById("start-button").style.display = "none";
  window.scrollTo({
    top: steps[0].top,
  });
  let t0 = performance.now();
  let i = 0;
  setInterval(() => {
    const currentStep = steps[i];
    const nextStep = steps[i + 1];
    if (!currentStep) return;

    const delta = (performance.now() - t0) / 1000;
    if (delta > currentStep.delay) {
      t0 += currentStep.delay * 1000;
      if (nextStep) {
        window.scrollTo({
          top: nextStep.top,
          behavior: "smooth",
        });
      } else {
        document.getElementById("start-button").style.display = "block";
      }
      i++;
    }
  }, 30);
}
