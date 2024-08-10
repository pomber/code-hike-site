import Link from "next/link";
import { IdProvider } from "@radix-ui/react-id";
import {
  CodeHikeLogo,
  DiscordLink,
  GitHubLink,
  MenuIcon,
  TwitterLink,
} from "./logo";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { SEO } from "./seo";

export const sidebar = [
  ["Introduction", "introduction"],
  ["Test", "test"],
  ["Installation", "installation/nextjs"],
  ["Configuration", "configuration"],
  ["Themes", "themes"],
  ["Code Blocks", "codeblocks"],
  ["Annotations", "annotations"],
  ["<CH.Code>", "ch-code"],
  ["<CH.Section>", "ch-section"],
  ["<CH.Scrollycoding>", "ch-scrollycoding"],
  ["<CH.Spotlight>", "ch-spotlight"],
  ["<CH.Slideshow>", "ch-slideshow"],
  // ["Roadmap", "roadmap"],
  // ["Changelog", "changelog"],
  ["Styling", "styling"],
  ["Troubleshooting", "troubleshooting"],
];

const stable = [
  "introduction",
  "installation/nextjs",
  "configuration",
  "themes",
  "codeblocks",
  "annotations",
  "ch-code",
  "ch-section",
  "troubleshooting",
];
function isExperimental(slug) {
  return !stable.includes(slug);
}

export function DocsLayout({ title, h1, slug, children, cardId, description }) {
  return (
    <div className="docs" style={{ minWidth: "80ch" }}>
      <SEO title={title} cardId={cardId} description={description} />
      <IdProvider>
        <div className="sticky top-0 z-10">
          <nav className="max-w-7xl mx-auto h-16 flex items-center gap-4 text-gray-800 bg-white 3cols:bg-transparent border-b  border-gray-100 3cols:border-b-0">
            <MobileMenu current={slug} />
            <Link href="/">
              <a className="flex items-center gap-2 mr-auto 2cols:ml-6">
                <CodeHikeLogo className="block h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold">
                  Code Hike
                  <span className="text-sm pl-2 font-normal text-gray-700">
                    v0.9.0
                  </span>
                </h1>
              </a>
            </Link>

            {/* <input placeholder="Search" className="w-40" /> */}

            <DiscordLink className="hover:text-gray-500 transition-colors duration-200" />
            <TwitterLink className="hover:text-gray-500 transition-colors duration-200" />
            <GitHubLink className="hover:text-gray-500 transition-colors duration-200 mr-4" />
          </nav>
        </div>
        <div className="max-w-7xl mx-auto flex isolate">
          <aside className="w-64 sticky top-16 self-start shrink-0 hidden 2cols:block">
            <Sidebar current={slug} />
          </aside>
          <aside className="w-64 top-16 shrink-0 hidden 3cols:block order-last"></aside>
          <article className="min-w-0 flex-1 3cols:-mt-16">
            <main
              className="mx-auto px-8 pt-4 prose pb-24"
              style={{ width: "80ch", maxWidth: "80ch" }}
            >
              <h1 className="text-2xl mt-0 mb-9 text-gray-800">{h1}</h1>
              {children}
            </main>
          </article>
        </div>
      </IdProvider>
    </div>
  );
}

function Sidebar({ current }) {
  const currentSlug = current.split("/")[0];
  return (
    <ul className="p-4 pl-6 text-gray-700 text-sm">
      {sidebar.map(([item, slug]) => (
        <li
          key={item}
          className={
            "-ml-2 rounded " +
            (slug.split("/")[0] === currentSlug
              ? "bg-blue-100 text-black"
              : "hover:bg-gray-100")
          }
        >
          <Link href={`/docs/${slug}`}>
            <a className="w-full select-none py-2 my-1 px-2 flex items-center">
              <span className="flex-1">{item}</span>
              {isExperimental(slug) && <ExperimentalIcon />}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ExperimentalIcon() {
  return (
    <svg
      className="w-4 h-4 block text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Experimental</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  );
}

function MobileMenu({ current }) {
  const router = useRouter();

  return (
    <div key={router.asPath} className="2cols:hidden">
      <Dialog.Root>
        <Dialog.Trigger className="block ml-6">
          <MenuIcon />
        </Dialog.Trigger>
        <Dialog.Content className="p-4 bg-white fixed inset-0 top-16">
          <Sidebar current={current} />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
