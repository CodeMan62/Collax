"use client"

import { signOut } from "next-auth/react"
import { Button } from "../components/ui/button"

export function SignOutButton() {
  return (
    <Button variant="outline" onClick={() => signOut({ callbackUrl: "/signin" })}>
      Sign Out
    </Button>
  )
}

