import Head from "next/head";
import { CodeHikeLogo } from "../../src/logo";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import { IdProvider } from "@radix-ui/react-id";
import { DemoGrid } from "../../src/demo-grid";
import demos from "../../data/demos/index.json";
import fs from "fs";
import { remarkCodeHike } from "@code-hike/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";

export async function getStaticPaths() {
  return {
    paths: demos.map((demo) => ({ params: { id: demo.id } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  // const demo = demos.find((demo) => demo.id === id);
  const mdxSource = await fs.promises.readFile(
    `./data/demos/${id}.mdx`,
    "utf8"
  );

  const shiki = await import("shiki");
  const highlighter = await shiki.getHighlighter({
    theme: "nord",
  });

  const sourceHtml = highlighter.codeToHtml(mdxSource, "markdown");

  const theme = "material-palenight";
  const loadedTheme = await import(`shiki/themes/${theme}.json`).then(
    (module) => module.default
  );

  const previewSource = await bundleMDX(mdxSource, {
    esbuildOptions(options) {
      options.platform = "node";
      return options;
    },
    xdmOptions(options) {
      options.remarkPlugins = [[remarkCodeHike, { theme: loadedTheme }]];
      return options;
    },
  });

  return {
    props: {
      sourceHtml,
      previewSource: previewSource.code,
    },
  };
}

const bg = "#2e3440ff";

function MDXComponent({ code }) {
  const Component = React.useMemo(
    () => getMDXComponent(code, { react: React }),
    [code]
  );
  return <Component />;
}

export default function Home({ sourceHtml, previewSource }) {
  return (
    <IdProvider>
      <div className="flex flex-col min-h-screen">
        <Head>
          <title>Code Hike Demos</title>
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
          <link
            href="https://unpkg.com/placeholdifier/placeholdifier.css"
            rel="stylesheet"
          />
        </Head>
        <nav className="flex w-full h-12 items-center gap-4 text-gray-200 bg-black">
          <Link href="/">
            <a className="flex items-center gap-2 ml-4 mr-2">
              <CodeHikeLogo className="block h-7 w-7 text-blue-400" />
              <h1 className="text-2xl font-bold">Code Hike</h1>
            </a>
          </Link>
          <div
            className="text-white h-10 p-4 pt-1 self-end rounded-tl-md rounded-tr-md"
            style={{ background: bg }}
          >
            demo.mdx
          </div>
          <div>styles.css</div>

          <div className="ml-auto">Theme</div>
          <Demos className="pr-4 relative" />
        </nav>
        <main className="flex-1 flex" style={{ background: bg }}>
          <Source sourceHtml={sourceHtml} />
          <div
            className="w-96 self-start m-4 mt-0"
            style={{ width: 900, minWidth: 900 }}
          >
            <div className="flex py-4 text-xl items-center justify-center text-gray-300 gap-1">
              <div className="mr-2">This demo is sponsored by</div>
              {sponsors.slice(0, 5).map((sponsor) => (
                <img
                  className="rounded-full h-12 w-12 bg-gray-300 filter grayscale hover:filter-none"
                  alt={sponsor.name}
                  title={sponsor.name}
                  src={sponsor.avatarUrl}
                  key={sponsor.avatarUrl}
                />
              ))}
            </div>
            <div className="unreset bg-white rounded p-8">
              <MDXComponent code={previewSource} />
            </div>
          </div>
        </main>
      </div>
    </IdProvider>
  );
}

function Demos(props) {
  const router = useRouter();

  // React.useEffect(() => {
  //   router.events.on("routeChangeStart", closeMenu);
  //   return () => {
  //     router.events.off("routeChangeStart", closeMenu);
  //   };
  // }, []);
  return (
    <div {...props} key={router.asPath}>
      <Dialog.Root>
        <Dialog.Trigger>Examples</Dialog.Trigger>
        <Dialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="p-4 bg-white fixed right-16 top-16 rounded">
          <Dialog.Description className="max-w-2xl">
            <DemoGrid />
          </Dialog.Description>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

function Source({ sourceHtml, locked }) {
  return (
    <div
      className={`flex-1 p-4 mr-auto relative source`}
      style={{ maxWidth: 800, minWidth: 400 }}
    >
      <div
        className={locked ? "placeholdify opacity-30" : ""}
        dangerouslySetInnerHTML={{ __html: sourceHtml }}
      ></div>
      {locked && (
        <div className="absolute inset-0">
          <div className="p-16 mx-auto bg-gray-100 w-96 rounded-lg top-48 sticky">
            <h2>Locked</h2>
            Lorem ipsum something
          </div>
        </div>
      )}
    </div>
  );
}

const sponsors = [
  {
    name: "Facebook Open Source",
    login: "facebook",
    avatarUrl:
      "https://images.opencollective.com/fbopensource/fbb8a5b/logo/256.png",
    location: "Menlo Park, California",
    url: "https://github.com/facebook",
  },
  {
    name: "Fran Méndez",
    login: "fmvilas",
    avatarUrl: "https://avatars.githubusercontent.com/u/242119?s=128&v=4",
    location: "Spain",
    url: "https://github.com/fmvilas",
  },
  {
    name: "Matthias Zepper",
    login: "MatthiasZepper",
    avatarUrl: "https://avatars.githubusercontent.com/u/6963520?s=128&v=4",
    location: "Germany",
    url: "https://github.com/matthiaszepper",
  },
  {
    name: "Cassie Evans",
    login: "cassieevans",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/19754257?s=128&u=be0fd55595fcc0d9a096effd841ea167854a97f5&v=4",
    location: "Brighton",
    url: "https://github.com/cassieevans",
  },
  {
    name: "Jonathan Carter",
    login: "lostintangent",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/116461?s=128&u=696403c7f1d14b3bb4d4d4dcbb1b92942ddae8ae&v=4",
    location: "Seattle, WA",
    url: "https://github.com/lostintangent",
  },
  {
    name: "Varun Vachhar",
    login: "winkerVSbecks",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/42671?s=128&u=38b604be6c441cb725f29813ca983a7a2f8ccee0&v=4",
    location: "Toronto",
    url: "https://github.com/winkerVSbecks",
  },
  {
    name: "Nicolas Berger",
    login: "nberger",
    avatarUrl: "https://avatars.githubusercontent.com/u/81371?s=128&v=4",
    location: "Bay Area, CA",
    url: "https://github.com/nberger",
  },
  {
    name: "Davo Galavotti",
    login: "davo",
    avatarUrl: "https://avatars.githubusercontent.com/u/76307?s=128&v=4",
    location: "New York, NY",
    url: "https://github.com/davo",
  },
  {
    name: "Bobby Dresser",
    login: "bdresser",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/1016190?s=128&u=d88c979c3dad16b9b0f604b0da60169b12cf7c34&v=4",
    location: "United States",
    url: "https://github.com/bdresser",
  },
  {
    name: "Josep M Sobrepere",
    login: "josepot",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/8620144?s=128&u=e2a5b7f00c32b723d88ae344ce0aad619d7d6753&v=4",
    location: "Barcelona",
    url: "https://github.com/josepot",
  },
  {
    avatarUrl: "https://avatars.githubusercontent.com/u/59406945?s=128&v=4",
    login: "uidotdev",
    name: "ui.dev",
    location: null,
    url: "https://github.com/uidotdev",
  },
  {
    avatarUrl: "https://avatars.githubusercontent.com/u/58904235?s=128&v=4",
    login: "codecrafters-io",
    name: "CodeCrafters",
    location: "United Kingdom",
    url: "https://github.com/codecrafters-io",
  },
];
