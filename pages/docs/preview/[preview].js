import theme from "shiki/themes/dark-plus.json";

import fs from "fs";
import { remarkCodeHike } from "@code-hike/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import React, { useMemo } from "react";

const previews = [
  "codeblocks-1",
  "codeblocks-2",
  "installation-1",
  "mark-1",
  "mark-2",
  "mark-3",
  "with-class",
];

export async function getStaticPaths() {
  return {
    paths: previews.map((preview) => ({
      params: { preview },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const filename = context.params.preview;
  const mdxSource = await fs.promises.readFile(
    `./docs/preview/${filename}.mdx`,
    "utf8"
  );

  const previewSource = await bundleMDX(mdxSource, {
    esbuildOptions(options) {
      options.platform = "node";
      return options;
    },
    xdmOptions(options) {
      options.remarkPlugins = [[remarkCodeHike, { theme }]];
      return options;
    },
  });

  return {
    props: {
      previewSource: previewSource.code,
    },
  };
}

export default function Page({ previewSource }) {
  return (
    <div className="prose m-4">
      <style jsx global>
        {`
          .my-colors {
            outline: 2px solid royalblue;
            background: navy !important;
          }

          .my-class {
            display: inline-block;
            border-radius: 4px;
            outline: dotted 1px;
            transition: 0.2s;
          }

          .my-class:hover {
            transform: scale(1.5) rotate(-14deg);
          }
        `}
      </style>
      <MDXComponent code={previewSource} />
    </div>
  );
}

function MDXComponent({ code }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component />;
}
