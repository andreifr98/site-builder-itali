import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    
    return NextResponse.json({ 
      success: true,
      message: 'Database connected!',
      users: userCount 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
