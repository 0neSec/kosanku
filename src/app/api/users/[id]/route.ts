import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateUserUpdateInput } from '@/utils/validation';
import { UserUpdateInput, UserUpdateParams } from '@/types/users';

export async function PUT(
  req: NextRequest, 
  context: { params: Promise<UserUpdateParams> } // Update params to Promise type
) {
  try {
    const { id } = await context.params; // Await params before accessing properties
    const body: UserUpdateInput = await req.json();

    // Validate input
    validateUserUpdateInput(body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: 'User not found' }, 
        { status: 404 }
      );
    }

    // Check for duplicate email or phone number
    if (body.email || body.noWa) {
      const duplicateCheck = await prisma.user.findFirst({
        where: {
          OR: [
            body.email ? { email: body.email } : {},
            body.noWa ? { noWa: body.noWa } : {}
          ],
          NOT: { id }
        }
      });

      if (duplicateCheck) {
        return NextResponse.json(
          { message: 'Email or phone number already in use' }, 
          { status: 409 }
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: body
    });

    // Remove password from response
    const { password: _, ...userResponse } = updatedUser;

    return NextResponse.json(
      { 
        message: 'User updated successfully', 
        user: userResponse 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('User update error:', error);
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
