import Head from "next/head";
import { HomeDemo } from "../src/home-demo";
import { getHomeDemoProps } from "../src/home-demo-server";
import { CodeHikeLogo } from "../src/logo";
import React from "react";
import Link from "next/link";

export async function getStaticProps() {
  return {
    props: {
      homeDemoProps: await getHomeDemoProps(),
    },
  };
}

export default function Home({ homeDemoProps }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Code Hike</title>
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

      <Nav />

      <main className="flex flex-col items-center w-full flex-1  max-w-3xl">
        <h1 className="text-6xl font-bold my-32 text-center">
          Not just a{" "}
          <span className="text-blue-600 font-bold">syntax highlighter</span>.
        </h1>

        <HomeDemo {...homeDemoProps} />

        <p className="text-2xl my-16  text-justify">
          Build first-class{" "}
          <span className="font-bold">code walkthroughs for the web</span>.
          Whether you are writing blog posts, documentation, tutorials, coding
          videos, or any type of technical content, Code Hike helps you create a
          superior code reading experience.
        </p>

        <Testimonials />

        <GetStarted />
        <Demos />
        <Sponsors />
      </main>
    </div>
  );
}
function Testimonials() {
  return (
    <section className="w-full">
      <Quote
        text="This looks like the future of documentation"
        author="Guillermo Rauch"
        url="https://twitter.com/rauchg/status/1367199228494155786"
        avatar="https://github.com/rauchg.png"
        job="Vercel CEO"
      />
      <Quote
        text="This is one of the most impressive tools for teaching I've seen in quite
      some time"
        author="Tomasz Łakomy"
        url="https://twitter.com/tlakomy/status/1298686860785573888"
        avatar="https://github.com/tlakomy.png"
        job="Egghead instructor"
      />
      <Quote
        text="This would definitely raise the bar on the formatting of technical
        content"
        author="Cassie Evans"
        url="https://twitter.com/cassiecodes/status/1277152181280485376"
        avatar="https://github.com/cassieevans.png"
        job="SVG magician"
      />
    </section>
  );
}
function Quote({ text, author, url, avatar, job }) {
  const [hover, setHover] = React.useState(false);

  return (
    <a
      href={url}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <figure
        className={`flex rounded-xl p-4 border w-half mx-auto my-4 align-top gap-4 ${
          hover ? "border-blue-600" : "border-gray-300"
        }`}
      >
        <img
          className={`w-20 h-20 rounded-full object-cover ${
            hover ? "" : "filter grayscale"
          }`}
          src={avatar}
          alt={author}
          width="384"
          height="512"
        />
        <div className="">
          <figcaption className="font-medium">
            <span className={hover ? "text-blue-600" : "text-gray-800"}>
              {author}
            </span>
            <span className="text-gray-500 pl-2 text-md font-normal">
              {job}
            </span>
          </figcaption>
          <blockquote>
            <p className="text-xl mr-8">{text}</p>
          </blockquote>
        </div>
      </figure>
    </a>
  );
}

function GetStarted() {
  return (
    <section className="mt-24">
      <h2 className="mb-16 text-4xl font-bold text-center">Get started</h2>
      <p className="text-2xl text-justify">
        There's no stable version yet. If you want to give it a try now, you can
        fork this{" "}
        <a
          href="https://github.com/pomber/code-hike-sample"
          className="text-blue-600"
        >
          starter project
        </a>
        . If you have feedback (about syntax, customization, new components, new
        annotations) please{" "}
        <a
          href="https://github.com/code-hike/codehike"
          className="text-blue-600"
        >
          open an issue
        </a>
        .
      </p>
      <p className="text-2xl text-justify mt-6">
        There are no docs yet, but you can explore the demos for an overview of
        all the features and how to use them from MDX.
      </p>
    </section>
  );
}

const demos = [
  { title: "Code and focus", locked: false, id: "code" },
  { title: "File names", locked: false, id: "filenames" },
  { title: "Comment annotations", locked: false, id: "comment-annotations" },
  { title: "Custom annotations", locked: true, id: "custom-annotations" },
  { title: "Component annotations", locked: true, id: "component-annotations" },
  { title: "Code sections", locked: true, id: "sections" },
  { title: "Spotlight", locked: true, id: "spotlight" },
  { title: "Spotlight & preview", locked: true, id: "spotlight-preview" },
  { title: "Scrollycoding", locked: true, id: "scrollycoding" },
  {
    title: "Scrollycoding & preview",
    locked: true,
    id: "scrollycoding-preview",
  },
];

function Demos() {
  return (
    <section className="mt-24 w-full">
      <h2 className="mb-16 text-4xl font-bold text-center">
        Explore the demos
      </h2>
      <div className="grid gap-2 grid-cols-2 w-full text-xl">
        {demos.map((demo) => (
          <Link key={demo.id} href={`/demo/${demo.id}`}>
            <a className="border border-gray-300 rounded p-3 flex hover:border-blue-600">
              <span>{demo.title}</span>
              {demo.locked && (
                <LockIcon className="h-6 ml-auto text-gray-500" />
              )}
            </a>
          </Link>
        ))}
      </div>
      <p className="pt-8 text-xl text-justify">
        Everyone can see all the demos, but only sponsors can see the code for
        demos marked with <LockIcon className="h-5 inline align-text-top" />.
        Locked demos are unlocked for everyone after being sponsored by five
        sponsors.
      </p>
    </section>
  );
}

function Sponsors() {
  return (
    <>
      <h2 className="mt-16 text-4xl font-bold">Sponsors</h2>
      <div className="flex gap-6 w-full my-16">
        <div className="bg-gray-300 h-48 rounded w-64 shadow-md" />
        <div className="bg-gray-300 h-48 rounded w-64 shadow-md" />
        <div className="bg-gray-300 h-48 rounded w-64 shadow-md" />
        <div className="bg-gray-300 h-48 rounded w-64 shadow-md" />
      </div>
    </>
  );
}

function Nav() {
  return (
    <nav className="flex w-full max-w-3xl pt-8 items-center gap-4 text-gray-800 ">
      <div className="flex items-center gap-2 mr-auto">
        <CodeHikeLogo className="block h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold">Code Hike</h1>
      </div>
      <a
        href="https://twitter.com/codehike_"
        className="hover:text-gray-500 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={24}
          height={24}
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          data-v-313be23b
        >
          <path
            d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814a11.874 11.874 0 0 1-8.62-4.37a4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101a4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732a11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9c0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a
        href="https://github.com/code-hike/codehike"
        className="hover:text-gray-500 transition-colors duration-200"
      >
        <svg width={24} height={24} viewBox="0 0 16 16" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </a>
    </nav>
  );
}

function LockIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Locked</title>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
