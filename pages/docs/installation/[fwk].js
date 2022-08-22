import { Collapsable } from "../../../src/collapsable";
import { Frameworks } from "../../../src/frameworks";

import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";

import { DocsLayout } from "../../../src/docs-layout";
import { mdxToCode } from "../../../src/docs-mdx";

const all = [
  {
    id: "nextjs", // should match mdx file and logo
    name: "Next.js", // used in the dropdown menu text
    cardId: "nextjs", // if it has a custom card inside /public/cards/{cardId}.png
    title: "How to use Code Hike with Next.js", // used in the SEO title
    description:
      "Use Code Hike syntax highlighting and components in your Next.js pages", // used in the SEO description
  },
  {
    id: "docusaurus",
    name: "Docusaurus",
    cardId: "docusaurus",
    title: "How to use Code Hike with Docusaurus",
    description:
      "Add Code Hike syntax highlighting and components in your Docusaurus mdx",
  },
  {
    id: "contentlayer",
    name: "Next.js + Contentlayer",
    cardId: "contentlayer",
    title: "How to use Code Hike with Contentlayer",
    description:
      "Use Code Hike syntax highlighting and components with Contentlayer",
  },
  {
    id: "gatsby",
    name: "Gatsby",
    cardId: "gatsby",
    title: "How to use Code Hike with Gatsby",
    description: "Use Code Hike syntax highlighting and components in Gatsby",
  },
  {
    id: "nextra",
    name: "Nextra",
  },
  {
    id: "remix",
    name: "Remix",
  },
  {
    id: "vite",
    name: "Vite",
  },
  {
    id: "docspage",
    name: "docs.page",
  },
  {
    id: "mdx-bundler",
    name: "Next.js + MDX Bundler",
  },
  {
    id: "next-mdx-remote",
    name: "Next MDX Remote",
  },
  {
    id: "astro",
    name: "Astro",
    soon: true,
  },
  {
    id: "parcel",
    name: "Parcel",
    soon: true,
  },
  {
    id: "cra",
    name: "Create React App",
    soon: true,
  },
  {
    id: "eleventy",
    name: "Eleventy",
    soon: true,
  },
  // {
  //   id: 'motif',
  //   name: 'Motif',
  //   soon: true,
  // },
];

export async function getStaticPaths() {
  return {
    paths: all.map(({ id }) => ({
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
  const option = useMemo(() => all.find(({ id }) => id === fwk), [fwk]);
  return (
    <DocsLayout
      h1={title}
      title={option.title || title + " - Code Hike Docs"}
      description={option.description || ""}
      slug={slug}
      cardId={option.cardId}
    >
      <MDXComponent code={introCode} components={{ Collapsable }} />
      <Frameworks loadId={fwk} options={all} />
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
