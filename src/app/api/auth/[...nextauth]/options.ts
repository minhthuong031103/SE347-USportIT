import { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
const prisma = new PrismaClient();

const options: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/login',
  },
};
export default options;
