import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signOut } = NextAuth({
  providers: [Google],
})
