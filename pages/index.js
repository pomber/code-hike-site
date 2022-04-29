import Link from "next/link";
import { HomeDemo } from "../src/home-demo";
import { getHomeDemoProps } from "../src/home-demo-server";
import { CodeHikeLogo, GitHubLink, TwitterLink } from "../src/logo";
import React from "react";
import { DemoGrid } from "../src/demo-grid";
import sponsorsData from "../data/sponsors.json";
import { SEO } from "../src/seo";

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

        <Link href={`/docs/introduction`}>
          <a className="border-2 mt-20 mb-24 border-gray-600 hover:border-blue-600 text-xl md:w-72 p-2 rounded text-center">
            Documentation
          </a>
        </Link>

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
      <TwitterLink className="hover:text-gray-500 transition-colors duration-200" />

      <GitHubLink className="hover:text-gray-500 transition-colors duration-200" />
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mb-12">
      <a
        href="https://vercel.com?utm_source=codehike&utm_campaign=oss"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <svg
          height="1em"
          className="inline-block"
          viewBox="0 0 4438 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2223.75 250C2051.25 250 1926.87 362.5 1926.87 531.25C1926.87 700 2066.72 812.5 2239.38 812.5C2343.59 812.5 2435.47 771.25 2492.34 701.719L2372.81 632.656C2341.25 667.188 2293.28 687.344 2239.38 687.344C2164.53 687.344 2100.94 648.281 2077.34 585.781H2515.16C2518.59 568.281 2520.63 550.156 2520.63 531.094C2520.63 362.5 2396.41 250 2223.75 250ZM2076.09 476.562C2095.62 414.219 2149.06 375 2223.75 375C2298.59 375 2352.03 414.219 2371.41 476.562H2076.09ZM2040.78 78.125L1607.81 828.125L1174.69 78.125H1337.03L1607.66 546.875L1878.28 78.125H2040.78ZM577.344 0L1154.69 1000H0L577.344 0ZM3148.75 531.25C3148.75 625 3210 687.5 3305 687.5C3369.38 687.5 3417.66 658.281 3442.5 610.625L3562.5 679.844C3512.81 762.656 3419.69 812.5 3305 812.5C3132.34 812.5 3008.13 700 3008.13 531.25C3008.13 362.5 3132.5 250 3305 250C3419.69 250 3512.66 299.844 3562.5 382.656L3442.5 451.875C3417.66 404.219 3369.38 375 3305 375C3210.16 375 3148.75 437.5 3148.75 531.25ZM4437.5 78.125V796.875H4296.88V78.125H4437.5ZM3906.25 250C3733.75 250 3609.38 362.5 3609.38 531.25C3609.38 700 3749.38 812.5 3921.88 812.5C4026.09 812.5 4117.97 771.25 4174.84 701.719L4055.31 632.656C4023.75 667.188 3975.78 687.344 3921.88 687.344C3847.03 687.344 3783.44 648.281 3759.84 585.781H4197.66C4201.09 568.281 4203.12 550.156 4203.12 531.094C4203.12 362.5 4078.91 250 3906.25 250ZM3758.59 476.562C3778.13 414.219 3831.41 375 3906.25 375C3981.09 375 4034.53 414.219 4053.91 476.562H3758.59ZM2961.25 265.625V417.031C2945.63 412.5 2929.06 409.375 2911.25 409.375C2820.47 409.375 2755 471.875 2755 565.625V796.875H2614.38V265.625H2755V409.375C2755 330 2847.34 265.625 2961.25 265.625Z"
            fill="black"
          />
        </svg>
      </a>
    </footer>
  );
}
