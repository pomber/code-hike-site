import fetch from "node-fetch";

async function fetchSponsors() {
  const githubUrl = "https://api.github.com/graphql";
  const token = process.env.GITHUB_TOKEN;
  const oauth = { Authorization: "bearer " + token };

  if (!token) {
    console.log("Missing process.env.GITHUB_TOKEN");
    return [];
  }

  return await fetch(githubUrl, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: oauth,
  })
    .then(function (response) {
      return response.json();
    })
    .then(({ data, errors }) => {
      if (errors) {
        console.error(JSON.stringify(errors));
        return;
      }
      const ghSponsors = data.organization.sponsorshipsAsMaintainer.nodes.map(
        (node) => node.sponsorEntity
      );
      return [...otherSponsors, ...ghSponsors.reverse()];
    })
    .catch((error) => {
      console.error("Error fetching sponsors", error);
    });
}

const query = `
{
  organization(login: "code-hike") {
    sponsorshipsAsMaintainer(last: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
      nodes {
        sponsorEntity {
          ... on User {
            name
            login
            avatarUrl(size: 128)
            location
            url
          }
          ... on Organization {
            avatarUrl(size: 128)
            login
            name
            location
            url
          }
        }
      }
    }
  }
}
`;

const otherSponsors = [
  {
    name: "Facebook Open Source",
    login: "facebook",
    avatarUrl:
      "https://images.opencollective.com/fbopensource/fbb8a5b/logo/256.png",
    location: "Menlo Park, California",
    url: "https://github.com/facebook",
  },
  {
    name: "Fran Méndez",
    login: "fmvilas",
    avatarUrl: "https://avatars.githubusercontent.com/u/242119?s=128&v=4",
    location: "Spain",
    url: "https://github.com/fmvilas",
  },
  {
    name: "Matthias Zepper",
    login: "MatthiasZepper",
    avatarUrl: "https://avatars.githubusercontent.com/u/6963520?s=128&v=4",
    location: "Germany",
    url: "https://github.com/matthiaszepper",
  },
];

fetchSponsors().then((s) => console.log(JSON.stringify(s, null, 2)));

process.on("unhandledRejection", (up) => {
  throw up;
});
