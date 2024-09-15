'use client'
import { createContext, useState, useContext, useEffect } from 'react';
import { GoogleAuthProvider, signInWithCustomToken, signInWithPopup, signOut } from 'firebase/auth'; // Import types from Firebase
import { getAccessToken } from '@auth0/nextjs-auth0';
import { AuthContextProps, User, UserData } from './auth.types';
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
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                await mergeUserData();
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);



    const getCurrentUserDocument = async () => {
        const user = auth.currentUser;

        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            try {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    return userDoc.data();
                } else {
                    console.log("No such document!");
                    return null;
                }
            } catch (error) {
                console.error("Error getting user document:", error);
                return null;
            }
        } else {
            console.error("No user is signed in");
            return null;
        }
    };

    const createUserDocument = async (data: UserData | null): Promise<void> => {

        const currentUser = auth.currentUser
        if (!currentUser) {
            console.error('User is null or undefined.');
            return;
        }

        const userRef = doc(db, 'users', currentUser.uid);

        try {
            const docData = await getCurrentUserDocument()
            if (!docData) {
                // Document does not exist, create it
                const createdAt = new Date();
                await setDoc(userRef, {
                    ...data,
                    createdAt
                });
            }
        } catch (error) {
            console.error('Error checking or creating user document:', error);
            throw error;
        }
    };


    const provider = new GoogleAuthProvider();


    const googleLogin = (): Promise<boolean> => {
        // Set the userTypeFromSignIn variable before calling signInWithPopup

        return signInWithPopup(auth, provider)
            .then(async (result) => {
                return createUserDocument({
                    name: result.user.displayName,
                    email: result.user.email,
                }).then(() => true)

            })
            .catch((error) => {
                console.error("Authentication error:", error.message);
                // Handle authentication errors as needed
                return Promise.reject(error); // Return a rejected promise
            });


    };

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
        });
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, googleLogin }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
