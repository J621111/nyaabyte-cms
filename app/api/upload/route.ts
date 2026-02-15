import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/github';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // 检查认证
    const auth = await requireAuth();
    if (!auth.success) {
      return auth.response;
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large (max 5MB)' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to GitHub
    const url = await uploadImage(file.name, buffer);

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
