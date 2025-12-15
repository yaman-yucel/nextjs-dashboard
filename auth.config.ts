import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60, // 5 seconds - sessions expire after 5 seconds (for testing)
    updateAge: 30, // Update session on every request (required when maxAge is very short)
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLoginPage = nextUrl.pathname === '/login';
      
      if (isOnLoginPage) {
        // Allow access to login page regardless of auth status
        return true;
      }
      console.log('isLoggedIn', isLoggedIn);
      console.log('isOnDashboard', isOnDashboard);
      console.log('isOnLoginPage', isOnLoginPage);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      // Add custom expiration logic here if needed
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // NextAuth handles expiration automatically via maxAge
      // No need for manual expiration check
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;