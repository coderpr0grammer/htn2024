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
      message: `1. You are an expert that is providing helpful finance insights relative to the following topic: ${interest}.
      2. Provide a brief and concise summary of the latest stock market news, focusing on major indices and trending stocks. 
      3. Use bullet points to group important information together. 
      4. Include a catchy title.
      5. You must respond in MARKDOWN formatting to make the summary easy to read.
      `,
      connectors: [{ id: 'web-search' }],
      maxTokens: 200,
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