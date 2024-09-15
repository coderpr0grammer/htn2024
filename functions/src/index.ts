import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { CohereClient } from 'cohere-ai';

dotenv.config();

admin.initializeApp();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const COHERE_KEY = process.env.COHERE_KEY;

const cohere = new CohereClient({
  token: COHERE_KEY
});

// Function to create Firebase custom token using Firebase Functions v2
export const createFirebaseToken = functions.https.onRequest(async (req, res) => {
  const auth0Token = req.headers.authorization?.split(' ')[1]; // Extract the Auth0 access token

  if (!auth0Token) {
    res.status(400).json({ error: 'No Auth0 token provided' });
    return;
  }

  try {
    // Use Auth0's userinfo endpoint to get user details
    const auth0Response = await fetch(`${AUTH0_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${auth0Token}`,
      },
    });

    if (!auth0Response.ok) {
      res.status(400).json({ error: 'Invalid Auth0 token' });
      return;
    }

    const auth0User = await auth0Response.json() as any;

    if (!auth0User || !auth0User.sub) {
      res.status(400).json({ error: 'Invalid Auth0 user' });
      return;
    }

    const auth0UserId = auth0User.sub;

    // Create a custom Firebase token with the Auth0 user ID (sub)
    const firebaseToken = await admin.auth().createCustomToken(auth0UserId);

    res.status(200).json({ firebaseToken });
  } catch (error) {
    console.error('Error creating Firebase token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to perform web search using Cohere
export const interestWebSearch = functions.https.onRequest(async (req, res) => {
  try {
    let nextPageToken: string | undefined;
    const results: Array<{ uid: string; userResults: Array<{ interest: string; newsContent: string }> }> = [];

    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);

      // Iterate through each user
      for (const userRecord of listUsersResult.users) {
        const uid = userRecord.uid;
        const userDoc = await admin.firestore().collection('users').doc(uid).get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          const interests = userData?.interests;

          if (Array.isArray(interests)) {
            const userResults: Array<{ interest: string; newsContent: string }> = [];

            // For each interest, perform web search using Cohere
            for (const interest of interests) {
              const response = await cohere.chat({
                message: `Latest news on ${interest}`,
                connectors: [{ id: 'web-search' }],
              });

              const newsContent = response.text;

              userResults.push({
                interest,
                newsContent: newsContent.trim(),
              });
            }

            results.push({
              uid,
              userResults,
            });
          }
        }
      }

      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    res.status(200).json({ results });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
