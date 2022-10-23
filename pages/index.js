import Link from "next/link";
import { HomeDemo } from "../src/home-demo";
import { getHomeDemoProps } from "../src/home-demo-server";
import {
  CodeHikeLogo,
  DiscordLink,
  GitHubLink,
  TwitterLink,
} from "../src/logo";
import React from "react";
import { DemoGrid } from "../src/demo-grid";
import sponsorsData from "../data/sponsors.json";
import { SEO } from "../src/seo";
import { Footer } from "../src/footer";

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
      <SEO />

      <Nav />

      <main className="flex flex-col items-center w-full flex-1  max-w-3xl relative">
        <h1 className="md:text-6xl text-5xl font-bold md:mt-32 mt-20 text-center">
          Not just a{" "}
          <span className="text-blue-600 font-bold">syntax highlighter</span>.
        </h1>

        <div className="mt-20 mb-24 text-xl text-center">
          <Link href={`/docs/introduction`}>
            <a className="border-2 border-gray-600 hover:border-blue-600 w-60 p-2 mx-2 mb-4 md:mb-0 rounded block md:inline-block">
              Documentation
            </a>
          </Link>
          <a
            href="https://play.codehike.org"
            className="border-2 border-gray-600 hover:border-blue-600 w-60 p-2 mx-2 rounded block md:inline-block"
          >
            Playground
          </a>
        </div>
        {/* <div className="h-32" /> */}

        <HomeDemo {...homeDemoProps} />

        <p className="md:text-2xl text-xl my-16  text-justify">
          Build first-class{" "}
          <span className="font-bold">code walkthroughs for the web</span>.
          Whether you are writing blog posts, documentation, tutorials, coding
          videos, or any type of technical content, Code Hike helps you create a
          superior code reading experience.
        </p>

        <Testimonials />

        <Demos />
        <Sponsors sponsors={sponsorsData.sponsors} />
        <Footer />
      </main>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="w-full" id="testimonials">
      <Quote
        text="This looks like the future of documentation."
        author="Guillermo Rauch"
        url="https://twitter.com/rauchg/status/1367199228494155786"
        avatar="https://github.com/rauchg.png"
        job="Vercel CEO"
      />
      <Quote
        text="This is one of the most impressive tools for teaching I've seen in quite some time."
        author="Tomasz Łakomy"
        url="https://twitter.com/tlakomy/status/1298686860785573888"
        avatar="https://github.com/tlakomy.png"
        job="Egghead instructor"
      />
      <Quote
        text="This would definitely raise the bar on the formatting of technical content."
        author="Cassie Evans"
        url="https://twitter.com/cassiecodes/status/1277152181280485376"
        avatar="https://github.com/cassieevans.png"
        job="SVG magician"
      />
      <Quote
        text="Code Hike is such a refreshing experience. I honestly think you will start to see these patterns everywhere across docs over the next few years."
        author="David Boyne"
        url="https://twitter.com/boyney123/status/1529444678554337280"
        avatar="https://github.com/boyney123.png"
        job="AWS developer advocate"
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
      <h2 className="mb-16 text-4xl font-bold text-center" id="get-started">
        Get started
      </h2>
      <p className="md:text-2xl text-xl text-justify">
        <span className="font-bold">There isn't a stable version yet</span>, but
        there's a preview version for people who want to try it out and{" "}
        <ExternalLink href="https://github.com/code-hike/codehike/discussions">
          give feedback
        </ExternalLink>
        . You can use it in any project that has MDX v2 configured by following
        the{" "}
        <ExternalLink href="https://github.com/code-hike/codehike#how-to-set-up-code-hike">
          instructions on how to set it up
        </ExternalLink>
        . Or you can clone this{" "}
        <ExternalLink href="https://github.com/pomber/code-hike-sample">
          starter project
        </ExternalLink>
        .
      </p>
      <p className="md:text-2xl text-xl text-justify mt-6">
        There are no docs yet, but you can explore the demos for an overview of
        all the features and how to use them. Don't hestitate to{" "}
        <ExternalLink href="https://github.com/code-hike/codehike/discussions">
          ask for help
        </ExternalLink>
        .
      </p>
    </section>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="text-blue-600"
    >
      {children}
    </a>
  );
}

function Demos() {
  return (
    <section className="mt-24 w-full">
      <h2 className="mb-16 text-4xl font-bold text-center" id="demos">
        Demos
      </h2>
      <DemoGrid />
    </section>
  );
}

function Sponsors({ sponsors }) {
  return (
    <section className="mt-24 w-full">
      <h2 className="mb-16 text-4xl font-bold text-center" id="sponsors">
        Sponsors
      </h2>
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
      <div className="flex gap-6 justify-center mb-24 md:flex-row flex-col">
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
      <DiscordLink className="hover:text-gray-500 transition-colors duration-200" />
      <TwitterLink className="hover:text-gray-500 transition-colors duration-200" />
      <GitHubLink className="hover:text-gray-500 transition-colors duration-200" />
    </nav>
  );
}
