import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import UnpublishedSite from '@/components/templates/UnpublishedSite';
import Template1 from '@/components/templates/Template1';
import Template2 from '@/components/templates/Template2';
import Template3 from '@/components/templates/Template3';
import Template4 from '@/components/templates/Template4';

type Props = {
  params: {
    subdomain: string;
  };
};

async function getSiteData(subdomain: string) {
  try {
    const site = await prisma.site.findUnique({
      where: { subdomain },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!site) {
      return null;
    }

    if (site.published) {
      await prisma.site.update({
        where: { id: site.id },
        data: { views: { increment: 1 } },
      });
    }

    return site;
  } catch (error) {
    console.error('Error fetching site:', error);
    return null;
  }
}

export default async function PublicSitePage({ params }: Props) {
  const site = await getSiteData(params.subdomain);

  if (!site) {
    notFound();
  }

  // Sito non pubblicato
  if (!site.published) {
    return <UnpublishedSite />;
  }

  // Prepara i dati per i template
  const siteData = {
    businessName: site.businessName,
    category: site.category,
    description: site.description,
    phone: site.phone,
    email: site.email,
    address: site.address,
    hours: site.hours,
  };

  // Seleziona il template
  switch (site.templateId) {
    case 1:
      return <Template1 site={siteData} />;
    case 2:
      return <Template2 site={siteData} />;
    case 3:
      return <Template3 site={siteData} />;
    case 4:
      return <Template4 site={siteData} />;
    default:
      return <Template1 site={siteData} />;
  }
}
