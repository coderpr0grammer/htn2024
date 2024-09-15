import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const interest = searchParams.get('interest');

  if (!interest) {
    return NextResponse.json({ error: 'Interest parameter is required' }, { status: 400 });
  }

  try {
    const response = await cohere.chat({
      message: `Provide a brief summary of the latest news related to ${interest}, focusing on major developments and trends. Include a catchy title.`,
      connectors: [{ id: 'web-search' }],
    });

    const text = response.text;
    const cleanText = text.replace(/[#*]/g, '').trim();
    let [title, ...descriptionParts] = cleanText.split('\n\n');
    
    title = title.replace(/^Title:\s*/i, '').trim();
    const description = descriptionParts.join('\n\n').trim();

    return NextResponse.json({ title, description });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}