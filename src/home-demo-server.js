import { highlight } from "@code-hike/mdx";
import theme from "shiki/themes/github-light.json";
import fs from "fs";

export async function getHomeDemoProps() {
  const mdx = fs.readFileSync("./data/demos/show.mdx", "utf8");

  const code = await highlight({
    code: mdx,
    lang: "md",
    theme,
  });

  return { code };
}
