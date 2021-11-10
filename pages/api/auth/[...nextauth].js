import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: "https://github.com/login/oauth/authorize?scope=", // needed to remove scope added by next-auth

      profile: async (p) => {
        const orgs = await fetchUserOrgs(p.login);
        // console.log({ p });
        return {
          id: p.id,
          name: p.login,
          email: "",
          image: p.avatar_url,
          orgs,
        };
      },
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (user && user.orgs && !token.orgs) {
        token.orgs = user.orgs;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.orgs = token.orgs;
      return session;
    },
  },
});

async function fetchUserOrgs(login) {
  const res = await fetch(`https://api.github.com/users/${login}/orgs`);
  const orgs = await res.json();
  return orgs.map((o) => o.login);
}
