import Head from "next/head";

const baseUrl = `https://${
  process.env.NEXT_PUBLIC_VERCEL_URL || "codehike.org"
}`;

export function SEO({
  children,
  cardId = "card",
  title = "Code Hike",
  description = "Marvellous code walkthroughs",
}) {
  return (
    <Head>
      <title>{title}</title>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta property="og:image" content={`${baseUrl}/cards/${cardId}.png`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@codehike_" />
      {children}
    </Head>
  );
}
