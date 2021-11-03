import { fetchSponsors } from "./fetch-sponsors.mjs";
import { promises as fs } from "fs";
const sponsorsFilePath = "./data/sponsors.json";
const demosFilePath = "./data/demos/index.json";

async function main() {
  const sponsors = await fetchSponsors();

  updateSponsors(sponsors);
  updateDemos(sponsors);
}

main();

process.on("unhandledRejection", (up) => {
  throw up;
});

async function updateSponsors(sponsors) {
  const sponsorsData = JSON.parse(await fs.readFile(sponsorsFilePath, "utf8"));
  sponsorsData.sponsors = sponsors;
  console.table(sponsors.map(({ url, avatarUrl, ...x }) => x));
  await fs.writeFile(sponsorsFilePath, JSON.stringify(sponsorsData, null, 2));
}

async function updateDemos(sponsors) {
  const demos = JSON.parse(await fs.readFile(demosFilePath, "utf8"));
  const logins = sponsors.map(({ login }) => login);

  demos.forEach((demo) => {
    demo.sponsors.forEach((sponsor) => {
      if (!logins.includes(sponsor)) {
        // remove old sponsor for demo sponsors
        removeItem(demo.sponsors, sponsor);
      } else {
        // remove used sponsors from login list
        removeItem(logins, sponsor);
      }
    });
  });

  // add new logins
  demos.forEach((demo) => {
    while (demo.sponsors.length < 5 && logins.length > 0) {
      demo.sponsors.push(logins.pop());
    }
    demo.locked = demo.sponsors.length < 5;
  });

  await fs.writeFile(demosFilePath, JSON.stringify(demos, null, 2));
}

function removeItem(list, item) {
  const index = list.indexOf(item);
  if (index > -1) {
    list.splice(index, 1);
  }
}
