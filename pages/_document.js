import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head />
        <body>
          <div className="bg-blue-100 text-center py-1">
            We are working on{" "}
            <a
              href="https://github.com/code-hike/codehike/discussions/413"
              className="underline"
            >
              Code Hike v1.0
            </a>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
