import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `form-submission-${timestamp}.json`;
    const filePath = path.join(process.cwd(), 'app/data', fileName);

    // Ensure data directory exists
    await writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving form data:', error);
    return NextResponse.json(
      { error: 'Failed to save form data' },
      { status: 500 }
    );
  }
}