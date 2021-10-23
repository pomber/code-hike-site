import "@code-hike/mdx/dist/index.css";
import "@code-hike/mini-browser/dist/index.css";
import "tailwindcss/tailwind.css";
import "../global.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
