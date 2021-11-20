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
import sponsorsData from "../../data/sponsors.json";
import * as HoverCard from "@radix-ui/react-hover-card";
import { signIn, useSession } from "next-auth/react";

export async function getStaticPaths() {
  return {
    paths: demos.map((demo) => ({ params: { id: demo.id } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  async function getFiles(demo) {
    let filenames = [];
    try {
      filenames = await fs.promises.readdir(`./data/demos/${demo}/`);
    } catch (e) {
      return undefined;
    }

    const files = {};
    for (const filename of filenames) {
      files[filename] = await fs.promises.readFile(
        `./data/demos/${demo}/${filename}`,
        "utf8"
      );
    }

    return files;
  }

  const { id } = context.params;
  const demo = demos.find((demo) => demo.id === id);
  const files = await getFiles(demo.id);
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
    files,
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
      demo,
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

export default function Home({ sourceHtml, previewSource, demo }) {
  const locked = demo.sponsors.length < 5;

  return (
    <IdProvider>
      <div className="flex flex-col min-h-screen">
        <Head>
          <title>{demo.title} - Code Hike</title>
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
        <nav className="flex w-full h-14 items-center gap-4 text-gray-200 bg-black">
          <Link href="/">
            <a className="flex items-center gap-2 ml-4 mr-2">
              <CodeHikeLogo className="block h-7 w-7 text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-100">Code Hike</h1>
            </a>
          </Link>
          <div
            className="text-white h-12 p-4 pt-2 self-end rounded-tl-md rounded-tr-md"
            style={{ background: bg }}
          >
            demo.mdx
          </div>
          <div>styles.css</div>

          <div className="ml-auto">Theme</div>
          <Demos className="pr-4 relative" />
        </nav>
        <main className="flex-1 flex" style={{ background: bg }}>
          <Source sourceHtml={sourceHtml} locked={locked} />
          <div
            className="w-96 self-start m-4"
            style={{ width: 900, minWidth: 900 }}
          >
            <div className="unreset bg-white rounded p-8 pt-20 relative">
              <Sponsors demo={demo} />
              <MDXComponent code={previewSource} />
            </div>
          </div>
        </main>
      </div>
    </IdProvider>
  );
}

function Sponsors({ demo }) {
  const sponsors = demo.sponsors.map((login) =>
    sponsorsData.sponsors.find((s) => s.login === login)
  );
  const placeholders = Array(5 - demo.sponsors.length).fill(null);
  return sponsors.length > 0 ? (
    <div className="absolute right-8 top-8 flex flex-col text-xl items-center justify-center gap-1">
      <div className="">This demo is sponsored by</div>
      <div className="flex items-center justify-center gap-1">
        {sponsors.map((sponsor) => (
          <div key={sponsor.avatarUrl}>
            <HoverCard.Root openDelay={300}>
              <HoverCard.Trigger asChild>
                <a target="_blank" rel="noopener noreferrer" href={sponsor.url}>
                  <img
                    className="rounded-full h-12 w-12 bg-gray-300 cursor-pointer"
                    alt={sponsor.name}
                    src={sponsor.avatarUrl}
                  />
                </a>
              </HoverCard.Trigger>
              <HoverCard.Content
                className="border border-gray-400 rounded w-72 flex p-4 bg-white shadow-lg"
                sideOffset={8}
              >
                <img
                  src={sponsor.avatarUrl}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex flex-col pl-2 min-w-0">
                  <h4 className="truncate font-bold" title={sponsor.name}>
                    {sponsor.name}
                  </h4>
                  <span className="text-sm text-gray-500 truncate">
                    {sponsor.login}
                  </span>
                  <span className="text-sm text-gray-500 truncate">
                    {sponsor.location}
                  </span>
                </div>
              </HoverCard.Content>
            </HoverCard.Root>
          </div>
        ))}
        {placeholders.map((_, i) => (
          <div className="rounded-full h-12 w-12 bg-gray-200" key={i} />
        ))}
      </div>
    </div>
  ) : null;
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
        <Dialog.Trigger>
          Demos{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Dialog.Trigger>
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
  const hasAccess = useUnlock(locked);
  const isLoading = useIsLoadingOrSSR();

  const className = isLoading
    ? "opacity-0"
    : hasAccess
    ? "opacity-100"
    : "placeholdify opacity-30";

  return (
    <div
      className={`flex-1 p-4 mr-auto relative source`}
      style={{ maxWidth: 800, minWidth: 400 }}
    >
      <div
        className={`transition-opacity duration-300 ${className}`}
        dangerouslySetInnerHTML={{ __html: sourceHtml }}
      />
      {!isLoading && !hasAccess ? <LockedCard /> : null}
    </div>
  );
}
function LockedCard() {
  return (
    <div className="absolute inset-0">
      <div className="p-12 mx-auto bg-gray-100 w-96 rounded-lg top-48 sticky">
        <h2 className="text-center text-lg font-bold mb-6">Locked Demo</h2>
        <p className="my-4">
          The code of this demo is hidden until it reaches five sponsors.
        </p>
        <hr />
        <p className="my-4">
          Become a sponsor to have full acces to all demos:
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block border p-2 text-center w-52 mt-3 rounded border-gray-800 hover:border-blue-600 mx-auto"
            href="https://github.com/sponsors/code-hike"
          >
            Sponsor Code Hike
          </a>
        </p>
        <hr />
        <p className="my-4">
          Or, if you already are a sponsor:{" "}
          <button
            className="block border p-2 text-center w-52 mt-3 rounded border-gray-800 hover:border-blue-600 mx-auto"
            onClick={() => signIn("github", { redirect: false })}
          >
            Log in with GitHub
          </button>
        </p>
      </div>
    </div>
  );
}

function useUnlock(locked) {
  const session = useSession();
  // console.log({ session });
  if (!locked) return true;
  if (session.status != "authenticated") {
    return false;
  }
  const { user } = session.data;
  const login = user.name;
  const allAccess = [...sponsorsData.sponsors, ...sponsorsData.access];
  // user has access
  if (allAccess.some((s) => s.login === login)) {
    return true;
  }

  // org has access
  const userOrgs = session.data.orgs || [];
  if (allAccess.some((s) => s.isOrg && userOrgs.includes(s.login))) {
    return true;
  }

  return false;
}

function useIsLoadingOrSSR() {
  const session = useSession();
  return session.status === "loading";
}
