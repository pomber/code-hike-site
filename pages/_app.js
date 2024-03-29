import "@code-hike/mdx/dist/index.css";
import "tailwindcss/tailwind.css";
import "../global.css";
import "../themes.css";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Analytics />
    </SessionProvider>
  );
}
