import Head from "next/head";

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
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex w-full h-12 items-center gap-4 text-gray-700">
        <h1 className="text-2xl font-bold pl-4">Code Hike</h1>
        <div
          className="text-white h-10 p-4 pt-1 self-end rounded-tl-lg rounded-tr-lg"
          style={{ background: "#22272e" }}
        >
          page.mdx
        </div>
        <div>styles.css</div>
        <div className="ml-auto">Theme</div>
        <div className="pr-4">Examples</div>
      </nav>
      <main className="flex-1 flex" style={{ background: "#22272e" }}>
        <div
          className="flex-1 p-4 min-w-0 source"
          style={{ maxWidth: 800 }}
          dangerouslySetInnerHTML={{ __html: sourceHtml }}
        ></div>
        <div
          className="w-96 self-start m-4"
          style={{ width: 900, minWidth: 900 }}
        >
          <div className="text-2xl text-center" style={{ color: "#ADBAC7" }}>
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
