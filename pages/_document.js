import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            property="og:image"
            content="https://code-hike.vercel.app/card.png"
          />
          <meta property="og:title" content="Code Hike" />
          <meta
            property="og:description"
            content="Marvellous code walkthroughs"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@codehike_" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
