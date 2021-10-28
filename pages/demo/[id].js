import Head from "next/head";
import { CodeHikeLogo } from "../../src/logo";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import { IdProvider } from "@radix-ui/react-id";
import { DemoGrid } from "../../src/demo-grid";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps() {
  const mdxSource = mdx;
  const shiki = await import("shiki");
  const highlighter = await shiki.getHighlighter({
    theme: "nord",
  });

  const sourceHtml = highlighter.codeToHtml(mdxSource, "markdown");

  return {
    props: {
      sourceHtml,
    },
  };
}

const bg = "#2e3440ff";

export default function Home({ sourceHtml }) {
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
              <p>
                <strong>Pellentesque habitant morbi tristique</strong> senectus
                et netus et malesuada fames ac turpis egestas. Vestibulum tortor
                quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
                Donec eu libero sit amet quam egestas semper.{" "}
                <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend
                leo. Quisque sit amet est et sapien ullamcorper pharetra.
                Vestibulum erat wisi, condimentum sed,{" "}
                <code>commodo vitae</code>, ornare sit amet, wisi. Aenean
                fermentum, elit eget tincidunt condimentum, eros ipsum rutrum
                orci, sagittis tempus lacus enim ac dui.{" "}
                <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut
                felis.
              </p>

              <h2>Header Level 2</h2>

              <ol>
                <li>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
              </ol>

              <blockquote>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus magna. Cras in mi at felis aliquet congue. Ut a est
                  eget ligula molestie gravida. Curabitur massa. Donec eleifend,
                  libero at sagittis mollis, tellus est malesuada tellus, at
                  luctus turpis elit sit amet quam. Vivamus pretium ornare est.
                </p>
              </blockquote>

              <h3>Header Level 3</h3>

              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
              </ul>
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

const mdx = `import { CH } from "@code-hike/mdx"

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

<CH.Scrollycoding>

## Step 1

Lorem ipsum dolor sit amet, consectetur adipiscing something about points, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.

Venenatis cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae.

Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.

~~~jsx App.jsx
import { BasisCurve } from "react-svg-curve"

const points = [
  [10, 90],
  [70, 10],
  [130, 80],
  [190, 20],
]

export default function App() {
  return (
    <svg width="360" height="180" viewBox="0 0 200 100">
      <BasisCurve data={points} />
    </svg>
  )
}
~~~

---

## Step 2

Venenatis cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae.

Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.

~~~jsx App.jsx
import { BasisCurve, NaturalCurve } from "react-svg-curve"

const points = [
  [10, 90],
  [70, 10],
  [130, 80],
  [190, 20],
]

export default function App() {
  return (
    <svg width="360" height="180" viewBox="0 0 200 100">
      <NaturalCurve data={points} />
    </svg>
  )
}
~~~

---

## Step 3

Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in.

~~~jsx App.jsx

~~~

---

## Step 4

Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.

~~~jsx App.jsx
import { NaturalCurve } from "react-svg-curve"

const points = [
  [10, 90],
  [70, 10],
  [130, 80],
  [190, 20],
]

export default function App() {
  return (
    <svg width="360" height="180" viewBox="0 0 200 100">
      <NaturalCurve
        data={points}
        showPoints={false}
        strokeWidth={10}
        strokeDasharray="6"
      />
    </svg>
  )
}
~~~

</CH.Scrollycoding>

Lorem ipsum dolor sit amet, consectetur adipiscing something about points, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.

Venenatis cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae.

Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.
`;

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
