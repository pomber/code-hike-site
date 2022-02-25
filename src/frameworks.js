import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React from "react";

import NextJS from "../docs/installation-nextjs.mdx";
import Contentlayer from "../docs/installation-contentlayer.mdx";

const options = [
  { name: "Next.js", component: NextJS, logo: "nextjs" },
  { name: "Next.js + next-mdx-remote", logo: "nextjs" },
  { name: "Next.js + Contentlayer", component: Contentlayer, logo: "nextjs" },
  { name: "Next.js + mdx-bundler", logo: "nextjs" },
  { name: "Nextra", logo: "nextjs" },
  { name: "Remix", logo: "remix" },
  { name: "Vite", logo: "vite" },
];

const soon = [
  { name: "Docusaurus", logo: "docusaurus" },
  { name: "Gatsby", logo: "gatsby" },
  { name: "Astro", logo: "astro" },
  // { name: "Webpack", logo: "webpack" },
  { name: "Create React App", logo: "cra" },
  { name: "Eleventy", logo: "11ty" },
  { name: "Motif", logo: "motif" },
  { name: "docs.page" },
];

export function Frameworks() {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const Content = selectedOption.component || NextJS;
  return (
    <div className="frameworks">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="rounded border border-blue-600 -mx-4">
            <button className="items-center flex w-full">
              <Framework option={selectedOption} className="" />
              <ChevronDownIcon
                aria-hidden
                className="inline-block mx-4"
                width={24}
                height={24}
              />
            </button>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          className="box-border"
          style={{ width: "80ch", maxWidth: "80ch" }}
        >
          <div className="mx-4 py-1 bg-white shadow-lg">
            {options.map((option) => (
              <FrameworkOption
                key={option.name}
                option={option}
                setSelectedOption={setSelectedOption}
              />
            ))}
            <DropdownMenu.Label className="bg-gray-100 px-4 py-2">
              Comming soon<span className="text-gray-400">er or later</span>
            </DropdownMenu.Label>
            {soon.map((option) => (
              <FrameworkOption
                key={option.name}
                option={option}
                setSelectedOption={setSelectedOption}
              />
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Content />
    </div>
  );
}

function FrameworkOption({ option, setSelectedOption }) {
  return (
    <DropdownMenu.Item
      onSelect={() => setSelectedOption(option)}
      className="outline-none"
    >
      <Framework option={option} className="hover:bg-blue-100" />
    </DropdownMenu.Item>
  );
}

function Framework({ option, className }) {
  return (
    <div
      className={
        "flex-1 m-2 p-2  rounded cursor-pointer flex flex-row gap-2 items-center" +
        " " +
        className
      }
    >
      <div className="h-6 w-6 ">
        {option.logo && (
          <img
            src={`/logo/${option.logo}.svg`}
            alt={option.name}
            className="rounded m-0 h-full w-full"
          />
        )}
      </div>
      {option.name}
    </div>
  );
}
