import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

type Props = {
  params: {
    id: string;
  };
};

export async function POST(request: Request, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Verifica che il sito appartenga all'utente
    const site = await prisma.site.findUnique({
      where: { id },
    });

    if (!site) {
      return NextResponse.json(
        { error: 'Sito non trovato' },
        { status: 404 }
      );
    }

    if (site.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 403 }
      );
    }

    // Cambia stato pubblicazione
    const updatedSite = await prisma.site.update({
      where: { id },
      data: {
        published: !site.published, // Toggle
      },
    });

    return NextResponse.json({
      success: true,
      published: updatedSite.published,
    });

  } catch (error) {
    console.error('Publish site error:', error);
    return NextResponse.json(
      { error: 'Errore nella pubblicazione' },
      { status: 500 }
    );
  }
}
