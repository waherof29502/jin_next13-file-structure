import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const { username, password } = credentials as { username: string; password: string };
        const user = { id: '42', username: 'jin@gmail.com', password: 'encorec8389' };

        if (username === user.username && password === user.password) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        // Note that this if condition is needed
        token.user = { ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        // Note that this if condition is needed
        session.user = token.user;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin'
  }
};
