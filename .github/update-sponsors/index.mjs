import { fetchSponsors } from "./fetch-sponsors.mjs";
import { promises as fs } from "fs";
const sponsorsFilePath = "./data/sponsors.json";

async function main() {
  const data = JSON.parse(await fs.readFile(sponsorsFilePath, "utf8"));

  data.sponsors = await fetchSponsors();
  console.table(data.sponsors.map(({ url, avatarUrl, ...x }) => x));

  await fs.writeFile(sponsorsFilePath, JSON.stringify(data, null, 2));
}

main();

process.on("unhandledRejection", (up) => {
  throw up;
});
