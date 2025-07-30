// Temporary mock Prisma client for development
// This will be replaced once the actual Prisma client is generated

export interface User {
  id: string
  email: string
  name?: string | null
  image?: string | null
  emailVerified?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Account {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string | null
  access_token?: string | null
  expires_at?: number | null
  token_type?: string | null
  scope?: string | null
  id_token?: string | null
  session_state?: string | null
}

export interface Session {
  id: string
  sessionToken: string
  userId: string
  expires: Date
}

export interface VerificationToken {
  identifier: string
  token: string
  expires: Date
}

// Mock PrismaClient
export class PrismaClient {
  user = {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      // Mock implementation - in development, return null to prevent errors
      return null
    },
    create: async ({ data }: { data: Partial<User> }) => {
      // Mock implementation
      return {
        id: "mock-id",
        email: data.email!,
        name: data.name || null,
        image: null,
        emailVerified: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }
  }

  account = {
    // Mock account methods
  }

  session = {
    // Mock session methods
  }

  verificationToken = {
    // Mock verification token methods
  }
}