import { createContext } from "react";
import { useProvideAuth } from "../hooks";

const initialState = {
    user: null,
    login: () => { },
    logout: () => { },
    loading: true
}

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ childern }) => {
    const auth = useProvideAuth();
    
    return (
        <AuthContext.Provider value={auth}>
            {childern}
        </AuthContext.Provider>
        ); 
    }