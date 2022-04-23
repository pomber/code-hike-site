import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import React from "react";

import Astro from "../docs/installation-astro.mdx";
import Contentlayer from "../docs/installation-contentlayer.mdx";
import Cra from "../docs/installation-cra.mdx";
import DocsPage from "../docs/installation-docspage.mdx";
import Docusaurus from "../docs/installation-docusaurus.mdx";
import Eleventy from "../docs/installation-eleventy.mdx";
import Gatsby from "../docs/installation-gatsby.mdx";
import MdxBundler from "../docs/installation-next-mdx-bundler.mdx";
import MdxRemote from "../docs/installation-next-mdx-remote.mdx";
import NextJS from "../docs/installation-nextjs.mdx";
import Nextra from "../docs/installation-nextra.mdx";
import Parcel from "../docs/installation-parcel.mdx";
import Remix from "../docs/installation-remix.mdx";
import Vite from "../docs/installation-vite.mdx";

import { useRouter } from "next/router";

import * as Select from "@radix-ui/react-select";

// prettier-ignore
const options = [
  { id: "nextjs", name: "Next.js", component: NextJS, logo: "nextjs" },
  { id: "docusaurus", name: "Docusaurus", logo: "docusaurus", component: Docusaurus },
  { id: "nextra", name: "Nextra", logo: "nextjs", component: Nextra },
  { id: "remix", name: "Remix", logo: "remix", component: Remix },
  { id: "vite", name: "Vite", logo: "vite", component: Vite },
  { id: "contentlayer", name: "Next.js + Contentlayer", component: Contentlayer, logo: "contentlayer" },
  { id: "docspage", name: "docs.page", logo: "github", component: DocsPage },
  { id: "next-mdx-bundler", name: "Next.js + mdx-bundler", logo: "mdx-bundler", component: MdxBundler },
  { id: "next-mdx-remote", name: "Next.js + next-mdx-remote", logo: "nextjs", component: MdxRemote },
];

// prettier-ignore
const soon = [
  { id: "gatsby", name: "Gatsby", logo: "gatsby", component: Gatsby },
  { id: "astro", name: "Astro", logo: "astro", component: Astro },
  { id: "parcel", name: "Parcel", logo: 'parcel', component: Parcel },
  // { id: "webpack", name: "Webpack", logo: "webpack" },
  { id: "cra", name: "Create React App", logo: "cra", component: Cra },
  { id: "eleventy", name: "Eleventy", logo: "11ty", component: Eleventy },
  // { id: "motif", name: "Motif", logo: "motif" },
];

function findOption(id) {
  return [...options, ...soon].find((option) => option.id === id);
}

export function Frameworks({ loadId }) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = React.useState(
    findOption(loadId)
  );

  const loading = selectedOption.id !== loadId;

  return (
    <div>
      <Select.Root
        id={selectedOption.id}
        defaultValue={selectedOption.id}
        value={selectedOption.id}
        onValueChange={(selectedValue) => {
          setSelectedOption(findOption(selectedValue));
          router.push(
            {
              pathname: "/docs/installation/[fwk]",
              query: { fwk: selectedValue },
            },
            null,
            { scroll: false }
          );
        }}
      >
        <Select.Trigger asChild>
          <div
            className={`rounded border border-blue-600 -mx-4 py-2 px-4 ${
              loading ? "bg-gray-200" : ""
            }`}
          >
            <button className="items-center flex w-full outline-none focus:bg-blue-100 appearance-none">
              <Select.Value />
              <Select.Icon className="ml-auto">
                <ChevronDownIcon />
              </Select.Icon>
            </button>
          </div>
        </Select.Trigger>

        <Select.Content className="content box-border bg-white shadow-lg border border-gray-300 rounded">
          <Select.ScrollUpButton className="h-8 flex justify-center items-center">
            <ChevronUpIcon className="h-6 w-6" />
          </Select.ScrollUpButton>
          <Select.Viewport className="viewport">
            {options.map((option) => (
              <Select.Item
                value={option.id}
                key={option.id}
                className="focus:bg-blue-100 outline-none m-2 p-2  rounded"
              >
                <Select.ItemText>
                  <Framework option={option} />
                </Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}

            <Select.Separator className="bg-gray-100 px-4 py-2">
              Comming soon<span className="text-gray-400">er or later</span>:
            </Select.Separator>

            {soon.map((option) => (
              <Select.Item
                value={option.id}
                key={option.id}
                className="focus:bg-blue-100 outline-none m-2 p-2  rounded"
              >
                <Select.ItemText>
                  <Framework option={option} />
                </Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="h-8 flex justify-center items-center">
            <ChevronDownIcon className="h-6 w-6" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
function Framework({ option, className }) {
  return (
    <div
      className={
        "flex-1 cursor-pointer flex flex-row gap-2 items-center" +
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
