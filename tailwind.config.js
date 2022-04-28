module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "#374151",
            },
            "a:hover": {
              color: "rgb(37 99 235)",
            },
            "code::before": false,
            "code::after": false,
            code: {
              "font-weight": "unset",
            },
            "blockquote p:first-of-type::before": false,
            "blockquote p:first-of-type::after": false,
            blockquote: { "font-weight": "unset" },
          },
        },
      },
    },
    screens: {
      md: "830px",
      "2cols": "982px",
      "3cols": "1255px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
