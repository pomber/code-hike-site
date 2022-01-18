import Head from "next/head";
import Link from "next/link";
import { CodeHikeLogo, GitHubLink, TwitterLink } from "../../src/logo";

const section = [
  "Introduction",
  "Installation",
  "Codeblocks",
  "Annotations",
  "<CH.Code>",
  "<CH.Section>",
  "<CH.Scrollycoding>",
  "<CH.Spotlight>",
  "<CH.Slideshow>",
  "Roadmap",
  "Changelog",
  "Troubleshooting",
];

export default function Page() {
  return (
    <div>
      <Head>
        <title>Code Hike - Docs</title>
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
      <div className="sticky top-0">
        <nav className="max-w-7xl mx-auto h-16 flex items-center gap-4 text-gray-800 bg-white 3cols:bg-transparent">
          <Link href="/">
            <a className="flex items-center gap-2 mr-auto ml-4">
              <CodeHikeLogo className="block h-10 w-10 text-blue-600" />
              <h1 className="text-3xl font-bold">Code Hike</h1>
            </a>
          </Link>

          <input placeholder="Search" className="w-40" />
          <TwitterLink className="hover:text-gray-500 transition-colors duration-200" />
          <GitHubLink className="hover:text-gray-500 transition-colors duration-200 mr-4" />
        </nav>
      </div>
      <div className="max-w-7xl mx-auto flex">
        <aside className="w-64 sticky top-16 self-start flex-shrink-0 hidden 2cols:block">
          <Sidebar />
        </aside>
        <article className="min-w-0 flex-1">
          <main className="mx-auto px-8 pt-4" style={{ width: "80ch" }}>
            <Content />
            <Content />
            <Content />
          </main>
        </article>
        <aside className="w-64 top-16 flex-shrink-0 hidden 3cols:block"></aside>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <ul className="p-4">
      {section.map((item) => (
        <li key={item}>
          <a href="" className="block w-full select-none px-1 py-2">
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Content() {
  const className = "leading-relaxed mt-6";
  return (
    <div>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
    </div>
  );
}
