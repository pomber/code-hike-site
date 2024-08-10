import { Collapsable } from "../../src/collapsable";

import React, { useMemo } from "react";
import { LANG_NAMES } from "@code-hike/lighter";
import { DocsLayout, sidebar } from "../../src/docs-layout";
import { mdxToCode } from "../../src/docs-mdx";
import { getMDXComponent } from "mdx-bundler/client";

export async function getStaticPaths() {
  return {
    paths: sidebar
      .filter(
        ([title, slug]) =>
          !slug.startsWith("installation") &&
          !slug.startsWith("configuration") &&
          !slug.startsWith("themes")
      )
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
    <DocsLayout h1={title} title={title + " - Code Hike Docs"} slug={slug}>
      <MDXComponent
        code={previewSource}
        components={{
          LanguageList,
          LangCount,
          SideBySide,
          Collapsable,
          MyCode,
        }}
      />
    </DocsLayout>
  );
}

function MyCode(props) {
  return <pre>hey</pre>;
}

function MDXComponent({ code, components }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return Component({ components });
}

function LangCount() {
  return LANG_NAMES.length;
}

function LanguageList() {
  const languages = LANG_NAMES;
  const lastLanguage = languages[languages.length - 1];
  const headLanguages = languages.slice(0, languages.length - 1);

  return (
    <p className="text-justify">
      Code Hike handles syntax highlighting for{" "}
      <strong>{LANG_NAMES.length} languages</strong>:{" "}
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
