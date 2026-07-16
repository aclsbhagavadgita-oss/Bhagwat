import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Chapter } from '@/lib/chapters';

const DATA_FILE = path.join(process.cwd(), 'data', 'chapters.json');

// Get all chapters
export async function GET() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const chapters = JSON.parse(data) as Chapter[];
    return NextResponse.json(chapters);
  } catch (error) {
    console.error("Failed to read chapters:", error);
    return NextResponse.json({ error: 'Failed to read chapters' }, { status: 500 });
  }
}

// Create or update a chapter
export async function POST(request: Request) {
  try {
    const newChapter = await request.json() as Chapter;

    // Fixed: number can be 0 so check for undefined/null specifically
    if (newChapter.number === undefined || newChapter.number === null || !newChapter.transliteratedTitle?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields: chapter number and title are required' },
        { status: 400 }
      );
    }

    let chapters: Chapter[] = [];
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      chapters = JSON.parse(data) as Chapter[];
    } catch {
      // File doesn't exist yet on server — start fresh
      console.log('chapters.json not found, creating at:', DATA_FILE);
      chapters = [];
    }

    // Ensure directory exists before writing (important for standalone deployments)
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const index = chapters.findIndex(ch => ch.number === newChapter.number);
    if (index >= 0) {
      // Update existing
      chapters[index] = { ...chapters[index], ...newChapter };
    } else {
      // Create new
      chapters.push(newChapter);
    }

    // Save back to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(chapters, null, 2));

    return NextResponse.json({ success: true, chapter: newChapter });
  } catch (error) {
    console.error("Failed to save chapter:", error);
    return NextResponse.json(
      { error: `Failed to save chapter: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

// Delete a chapter
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const number = searchParams.get('number');
    
    if (!number) {
      return NextResponse.json({ error: 'Missing chapter number' }, { status: 400 });
    }

    const data = fs.readFileSync(DATA_FILE, 'utf8');
    let chapters = JSON.parse(data) as Chapter[];
    
    chapters = chapters.filter(ch => ch.number !== Number(number));
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(chapters, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete chapter' }, { status: 500 });
  }
}
