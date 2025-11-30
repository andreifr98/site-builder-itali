import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }

    const sites = await prisma.site.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        businessName: true,
        category: true,
        subdomain: true,
        published: true,
        views: true,
        createdAt: true,
        templateId: true,
      }
    });

    return NextResponse.json({ sites });

  } catch (error) {
    console.error('Get sites error:', error);
    return NextResponse.json(
      { error: 'Errore nel recupero dei siti' },
      { status: 500 }
    );
  }
}
