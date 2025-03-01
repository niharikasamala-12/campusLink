import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaClient, Role } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';


declare module "next-auth" {
  interface Session {
    user: {
      id: string; 
      name: string | null;
      email: string | null;
      image?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const prisma = new PrismaClient();

interface typerole { 
  roleGlobal : string 
}

let roleGlobal = "STUDENT"

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    session: { 
      strategy: 'jwt', 
    },
    providers: [
      Google({ 
        clientId: GOOGLE_CLIENT_ID, 
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        console.log(url)
        if(url.includes('ALUMNI')){ 
          roleGlobal = "ALUMNI" 
        } else { 
          roleGlobal = "STUDENT" 
        }
        console.log(roleGlobal)
        return url;
      },
      async signIn({ account, profile }) {
        if (!profile?.email) {
          throw new Error('No profile');
        }

        const userRole : Role | undefined = Role[roleGlobal as keyof typeof Role]
        
        if (userRole == Role.STUDENT) {
          await prisma.studentUser.upsert({
            where: { email: profile.email },
            create: { 
              email: profile.email, 
              name: profile.name || '', 
              role: userRole as Role, 
            },
            update: { 
              name: profile.name, 
            },
          });
        } else {
          await prisma.alumniUser.upsert({
            where: { email: profile.email },
            create: { 
              email: profile.email, 
              name: profile.name || '', 
              role: userRole as Role, 
            },
            update: { 
              name: profile.name, 
            },
          });
        }
        
        return true;
      },
      async jwt({ token, user, account, profile }) {
       
        if (account && profile) {
          let dbUser;
          if (roleGlobal === "STUDENT") {
            dbUser = await prisma.studentUser.findUnique({
              where: { email: profile.email as string }
            });
          } else {
            dbUser = await prisma.alumniUser.findUnique({
              where: { email: profile.email as string }
            });
          }

          if (dbUser) {
            
            token.id = String(dbUser.id);
          }
        }
        return token;
      },
      async session({ session, token }) {
        
        if (token) {
          
          session.user.id = String(token.id);
        }
        return session;
      },
    },
  });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {

  return await NextAuth(req, res, {
    session: { 
      strategy: 'jwt', 
    },
    providers: [
      Google({ 
        clientId: GOOGLE_CLIENT_ID, 
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        console.log(url)
        if(url.includes('ALUMNI')){ 
          roleGlobal = "ALUMNI" 
        } else { 
          roleGlobal = "STUDENT" 
        }
        console.log(roleGlobal)
        return url;
      },
      async signIn({ account, profile }) {
        if (!profile?.email) {
          throw new Error('No profile');
        }

        const userRole : Role | undefined = Role[roleGlobal as keyof typeof Role]
        
        if (userRole == Role.STUDENT) {
          await prisma.studentUser.upsert({
            where: { email: profile.email },
            create: { 
              email: profile.email, 
              name: profile.name || '', 
              role: userRole as Role, 
            },
            update: { 
              name: profile.name, 
            },
          });
        } else {
          await prisma.alumniUser.upsert({
            where: { email: profile.email },
            create: { 
              email: profile.email, 
              name: profile.name || '', 
              role: userRole as Role, 
            },
            update: { 
              name: profile.name, 
            },
          });
        }
        
        return true;
      },
      async jwt({ token, user, account, profile }) {
       
        if (account && profile) {
          let dbUser;
          if (roleGlobal === "STUDENT") {
            dbUser = await prisma.studentUser.findUnique({
              where: { email: profile.email as string }
            });
          } else {
            dbUser = await prisma.alumniUser.findUnique({
              where: { email: profile.email as string }
            });
          }

          if (dbUser) {
            
            token.id = String(dbUser.id);
          }
        }
        return token;
      },
      async session({ session, token }) {
        
        if (token) {
         
          session.user.id = String(token.id);
        }
        return session;
      },
    },
  });
}