// UserContext.tsx
import React, {createContext, useState, useEffect, ReactNode} from "react";

interface User {
    name: string;
    id: number;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined | any>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
};
