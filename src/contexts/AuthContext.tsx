import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
    id: string;
  } | null;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user credentials - in production, this would be handled by a secure backend
const USER_CREDENTIALS = [
  {
    email: 'fortysixpluss@gmail.com',
    password: 'DiegoyNoah2006',
    name: 'Admin User',
    role: 'admin'
  },
  {
    email: 'fortysixpluss@gmail.com',
    password: 'user123',
    name: 'John Doe',
    role: 'user'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('fortysix_auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        const validUser = USER_CREDENTIALS.find(u => u.email === authData.email);
        if (validUser) {
          setState({
            isAuthenticated: true,
            user: {
              email: authData.email,
              name: authData.name,
              id: authData.email, // Use email as ID for simplicity
            }
          });
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
        localStorage.removeItem('fortysix_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    const user = USER_CREDENTIALS.find(u => u.email === email && u.password === password);
    
    if (user) {
      const authData = {
        email: user.email,
        name: user.name,
        id: user.email,
      };
      
      setState({
        isAuthenticated: true,
        user: authData
      });
      
      // Save to localStorage
      localStorage.setItem('fortysix_auth', JSON.stringify(authData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll just simulate account creation
    // In a real app, this would create a new account
    setIsLoading(false);
    return false; // Disabled for demo
  };

  const logout = async () => {
    setState({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('fortysix_auth');
  };

  return (
    <AuthContext.Provider value={{ state, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};