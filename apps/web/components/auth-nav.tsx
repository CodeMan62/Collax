"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@collax/ui/components/ui/button"
import Link from "next/link"

export default function AuthNav() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          Welcome, {session.user?.name || session.user?.email}
        </span>
        <Button
          onClick={() => signOut()}
          variant="outline"
          size="sm"
        >
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Link href="/auth/signin">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </Link>
      <Link href="/auth/signup">
        <Button size="sm">
          Sign Up
        </Button>
      </Link>
    </div>
  )
}