module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      md: "830px",
      "2cols": "982px",
      "3cols": "1255px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
