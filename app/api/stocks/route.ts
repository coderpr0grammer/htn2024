import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function GET(request: Request) {
  try {
    const response = await cohere.chat({
      message: `Provide a brief, concise summary of the 3 most important points in the latest news related to stocks (financial markets). Format the response as follows:
      1. First point.
      2. Second point.
      3. Third point.

      
      Include a catchy title before the numbered points.`,
      connectors: [{ id: 'web-search' }],
      maxTokens: 400,
    });

    const text = response.text;
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    const title = lines[0].replace(/^#\s*/, '');
    const points = lines.slice(1).filter(line => /^\d\./.test(line));

    const formattedPoints = points.slice(0, 5).map(point => {
      const [, content] = point.split('. ');
      return content;
    });

    const markdownContent = `# ${title}\n\n${formattedPoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}`;

    return NextResponse.json({ markdownContent });
  } catch (error) {
    console.error('Error fetching stock news:', error);
    return NextResponse.json({ error: 'Failed to fetch stock news' }, { status: 500 });
  }
}