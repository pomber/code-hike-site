import { CodeHikeLogo } from "../src/logo";
import React from "react";

export default function Home({}) {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <CodeHike />
      <h1 className="text-5xl font-bold mx-24 text-center my-8">
        Not just a{" "}
        <span className="text-blue-600 font-bold">syntax highlighter</span>.
      </h1>
    </div>
  );
}

function CodeHike() {
  return (
    <div className="flex items-center justify-center gap-2">
      <CodeHikeLogo className="block h-12 w-12 text-blue-600" />
      <h1 className="text-4xl font-bold">Code Hike</h1>
    </div>
  );
}
