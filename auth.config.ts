import type { NextAuthConfig } from "next-auth";

export default {
  providers: [], // we will configure providers in auth.ts
  pages: {
    signIn: "/admin/login",
  },
} satisfies NextAuthConfig;
