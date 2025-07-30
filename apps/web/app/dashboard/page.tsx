"use client"

import { useSession } from "next-auth/react"
import AuthNav from "@/components/auth-nav"
import { Button } from "@collax/ui/components/ui/button"

import Link from "next/link"

export default function Dashboard() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">Collax</Link>
            </div>
            <div className="flex items-center">
              <AuthNav />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session?.user?.name || session?.user?.email}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Notes</h2>
            <p className="text-gray-600 mb-4">Manage your personal notes</p>
            <Button className="w-full">View Notes</Button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Shared Notes</h2>
            <p className="text-gray-600 mb-4">Collaborate with others</p>
            <Button className="w-full" variant="outline">View Shared</Button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New</h2>
            <p className="text-gray-600 mb-4">Start a new note</p>
            <Button className="w-full" variant="secondary">New Note</Button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <p className="text-gray-600">Your recent notes and collaborations will appear here.</p>
        </div>
      </main>
    </div>
  )
}