import { cohere } from '@ai-sdk/cohere';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { text } = await generateText({
      model: cohere('command-r-plus'),
      prompt: 'Provide a brief summary of the latest stock market news, focusing on major indices and trending stocks. Include a catchy title. Limit the summary to 4-5 sentences maximum. Do not use any markdown formatting or prefixes like "Title:".',
      temperature: 0.7,
      maxTokens: 100,
    });

    const cleanText = text.replace(/[#*]/g, '').trim();
    let [title, ...descriptionParts] = cleanText.split('\n\n');
    
    // Remove "Title:" prefix if present
    title = title.replace(/^Title:\s*/i, '').trim();
    
    const description = descriptionParts.join('\n\n').trim();

    return NextResponse.json({ title, description });
  } catch (error) {
    console.error('Error fetching stock news:', error);
    return NextResponse.json({ error: 'Failed to fetch stock news' }, { status: 500 });
  }
}