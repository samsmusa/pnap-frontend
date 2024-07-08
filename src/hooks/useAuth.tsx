import React, {createContext, useContext, useMemo, ReactNode, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocalStorage} from './useLocalStorage';

// Define the shape of the context value
interface AuthContextType {
    user: any;
    loading: boolean;
    login: (data: any) => Promise<void>;
    logout: () => void;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the shape of the AuthProvider props
interface AuthProviderProps {
    children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = React.useState<any | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [localUser, setLocalUser] = useLocalStorage<any>('user');
    const navigate = useNavigate();

    useEffect(() => {
        if (localUser) {
            setUser(localUser);
        }
        setLoading(false);
    }, [localUser]);

    // call this function when you want to authenticate the user
    const login = async (data: any) => {
        setLocalUser(data);
        setUser(data);
        navigate('/dashboard');
    };

    // call this function to sign out logged-in user
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/', {replace: true});
    };

    const value = useMemo(
        () => ({
            user,
            loading,
            login,
            logout,
        }),
        [user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
