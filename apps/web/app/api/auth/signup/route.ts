import { NextRequest, NextResponse } from "next/server"
// Use mock client temporarily until Prisma generation works
import { PrismaClient } from "@collax/prisma/src/mock"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    // Create user (in production, hash the password)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        // Note: In production, hash the password before storing
        // password: await bcrypt.hash(password, 12)
      }
    })

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}