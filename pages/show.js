import fs from "fs";
import { remarkCodeHike } from "@code-hike/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import React from "react";

export async function getStaticProps() {
  const mdxSource = await fs.promises.readFile(`./data/demos/show.mdx`, "utf8");

  const tooltipAnnotation = await fs.promises.readFile(
    `./data/demos/custom-annotations/MyTooltipAnnotation.jsx`,
    "utf8"
  );

  const theme = "material-palenight";
  const loadedTheme = await import(`shiki/themes/${theme}.json`).then(
    (module) => module.default
  );

  const previewSource = await bundleMDX(mdxSource, {
    files: { "MyTooltipAnnotation.jsx": tooltipAnnotation },
    esbuildOptions(options) {
      options.platform = "node";
      return options;
    },
    xdmOptions(options) {
      options.remarkPlugins = [[remarkCodeHike, { theme: loadedTheme }]];
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
    <main style={{ width: 560, margin: "0 auto" }} className="unreset">
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
    </main>
  );
}
