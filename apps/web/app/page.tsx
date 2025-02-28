import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { SignOutButton } from "../components/sign-out-button"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="absolute top-4 right-4">
        <SignOutButton />
      </div>
      
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 space-y-2 text-center">
          <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
            Collax
          </h1>
          <p className="text-lg text-purple-600">Your Smart Workspace</p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Welcome back, {session.user?.name}!
            </h2>
            <p className="text-lg text-gray-600">
              Signed in as {session.user?.email}
            </p>
            <div className="py-4">
              <hr className="mx-auto w-1/4 border-purple-200" />
            </div>
            <p className="text-gray-500">
              Start creating your pages and documents below
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

