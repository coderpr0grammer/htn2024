import { User as FirebaseUser } from "firebase/auth";

export interface AuthContextProps {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

export type User = FirebaseUser & {
    data: {
        //any key value pair
        [key: string]: any;
    }
}
