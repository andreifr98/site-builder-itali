import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // Verifica autenticazione
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    const {
      category,
      businessName,
      address,
      phone,
      email,
      description,
      hours,
      subdomain,
      templateId,
    } = data;

    // Validazione
    if (!businessName || !phone || !email || !subdomain || !category) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 }
      );
    }

    // Controlla se subdomain è già in uso
    const existingSite = await prisma.site.findUnique({
      where: { subdomain }
    });

    if (existingSite) {
      return NextResponse.json(
        { error: 'Questo nome sito è già in uso. Scegline un altro.' },
        { status: 400 }
      );
    }

    // Crea il sito
    const site = await prisma.site.create({
      data: {
        userId: session.user.id,
        businessName,
        category,
        address: address || null,
        phone,
        email,
        hours: hours || null,
        description: description || null,
        templateId: templateId || 1,
        subdomain: subdomain.toLowerCase(),
        published: false,
      }
    });

    return NextResponse.json({
      success: true,
      site: {
        id: site.id,
        subdomain: site.subdomain,
        businessName: site.businessName,
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Create site error:', error);
    return NextResponse.json(
      { error: 'Errore nella creazione del sito' },
      { status: 500 }
    );
  }
}
