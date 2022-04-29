import React, { useMemo } from "react";
import { DocsLayout, sidebar } from "../../src/docs-layout";
import { mdxToCode } from "../../src/docs-mdx";
import { getMDXComponent } from "mdx-bundler/client";

import { BUNDLED_THEMES } from "shiki";

export async function getStaticProps() {
  const filename = "configuration";
  const title = sidebar.find(([, item]) => item === filename)[0];
  const code = await mdxToCode(filename);
  const lineNumbersCode = await mdxToCode("configuration/line-numbers", {
    lineNumbers: true,
  });

  const promises = BUNDLED_THEMES.filter((x) => x !== "css-variables").map(
    async (themeName) => {
      const theme = (await import(`shiki/themes/${themeName}.json`)).default;
      const code = await mdxToCode("configuration/theme", {
        theme,
        lineNumbers: true,
      });
      return { themeName, code };
    }
  );

  const themeCodes = await Promise.all(promises);

  return {
    props: {
      previewSource: code,
      slug: filename,
      title: title || null,
      lineNumbersCode,
      themeCodes,
    },
  };
}

function getCodeSection(themeCodes) {
  const children = themeCodes.map(({ code, themeName }, i) => {
    const Component = getMDXComponent(code);
    return (
      <div key={i}>
        <h3>{themeName}</h3>
        {Component()}
      </div>
    );
  });

  return () => <div className="configuration-themes">{children}</div>;
}

export default function Page({
  slug,
  previewSource,
  title,
  lineNumbersCode,
  themeCodes,
}) {
  const LineNumbersSection = useMemo(
    () => getMDXComponent(lineNumbersCode),
    [lineNumbersCode]
  );

  const CodeSection = getCodeSection(themeCodes);

  return (
    <DocsLayout h1={title} title={title + " - Code Hike Docs"} slug={slug}>
      <MDXComponent
        code={previewSource}
        components={{
          LineNumbersSection,
          CodeSection,
        }}
      />
    </DocsLayout>
  );
}

function MDXComponent({ code, components }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return Component({ components });
}
