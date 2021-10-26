import Head from "next/head";
import { CodeHikeLogo } from "../../src/logo";
import Link from "next/link";
import React from "react";

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
    theme: "github-dark-dimmed",
  });

  const sourceHtml = highlighter.codeToHtml(mdxSource, "markdown");

  return {
    props: {
      sourceHtml,
    },
  };
}

export default function Home({ sourceHtml }) {
  const [showDemoMenu, setDemoMenu] = React.useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Code Hike Demos</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/placeholdifier/placeholdifier.css"
          rel="stylesheet"
        />
      </Head>
      <nav className="flex w-full h-12 items-center gap-4 text-gray-800">
        <Link href="/">
          <a className="flex items-center gap-2 ml-4">
            <CodeHikeLogo className="block h-7 w-7 text-blue-600" />
            <h1 className="text-2xl font-bold">Code Hike</h1>
          </a>
        </Link>
        <div
          className="text-white h-10 p-4 pt-1 self-end rounded-tl-md rounded-tr-md"
          style={{ background: "#22272e" }}
        >
          page.mdx
        </div>
        <div>styles.css</div>
        <div className="ml-auto">Theme</div>
        <button className="pr-4" onClick={() => setDemoMenu(true)}>
          Examples
        </button>
      </nav>
      <main className="flex-1 flex" style={{ background: "#22272e" }}>
        <Source sourceHtml={sourceHtml} />
        <div
          className="w-96 self-start m-4"
          style={{ width: 900, minWidth: 900 }}
        >
          <div
            className="text-2xl text-center mb-4"
            style={{ color: "#ADBAC7" }}
          >
            Result
          </div>
          <div className="unreset bg-white rounded p-8">
            <p>
              <strong>Pellentesque habitant morbi tristique</strong> senectus et
              netus et malesuada fames ac turpis egestas. Vestibulum tortor
              quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec
              eu libero sit amet quam egestas semper.{" "}
              <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend
              leo. Quisque sit amet est et sapien ullamcorper pharetra.
              Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>,
              ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt
              condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac
              dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis.
              Ut felis.
            </p>

            <h2>Header Level 2</h2>

            <ol>
              <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
              <li>Aliquam tincidunt mauris eu risus.</li>
            </ol>

            <blockquote>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
                molestie gravida. Curabitur massa. Donec eleifend, libero at
                sagittis mollis, tellus est malesuada tellus, at luctus turpis
                elit sit amet quam. Vivamus pretium ornare est.
              </p>
            </blockquote>

            <h3>Header Level 3</h3>

            <ul>
              <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
              <li>Aliquam tincidunt mauris eu risus.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

function Source({ sourceHtml, locked }) {
  return (
    <div
      className={`flex-1 p-4 min-w-0 relative source`}
      style={{ maxWidth: 800 }}
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
