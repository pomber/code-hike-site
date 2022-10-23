import React from "react";
import Link from "next/link";

function findOption(id, options) {
  return options.find((option) => option.id === id);
}

export function Frameworks({ loadId, options }) {
  const selectedOption = findOption(loadId, options);

  const now = options.filter(({ soon }) => !soon);
  // const soon = options.filter(({ soon }) => soon);
  return (
    <div class="flex flex-row flex-wrap gap-2">
      {now.map((option) => (
        <Framework
          option={option}
          key={option.id}
          isSelected={option === selectedOption}
        />
      ))}
    </div>
  );
}
function Framework({ option, className, isSelected }) {
  return (
    <Link href={"/docs/installation/" + option.id} scroll={false}>
      <a
        className={`rounded flex px-2 py-1 no-underline align-middle items-center border ${
          isSelected ? "border-blue-400" : "border-gray-200"
        }`}
      >
        <div className="pr-2">
          <img
            src={`/logo/${option.id}.svg`}
            alt={option.name}
            className="rounded m-0 h-6 w-6"
          />
        </div>
        {option.name}
      </a>
    </Link>
  );
}
