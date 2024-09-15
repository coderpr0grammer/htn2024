import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const { accessToken } = await getAccessToken();
    
    const firebaseResponse = await fetch('YOUR_FIREBASE_FUNCTION_URL', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { firebaseToken } = await firebaseResponse.json();
    return NextResponse.json({ firebaseToken });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
