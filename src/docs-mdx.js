import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import { remarkCodeHike } from "@code-hike/mdx";
import theme from "./ch-theme";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import * as v1 from "codehike/mdx";
import { jsx, toJs } from "estree-util-to-js";

const chConfig = {
  syntaxHighlighting: { theme },
  components: { code: "MyCode" },
  ignoreCode: ({ meta }) => {
    console.log("meta", meta);
    return !meta.startsWith("use-v1");
  },
};

const ignoreProperties = ["start", "end", "position", "loc", "range"];
const logger = () => (tree) => {
  // console.log("```json");
  // console.log(
  //   JSON.stringify(
  //     tree,
  //     (key, value) => (ignoreProperties.includes(key) ? undefined : value),

  //     2
  //   )
  // );
  // console.log("```");

  const result = toJs(tree, { handlers: jsx });
  console.log("```jsx");
  console.log(result.value);
  console.log("```");
};

export async function mdxToCode(filename, config = {}) {
  const mdxSource = await fs.promises.readFile(
    `./docs/${filename}.mdx`,
    "utf8"
  );

  try {
    const { code } = await bundleMDX(mdxSource, {
      esbuildOptions(options) {
        options.platform = "node";
        options.minify = false;
        options.target = "ESNEXT";
        return options;
      },
      xdmOptions(options) {
        options.jsx = true;
        options.rehypePlugins = [
          rehypeSlug,
          rehypeAutolinkHeadings,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: ["anchor"],
              },
            },
          ],
        ];
        options.remarkPlugins = [
          [v1.remarkCodeHike, chConfig],
          [remarkCodeHike, { theme, ...config }],
        ];
        options.recmaPlugins = [
          [logger, {}],
          [v1.recmaCodeHike, chConfig],
        ];
        return options;
      },
    });

    console.log("```jsx");
    console.log(code);
    console.log("```");
    return code;
  } catch (error) {
    console.error("catch", error);
    throw error;
  }
}
