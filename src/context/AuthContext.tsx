import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (name: string, email: string) => void;
    logout: () => void;
    user: { name: string; email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
        const saved = localStorage.getItem('bricklane_user');
        return saved ? JSON.parse(saved) : null;
    });

    const isLoggedIn = !!user;

    const login = (name: string, email: string) => {
        const userData = { name, email };
        localStorage.setItem('bricklane_user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('bricklane_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
