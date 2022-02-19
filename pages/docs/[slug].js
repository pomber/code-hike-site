import Head from "next/head";
import Link from "next/link";
import { IdProvider } from "@radix-ui/react-id";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  CodeHikeLogo,
  GitHubLink,
  MenuIcon,
  TwitterLink,
} from "../../src/logo";
import theme from "../../src/ch-theme";

import fs from "fs";
import { remarkCodeHike } from "@code-hike/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import React, { useMemo } from "react";
import { BUNDLED_LANGUAGES } from "shiki";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";

const section = [
  ["Introduction", "introduction"],
  ["Installation", "installation"],
  ["Code Blocks", "codeblocks"],
  ["Annotations", "annotations"],
  ["<CH.Code>", "ch-code"],
  ["<CH.Section>", "ch-section"],
  ["<CH.Scrollycoding>", "ch-scrollycoding"],
  ["<CH.Spotlight>", "ch-spotlight"],
  ["<CH.Slideshow>", "ch-slideshow"],
  // ["Roadmap", "roadmap"],
  // ["Changelog", "changelog"],
  ["Styling", "styling"],
  ["Troubleshooting", "troubleshooting"],
];

export async function getStaticPaths() {
  return {
    paths: section.map(([title, slug]) => ({
      params: { slug, title },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const filename = context.params.slug || "introduction";
  const title = section.find(([, item]) => item === filename)[0];
  const mdxSource = await fs.promises.readFile(
    `./docs/${filename}.mdx`,
    "utf8"
  );

  const previewSource = await bundleMDX(mdxSource, {
    esbuildOptions(options) {
      options.platform = "node";
      return options;
    },
    xdmOptions(options) {
      options.rehypePlugins = [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ];
      options.remarkPlugins = [[remarkCodeHike, { theme }]];
      return options;
    },
  });

  return {
    props: {
      previewSource: previewSource.code,
      slug: filename,
      title: title || null,
    },
  };
}

export default function Page({ slug, previewSource, title }) {
  return (
    <div className="docs" style={{ minWidth: "80ch" }}>
      <Head>
        <title>{title} - Code Hike Docs</title>
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
      </Head>
      <IdProvider>
        <div className="sticky top-0 z-10">
          <nav className="max-w-7xl mx-auto h-16 flex items-center gap-4 text-gray-800 bg-white 3cols:bg-transparent border-b  border-gray-100 3cols:border-b-0">
            <MobileMenu current={slug} />
            <Link href="/">
              <a className="flex items-center gap-2 mr-auto 2cols:ml-6">
                <CodeHikeLogo className="block h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold">Code Hike</h1>
              </a>
            </Link>

            <input placeholder="Search" className="w-40" />
            <TwitterLink className="hover:text-gray-500 transition-colors duration-200" />
            <GitHubLink className="hover:text-gray-500 transition-colors duration-200 mr-4" />
          </nav>
        </div>
        <div className="max-w-7xl mx-auto flex isolate">
          <aside className="w-64 sticky top-16 self-start shrink-0 hidden 2cols:block">
            <Sidebar current={slug} />
          </aside>
          <aside className="w-64 top-16 shrink-0 hidden 3cols:block order-last"></aside>
          <article className="min-w-0 flex-1 3cols:-mt-16">
            <main
              className="mx-auto px-8 pt-4 prose pb-24"
              style={{ width: "80ch", maxWidth: "80ch" }}
            >
              <h1 className="text-2xl mt-0 mb-9 text-gray-800">{title}</h1>
              <MDXComponent code={previewSource} />
            </main>
          </article>
        </div>
      </IdProvider>
    </div>
  );
}

function MDXComponent({ code }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <Component
      components={{ LanguageList, LangCount, SideBySide, Collapsable }}
    />
  );
}

function Collapsable({ children, openText = "Show", closeText = "Hide" }) {
  const [isOpen, setOpen] = React.useState(false);
  const [header, ...content] = React.Children.toArray(children);
  return (
    <Collapsible.Root onOpenChange={(open) => setOpen(open)}>
      <div className="flex mt-4">
        <div className="flex-1">{header?.props?.children}</div>
        <Collapsible.Trigger>
          {isOpen ? closeText : openText}
          <ChevronDownIcon
            aria-hidden
            className="inline-block ml-2"
            style={{
              transition: "transform 300ms",
              transform: `rotate(${isOpen ? 180 : 0}deg)`,
            }}
          />
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content className="collapsable-content">
        {content}
      </Collapsible.Content>
    </Collapsible.Root>
  );
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
            <a className="block w-full select-none py-2 my-1 pl-2">{item}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MobileMenu({ current }) {
  const router = useRouter();

  return (
    <div key={router.asPath} className="2cols:hidden">
      <Dialog.Root>
        <Dialog.Trigger className="block ml-6">
          <MenuIcon />
        </Dialog.Trigger>
        <Dialog.Content className="p-4 bg-white fixed inset-0 top-16">
          <Sidebar current={current} />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
