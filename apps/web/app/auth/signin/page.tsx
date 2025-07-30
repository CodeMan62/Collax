"use client"

import { signIn } from "next-auth/react"
import { Button } from "@collax/ui/components/ui/button"
import { useState } from "react"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    })
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Collax
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your collaborative note-taking platform
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center py-2 px-4"
            variant="outline"
          >
            Sign in with Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleCredentialsSignIn}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4"
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}