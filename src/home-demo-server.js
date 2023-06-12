import { highlight } from "@code-hike/mdx";
import fs from "fs";

export async function getHomeDemoProps() {
  const mdx = fs.readFileSync("./data/demos/old-show.mdx", "utf8");

  const code = await highlight({
    code: mdx,
    lang: "mdx",
    theme: "github-light",
  });

  return { code };
}
