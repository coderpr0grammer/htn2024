import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function GET() {
  try {
    const response = await cohere.chat({
      message: 'Provide a brief summary of the latest stock market news, focusing on major indices and trending stocks. Include a catchy title.',
      connectors: [{ id: 'web-search' }],
    });

    const text = response.text;
    const cleanText = text.replace(/[#*]/g, '').trim();
    let [title, ...descriptionParts] = cleanText.split('\n\n');
    
    title = title.replace(/^Title:\s*/i, '').trim();
    const description = descriptionParts.join('\n\n').trim();

    return NextResponse.json({ title, description });
  } catch (error) {
    console.error('Error fetching stock news:', error);
    return NextResponse.json({ error: 'Failed to fetch stock news' }, { status: 500 });
  }
}