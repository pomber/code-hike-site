import React, { useMemo } from "react";
import { DocsLayout, sidebar } from "../../src/docs-layout";
import { mdxToCode } from "../../src/docs-mdx";
import { getMDXComponent } from "mdx-bundler/client";

import { THEME_NAMES } from "@code-hike/lighter";

export async function getStaticProps() {
  const filename = "themes";
  const title = sidebar.find(([, item]) => item === filename)[0];
  const code = await mdxToCode(filename);

  const promises = THEME_NAMES.map(async (themeName) => {
    const code = await mdxToCode("configuration/theme", {
      theme: themeName,
      lineNumbers: true,
      showCopyButton: true,
    });
    return { themeName, code };
  });

  const themeCodes = await Promise.all(promises);

  return {
    props: {
      previewSource: code,
      slug: filename,
      title: title || null,
      themeCodes,
    },
  };
}

function getCodeSection(themeCodes, showModes) {
  const [selected, setSelected] = React.useState(0);
  const [isDark, setIsDark] = React.useState(false);
  const Component = getMDXComponent(themeCodes[selected].code);
  return () => (
    <section className="theme-list" data-theme={isDark ? "dark" : "light"}>
      <div class="flex flex-row flex-wrap gap-2">
        {themeCodes.map(({ themeName }, i) => {
          const isSelected = i === selected;
          return (
            <button
              key={themeName}
              className={`rounded flex px-2 py-1 no-underline align-middle items-center border hover:bg-gray-100
               ${isSelected ? "border-blue-400" : "border-gray-200"}`}
              onClick={() => setSelected(i)}
            >
              {themeName}
            </button>
          );
        })}
      </div>
      {showModes && (
        <div className="flex justify-end gap-2 h-3">
          <button
            onClick={() => setIsDark(false)}
            style={{ fontWeight: !isDark ? "bolder" : "normal" }}
          >
            Light Mode
          </button>{" "}
          |{" "}
          <button
            onClick={() => setIsDark(true)}
            style={{ fontWeight: isDark ? "bolder" : "normal" }}
          >
            Dark Mode
          </button>
        </div>
      )}
      <Component />
      <code className="text-center block text-gray-700">{`{ theme: "${themeCodes[selected].themeName}" }`}</code>
    </section>
  );
}

export default function Page({ slug, previewSource, title, themeCodes }) {
  const BuitInThemes = getCodeSection(
    themeCodes.filter(({ themeName }) => !themeName.endsWith("from-css"))
  );
  const FromCSSThemes = getCodeSection(
    themeCodes.filter(({ themeName }) => themeName.endsWith("from-css")),
    true
  );

  return (
    <DocsLayout h1={title} title={title + " - Code Hike Docs"} slug={slug}>
      <MDXComponent
        code={previewSource}
        components={{
          BuitInThemes,
          FromCSSThemes,
        }}
      />
    </DocsLayout>
  );
}

function MDXComponent({ code, components }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return Component({ components });
}
