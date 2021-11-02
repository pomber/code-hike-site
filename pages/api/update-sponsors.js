const nodeBtoa = (b) => Buffer.from(b).toString("base64");

export default async function triggerSponsorsWorkflow(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  await fetch(
    "https://api.github.com/repos/pomber/code-hike-site/actions/workflows/update-sponsors.yml/dispatches",
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.everest-preview+json",
        "Content-Type": "application/json",
        Authorization:
          "Basic " + nodeBtoa("pomber:" + process.env.TRIGGER_ACTION_PAT),
      },
      body: JSON.stringify({ ref: "main" }),
    }
  );
  res.status(200).send("OK");
}
