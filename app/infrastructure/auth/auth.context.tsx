import { createContext, useState, useContext, useEffect } from 'react';
import { signInWithCustomToken, signOut } from 'firebase/auth'; // Import types from Firebase
import { getAccessToken } from '@auth0/nextjs-auth0';
import { AuthContextProps, User } from './auth.types';
import { auth, db } from '@/lib/firebaseConfig';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';



const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const authenticateUser = async () => {
            setLoading(true);

            // Get the Auth0 access token
            const { accessToken } = await getAccessToken();

            // Call the backend API to exchange Auth0 token for Firebase custom token
            const response = await fetch('/api/getFirebaseToken', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const { firebaseToken } = await response.json();
            if (firebaseToken) {
                // Sign in with the Firebase token
                const firebaseUser = await signInWithCustomToken(auth, firebaseToken);

               await mergeUserData();
                // Create or fetch custom user data from Firestore using web modular sdk
                const userRef = doc(db, 'users', firebaseUser.user?.uid);
                const docSnap = await getDoc(userRef);


                if (!docSnap.exists) {
                    // If user doesn't exist, create a new user document
                    await setDoc(userRef, {
                        email: firebaseUser.user?.email,
                        createdAt: serverTimestamp(),
                    });

                }

                // Fetch custom user data
                const userDoc = await getDoc(userRef);
            }

            setLoading(false);
        };

        authenticateUser();
    }, []);

    // Logout function
    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    const mergeUserData = async () => {
        if (!auth.currentUser) return;
      
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
      
        const docData = userDoc.data() || {};
      
        // Ensure you're passing the correct User object structure
        setUser({
          ...auth.currentUser, // keep the existing user structure
          data: docData, // add the new data from Firestore
        } );
      };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
