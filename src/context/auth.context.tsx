import { createContext, PropsWithChildren, useCallback, useContext, useReducer, useState } from "react";

interface AuthContextType {
  isConnected: boolean;
  login: () => void;
}

interface AuthStateType {
  isConnected: boolean;
  user: { id: number, name: string } | null;
}

const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [data, dispatch] = useReducer((state: AuthStateType, action: { type: 'login' }) => { 
    switch (action.type) {
      case 'login':
        return { ...state, isConnected: true, user: { id: 1, name: 'Fake user' } }
      default:
        return state;
    }
   }, { isConnected: false, user: null });

  const login = useCallback(() => { dispatch({ type: 'login' }) }, []);
  
  return <AuthContext.Provider value={{ isConnected: data.isConnected, login }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
