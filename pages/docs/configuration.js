import React, { useMemo } from "react";
import { DocsLayout, sidebar } from "../../src/docs-layout";
import { mdxToCode } from "../../src/docs-mdx";
import { getMDXComponent } from "mdx-bundler/client";

export async function getStaticProps() {
  const filename = "configuration";
  const title = sidebar.find(([, item]) => item === filename)[0];
  const code = await mdxToCode(filename);
  const lineNumbersCode = await mdxToCode("configuration/line-numbers", {
    lineNumbers: true,
  });

  return {
    props: {
      previewSource: code,
      slug: filename,
      title: title || null,
      lineNumbersCode,
    },
  };
}

export default function Page({ slug, previewSource, title, lineNumbersCode }) {
  const LineNumbersSection = useMemo(
    () => getMDXComponent(lineNumbersCode),
    [lineNumbersCode]
  );

  return (
    <DocsLayout h1={title} title={title + " - Code Hike Docs"} slug={slug}>
      <MDXComponent code={previewSource} components={{ LineNumbersSection }} />
    </DocsLayout>
  );
}

function MDXComponent({ code, components }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return Component({ components });
}
