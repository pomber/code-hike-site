import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: "https://github.com/login/oauth/authorize?scope=", // needed to remove scope added by next-auth
      profile: (p) => {
        // console.log({ p });
        return {
          id: p.id,
          name: p.login,
          email: "",
          image: p.avatar_url,
        };
      },
    }),
  ],
});
