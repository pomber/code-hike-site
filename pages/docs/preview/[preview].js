import theme from "shiki/themes/dark-plus.json";

import fs from "fs";
import { remarkCodeHike } from "@code-hike/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import React, { useMemo } from "react";

export async function getStaticPaths() {
  const filenames = await fs.promises.readdir("docs/preview");

  return {
    paths: filenames.map((filename) => ({
      params: { preview: filename.slice(0, -4) },
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
