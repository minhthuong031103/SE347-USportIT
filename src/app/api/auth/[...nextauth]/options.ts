import { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
const options: AuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
    }),

    GithubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) throw new Error('Email or password is incorrect');
        if (user.password !== password)
          throw new Error('Email or password is incorrect');
        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user.id,
          image: user.image,
        };
      },
    }),

    // ...add more providers here
  ],

  callbacks: {
    //first it run the jwt function, the jwt function will return the token , then in the session function we can access the token
    async jwt({ token, user }) {
      //user is from the oauth config or in the credentials setting options
      if (user?.role) {
        token.role = user.role;
        token.id = user.id;
        token.image = user.image;
      }

      //return final token
      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { image: string }).image = token.image as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};
export default options;
