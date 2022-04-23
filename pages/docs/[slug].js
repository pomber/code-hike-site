import { Collapsable } from "../../src/collapsable";
import { Frameworks } from "../../src/frameworks";

import React, { useMemo } from "react";
import { BUNDLED_LANGUAGES } from "shiki";
import { DocsLayout, sidebar } from "../../src/docs-layout";
import { mdxToCode } from "../../src/docs-mdx";
import { getMDXComponent } from "mdx-bundler/client";

export async function getStaticPaths() {
  return {
    paths: sidebar
      .filter(([title, slug]) => !slug.startsWith("installation"))
      .map(([title, slug]) => ({
        params: { slug, title },
      })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const filename = context.params.slug || "introduction";
  const title = sidebar.find(([, item]) => item === filename)[0];
  const code = await mdxToCode(filename);

  return {
    props: {
      previewSource: code,
      slug: filename,
      title: title || null,
    },
  };
}

export default function Page({ slug, previewSource, title }) {
  return (
    <DocsLayout title={title} slug={slug}>
      <MDXComponent
        code={previewSource}
        components={{
          LanguageList,
          LangCount,
          SideBySide,
          Collapsable,
          Frameworks,
        }}
      />
    </DocsLayout>
  );
}

function MDXComponent({ code, components }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return Component({ components });
}

function LangCount() {
  return BUNDLED_LANGUAGES.length;
}

function LanguageList() {
  const languages = BUNDLED_LANGUAGES.map(({ id }) => id);
  const lastLanguage = languages[languages.length - 1];
  const headLanguages = languages.slice(0, languages.length - 1);

  return (
    <p className="text-justify">
      Code Hike handles syntax highlighting for{" "}
      <strong>{BUNDLED_LANGUAGES.length} languages</strong>:{" "}
      {headLanguages.map((id) => (
        <React.Fragment key={id}>
          <span className="font-mono bg-gray-200 rounded px-1 py-0.5">
            {id}
          </span>
          {", "}
        </React.Fragment>
      ))}
      {"and "}
      <span
        key={lastLanguage}
        className="font-mono bg-gray-200 rounded px-1 py-0.5"
      >
        {lastLanguage}
      </span>
      .
    </p>
  );
}

function SideBySide({ children }) {
  // split children into two lists
  const [left, right] = React.Children.toArray(children);
  return (
    <div className="flex flex-row gap-10 ch-cols">
      <div className="flex-1 min-w-0">{left}</div>
      <div className="flex-1 min-w-0">{right}</div>
    </div>
  );
}
