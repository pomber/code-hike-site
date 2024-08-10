import { remarkCodeHike } from "@code-hike/mdx";
import theme from "./src/ch-theme.mjs";
import * as v1 from "codehike/mdx";

export const experimental = { esmExternals: true };

const chConfig = {
  syntaxHighlighting: { theme },
  components: { code: "MyCode" },
  // ignoreCode: ({ meta }) => !meta.startsWith("use-v1"),
};

export function webpack(config, options) {
  config.module.rules.push({
    test: /\.mdx?$/,
    use: [
      // The default `babel-loader` used by Next:
      options.defaultLoaders.babel,
      {
        loader: "@mdx-js/loader",
        /** @type {import('@mdx-js/loader').Options} */
        options: {
          remarkPlugins: [
            [v1.remarkCodeHike, chConfig],
            [remarkCodeHike, { theme }],
          ],
          recmaPlugins: [[v1.recmaCodeHike, chConfig]],
        },
      },
    ],
  });
  return config;
}

export async function redirects() {
  return [
    {
      source: "/docs",
      destination: "/docs/introduction",
      permanent: true,
    },
    {
      source: "/docs/installation",
      destination: "/docs/installation/nextjs",
      permanent: true,
    },
  ];
}
