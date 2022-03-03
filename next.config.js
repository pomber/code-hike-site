const { remarkCodeHike } = require("@code-hike/mdx");
const theme = require("./src/ch-theme");

module.exports = {
  experimental: { esmExternals: true },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        // The default `babel-loader` used by Next:
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            remarkPlugins: [[remarkCodeHike, { theme }]],
          },
        },
      ],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/introduction",
        permanent: true,
      },
    ];
  },
};
