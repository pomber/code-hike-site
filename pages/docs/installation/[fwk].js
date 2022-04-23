import Link from "next/link";
import { Collapsable } from "../../../src/collapsable";
import { Frameworks } from "../../../src/frameworks";

import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";

import Astro from "../../../docs/installation-astro.mdx";
import Contentlayer from "../../../docs/installation-contentlayer.mdx";
import Cra from "../../../docs/installation-cra.mdx";
import DocsPage from "../../../docs/installation-docspage.mdx";
import Docusaurus from "../../../docs/installation-docusaurus.mdx";
import Eleventy from "../../../docs/installation-eleventy.mdx";
import Gatsby from "../../../docs/installation-gatsby.mdx";
import MdxBundler from "../../../docs/installation-next-mdx-bundler.mdx";
import MdxRemote from "../../../docs/installation-next-mdx-remote.mdx";
import NextJS from "../../../docs/installation-nextjs.mdx";
import Nextra from "../../../docs/installation-nextra.mdx";
import Parcel from "../../../docs/installation-parcel.mdx";
import Remix from "../../../docs/installation-remix.mdx";
import Vite from "../../../docs/installation-vite.mdx";
import { DocsLayout } from "../../../src/docs-layout";
import { mdxToCode } from "../../../src/docs-mdx";

// prettier-ignore
const options = [
  { id: "nextjs", name: "Next.js", component: NextJS, logo: "nextjs" },
  { id: "docusaurus", name: "Docusaurus", logo: "docusaurus", component: Docusaurus },
  { id: "nextra", name: "Nextra", logo: "nextjs", component: Nextra },
  { id: "remix", name: "Remix", logo: "remix", component: Remix },
  { id: "vite", name: "Vite", logo: "vite", component: Vite },
  { id: "contentlayer", name: "Next.js + Contentlayer", component: Contentlayer, logo: "contentlayer" },
  { id: "docspage", name: "docs.page", logo: "github", component: DocsPage },
  { id: "next-mdx-bundler", name: "Next.js + mdx-bundler", logo: "mdx-bundler", component: MdxBundler },
  { id: "next-mdx-remote", name: "Next.js + next-mdx-remote", logo: "nextjs", component: MdxRemote },
];

// prettier-ignore
const soon = [
  { id: "gatsby", name: "Gatsby", logo: "gatsby", component: Gatsby },
  { id: "astro", name: "Astro", logo: "astro", component: Astro },
  { id: "parcel", name: "Parcel", logo: 'parcel', component: Parcel },
  // { id: "webpack", name: "Webpack", logo: "webpack" },
  { id: "cra", name: "Create React App", logo: "cra", component: Cra },
  { id: "eleventy", name: "Eleventy", logo: "11ty", component: Eleventy },
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
  return (
    <DocsLayout title={title} slug={slug}>
      <MDXComponent
        code={introCode}
        components={{
          SideBySide,
          Collapsable,
        }}
      />
      <Frameworks loadId={fwk} />
      <div className="frameworks">
        <MDXComponent
          code={fwkCode}
          components={{
            SideBySide,
            Collapsable,
          }}
        />
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

function Sidebar({ current }) {
  return (
    <ul className="p-4 pl-6 text-gray-700 text-sm">
      {section.map(([item, slug]) => (
        <li
          key={item}
          className={
            "-ml-2 rounded " +
            (slug === current ? "bg-blue-100 text-black" : "hover:bg-gray-100")
          }
        >
          <Link href={`/docs/${slug}`}>
            <a className="w-full select-none py-2 my-1 px-2 flex items-center">
              <span className="flex-1">{item}</span>
              {isExperimental(slug) && <ExperimentalIcon />}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
