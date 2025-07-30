"use client"

import { Button } from "@collax/ui/components/ui/button"
import AuthNav from "@/components/auth-nav"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Page() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Collax</h1>
            </div>
            <div className="flex items-center">
              <AuthNav />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Collax
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your collaborative note-taking platform
          </p>
          
          {session ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Hello, {session.user?.name || session.user?.email}!
              </h2>
              <p className="text-gray-600 mb-4">
                You are successfully authenticated. Ready to start taking notes?
              </p>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Go to Dashboard
                  </Button>
                </Link>
                <Button variant="outline">
                  Create Your First Note
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Get Started Today
              </h2>
              <p className="text-gray-600 mb-6">
                Sign up or sign in to start creating and collaborating on notes.
              </p>
              <div className="space-x-4">
                <Link href="/auth/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
