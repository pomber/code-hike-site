import { Collapsable } from "../../../src/collapsable";
import { Frameworks } from "../../../src/frameworks";

import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";

import { DocsLayout } from "../../../src/docs-layout";
import { mdxToCode } from "../../../src/docs-mdx";

// prettier-ignore
const options = [
  { id: "nextjs", name: "Next.js", logo: "nextjs", cardId: 'nextjs', title: "How to use Code Hike with Next.js" },
  { id: "docusaurus", name: "Docusaurus", logo: "docusaurus" },
  { id: "nextra", name: "Nextra", logo: "nextjs" },
  { id: "remix", name: "Remix", logo: "remix" },
  { id: "vite", name: "Vite", logo: "vite" },
  { id: "contentlayer", name: "Next.js + Contentlayer", logo: "contentlayer" },
  { id: "docspage", name: "docs.page", logo: "github" },
  { id: "next-mdx-bundler", name: "Next.js + mdx-bundler", logo: "mdx-bundler" },
  { id: "next-mdx-remote", name: "Next.js + next-mdx-remote", logo: "nextjs" },
];

// prettier-ignore
const soon = [
  { id: "gatsby", name: "Gatsby", logo: "gatsby" },
  { id: "astro", name: "Astro", logo: "astro" },
  { id: "parcel", name: "Parcel", logo: 'parcel' },
  // { id: "webpack", name: "Webpack", logo: "webpack" },
  { id: "cra", name: "Create React App", logo: "cra" },
  { id: "eleventy", name: "Eleventy", logo: "11ty" },
  // { id: "motif", name: "Motif", logo: "motif" },
];

const allOptions = [...options, ...soon];

export async function getStaticPaths() {
  return {
    paths: allOptions.map(({ id }) => ({
      params: { fwk: id },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const filename = "installation";
  const fwk = context.params.fwk;

  const introCode = await mdxToCode(filename);
  const fwkCode = await mdxToCode("installation-" + fwk);

  return {
    props: {
      introCode,
      fwkCode,
      slug: filename,
      title: "Installation",
      fwk,
    },
  };
}

export default function Page({ slug, introCode, title, fwkCode, fwk }) {
  const option = useMemo(() => allOptions.find(({ id }) => id === fwk), [fwk]);
  return (
    <DocsLayout
      h1={title}
      title={option.title || title + " - Code Hike Docs"}
      description={option.description || ""}
      slug={slug}
      cardId={option.cardId}
    >
      <MDXComponent code={introCode} components={{ Collapsable }} />
      <Frameworks loadId={fwk} />
      <div className="frameworks">
        <MDXComponent code={fwkCode} components={{ SideBySide }} />
      </div>
    </DocsLayout>
  );
}

function MDXComponent({ code, components }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return Component({ components });
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
