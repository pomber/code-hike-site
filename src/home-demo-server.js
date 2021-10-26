import { highlight } from "@code-hike/highlighter";
import theme from "shiki/themes/github-light.json";
import fs from "fs";

export async function getHomeDemoProps() {
  const mdx = fs.readFileSync("./src/home-demo.mdx", "utf8");

  const code = await highlight({
    code: mdx,
    lang: "mdx",
    theme,
  });

  return { code };
}
