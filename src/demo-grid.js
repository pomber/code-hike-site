import React from "react";
import Link from "next/link";
import demos from "../demos/index.json";

export function DemoGrid() {
  return (
    <>
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
    </>
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
