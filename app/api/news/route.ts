import { cohere } from '@ai-sdk/cohere';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { text } = await generateText({
      model: cohere('command-r-plus'),
      prompt: 'Provide a brief summary of the latest stock market news, focusing on major indices and trending stocks. Include a catchy title.',
      // Add temperature and max_tokens parameters
      temperature: 0.7,
      maxTokens: 300,
    });

    const [title, ...descriptionParts] = text.split('\n\n');
    const description = descriptionParts.join('\n\n');

    return NextResponse.json({ title, description });
  } catch (error) {
    console.error('Error fetching stock news:', error);
    return NextResponse.json({ error: 'Failed to fetch stock news' }, { status: 500 });
  }
}