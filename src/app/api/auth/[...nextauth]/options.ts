import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

export const options: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {},
    //   async authorize(credentials) {
    //     // This is where you need to retrieve user data
    //     // to verify with credentials
    //     // Docs: https://next-auth.js.org/configuration/providers/credentials
    //     const { username, password } = credentials as { username: string; password: string };
    //     const user = { id: '42', username: 'jin@gmail.com', password: 'Encorec8389!' };
    //     if (username === user.username && password === user.password) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   }
    // })
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      authorize: async (credentials) => {
        const { username, password } = credentials as { username: string; password: string };
        const url = `http://localhost:3500/auth`;
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' }
        });
        const user = await res.json();
        console.log('123', user);
        if (res.ok && user.message !== 'Unauthorized') {
          return user;
        } else {
          return null;
        }
        // return null;
      }
    })
  ],
  pages: {
    signIn: '/signin'
  }
};
