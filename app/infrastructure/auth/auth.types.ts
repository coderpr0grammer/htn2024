import { User as FirebaseUser } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export interface AuthContextProps {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    googleLogin: () => Promise<boolean>;
    updateUserDocument: (data: UserData) => Promise<void>;
}

export type UserData = {
    [key: string]: any;
}

export type User = FirebaseUser & {
    data: UserData
}

