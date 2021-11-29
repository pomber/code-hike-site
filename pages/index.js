import Head from "next/head";
import { HomeDemo } from "../src/home-demo";
import { getHomeDemoProps } from "../src/home-demo-server";
import { CodeHikeLogo } from "../src/logo";
import React from "react";
import { DemoGrid } from "../src/demo-grid";
import sponsorsData from "../data/sponsors.json";

export async function getStaticProps() {
  return {
    props: {
      homeDemoProps: await getHomeDemoProps(),
    },
  };
}

export default function Home({ homeDemoProps }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 md:px-0 px-4">
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

      <main className="flex flex-col items-center w-full flex-1  max-w-3xl relative">
        <Draft />
        <h1 className="md:text-6xl text-5xl font-bold md:my-32 my-20 text-center">
          Not just a{" "}
          <span className="text-blue-600 font-bold">syntax highlighter</span>.
        </h1>

        <HomeDemo {...homeDemoProps} />

        <p className="md:text-2xl text-xl my-16  text-justify">
          Build first-class{" "}
          <span className="font-bold">code walkthroughs for the web</span>.
          Whether you are writing blog posts, documentation, tutorials, coding
          videos, or any type of technical content, Code Hike helps you create a
          superior code reading experience.
        </p>

        <Testimonials />

        <GetStarted />
        <Demos />
        <Sponsors sponsors={sponsorsData.sponsors} />
      </main>
    </div>
  );
}

function Draft() {
  return (
    <div className="absolute flex flex-col items-center justify-center text-red-900  md:-right-16 md:top-2 -right-8 font-bold max-w-md">
      <div className="border-2 border-red-900 rounded-xl p-4 w-3/4 rotate-12 bg-red-50 bg-opacity-60">
        <div className="text-3xl text-center pb-4">DRAFT</div>
        <div className="text-xl text-center">
          This is the next version of{" "}
          <a href="https://codehike.org" className="underline">
            codehike.org
          </a>
          . Still work in progress.
        </div>
      </div>
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
      target="_blank"
      rel="noopener noreferrer"
      target="_blank"
      rel="noopener noreferrer"
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
          className={`md:w-20 w-16 md:h-20 h-16 rounded-full object-cover ${
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
            <p className="md:text-xl text-md mr-8">{text}</p>
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
      <p className="md:text-2xl text-xl text-justify">
        <span className="font-bold">There isn't a stable version yet</span>, but
        there's a preview version for people who want to try it out and{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/code-hike/codehike/discussions"
          className="text-blue-600"
        >
          give feedback
        </a>
        . You can use it in any project that has MDX v2 configured. Or you can
        clone this{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/pomber/code-hike-sample"
          className="text-blue-600"
        >
          starter project
        </a>
        .
      </p>
      <p className="md:text-2xl text-xl text-justify mt-6">
        There are no docs yet, but you can explore the demos for an overview of
        all the features and how to use them.
      </p>
    </section>
  );
}

function Demos() {
  return (
    <section className="mt-24 w-full">
      <h2 className="mb-16 text-4xl font-bold text-center">Demos</h2>
      <DemoGrid />
    </section>
  );
}

function Sponsors({ sponsors }) {
  return (
    <section className="mt-24 w-full">
      <h2 className="mb-16 text-4xl font-bold text-center">Sponsors</h2>
      <ul className="grid gap-2 md:grid-cols-3 grid-cols-1 w-full mb-16">
        {sponsors.map((sponsor) => (
          <li
            key={sponsor.login}
            className="rounded p-2 hover:border-blue-600 border"
          >
            <a
              className="flex"
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={sponsor.avatarUrl}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex flex-col pl-4 min-w-0">
                <h4 className="truncate" title={sponsor.name}>
                  {sponsor.name}
                </h4>
                <span className="text-sm text-gray-500 truncate">
                  {sponsor.login}
                </span>
                <span className="text-sm text-gray-500 truncate">
                  {sponsor.location}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex gap-6 justify-center mb-36 md:flex-row flex-col">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/sponsors/code-hike"
          className="border-2 border-gray-600 hover:border-blue-600 text-xl md:w-72 p-2 rounded text-center"
        >
          Sponsor on GitHub
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://opencollective.com/codehike"
          className="border-2 border-gray-600 hover:border-blue-600 text-xl md:w-72 p-2 rounded text-center"
        >
          Sponsor on Open Collective
        </a>
      </div>
    </section>
  );
}

function Nav() {
  return (
    <nav className="flex w-full max-w-3xl md:pt-8 pt-4 items-center gap-4 text-gray-800 ">
      <div className="flex items-center gap-2 mr-auto">
        <CodeHikeLogo className="block h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold">Code Hike</h1>
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
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
        target="_blank"
        rel="noopener noreferrer"
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
