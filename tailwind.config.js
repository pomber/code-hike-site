module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "a:hover": {
              color: "rgb(37 99 235)",
            },
            "code::before": false,
            "code::after": false,
            code: {
              "font-weight": "unset",
            },
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
