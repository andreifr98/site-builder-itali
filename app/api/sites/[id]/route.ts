import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

type Props = {
  params: {
    id: string;
  };
};

// GET singolo sito
export async function GET(request: Request, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }

    const site = await prisma.site.findUnique({
      where: { id: params.id },
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

    return NextResponse.json({ site });

  } catch (error) {
    console.error('Get site error:', error);
    return NextResponse.json(
      { error: 'Errore nel recupero del sito' },
      { status: 500 }
    );
  }
}

// UPDATE sito
export async function PUT(request: Request, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { id } = params;

    // Verifica ownership
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

    // Update
    const updatedSite = await prisma.site.update({
      where: { id },
      data: {
        businessName: data.businessName,
        address: data.address || null,
        phone: data.phone,
        email: data.email,
        hours: data.hours || null,
        description: data.description || null,
        templateId: data.templateId,
      },
    });

    return NextResponse.json({
      success: true,
      site: updatedSite,
    });

  } catch (error) {
    console.error('Update site error:', error);
    return NextResponse.json(
      { error: 'Errore nell\'aggiornamento del sito' },
      { status: 500 }
    );
  }
}

// DELETE sito
export async function DELETE(request: Request, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Verifica ownership
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

    // Elimina
    await prisma.site.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error('Delete site error:', error);
    return NextResponse.json(
      { error: 'Errore nell\'eliminazione del sito' },
      { status: 500 }
    );
  }
}
