// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateUserInput } from '@/utils/validation';
import { hashPassword } from '@/utils/hash';
import { UserInput } from '@/types/users';

export async function POST(req: NextRequest) {
  try {
    const body: UserInput = await req.json();

    // Validate input
    validateUserInput(body);

    const { name, email, password, noWa, desa, kecamatan, kabupaten, role } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { noWa: noWa }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email or phone number already exists' }, 
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        noWa,
        desa,
        kecamatan,
        kabupaten,
        role
      }
    });

    // Remove password from response
    const { password: _, ...userResponse } = newUser;

    return NextResponse.json(
      { 
        message: 'User registered successfully', 
        user: userResponse 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
