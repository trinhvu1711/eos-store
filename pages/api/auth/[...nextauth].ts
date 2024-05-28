import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8088/api/v1/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        // If login is successful, the data will contain the user and accessToken
        if (res.ok && data.accessToken && data.user) {
          return {
            ...data.user,
            accessToken: data.accessToken,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If it's the initial sign-in, add the accessToken to the token
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          ...user,
          id: Number(user.id),
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user and accessToken to the session
      session.user = token.user as any;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
});
