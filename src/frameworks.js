import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import React from "react";
import { useRouter } from "next/router";
import * as Select from "@radix-ui/react-select";

function findOption(id, options) {
  return options.find((option) => option.id === id);
}

export function Frameworks({ loadId, options }) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = React.useState(
    findOption(loadId, options)
  );

  const loading = selectedOption.id !== loadId;

  const now = options.filter(({ soon }) => !soon);
  const soon = options.filter(({ soon }) => soon);

  return (
    <div>
      <Select.Root
        id={selectedOption.id}
        defaultValue={selectedOption.id}
        value={selectedOption.id}
        onValueChange={(selectedValue) => {
          setSelectedOption(findOption(selectedValue, options));
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
            {now.map((option) => (
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
        <img
          src={`/logo/${option.id}.svg`}
          alt={option.name}
          className="rounded m-0 h-full w-full"
        />
      </div>
      {option.name}
    </div>
  );
}
