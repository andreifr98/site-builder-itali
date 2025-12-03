// app/api/sites/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    // ✅ Verificare autenticazione
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ✅ Ricevere file
    const formData = await req.formData()
    const file = formData.get('file') as File
    const imageType = formData.get('type') as string // 'logo' o 'hero'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // ✅ Validare file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Must be image' }, { status: 400 })
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    // ✅ Creare path unico
    const timestamp = Date.now()
    const userEmail = session.user.email.split('@')[0]
    const filename = `${userEmail}/${imageType}/${timestamp}-${file.name}`

    // ✅ Convertire file a Buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // ✅ Upload su Supabase Storage
    const { data, error } = await supabase.storage
      .from('site-images')
      .upload(filename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true,
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // ✅ Generare URL pubblica
    const {
      data: { publicUrl },
    } = supabase.storage.from('site-images').getPublicUrl(data.path)

    return NextResponse.json({
      success: true,
      imageUrl: publicUrl,
      path: data.path,
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
