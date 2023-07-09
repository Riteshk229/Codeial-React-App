import { createContext } from "react";
import { useProvideAuth } from "../hooks";


// setting the initial value of our context
const initialState = {
    user: null,
    login: () => { },
    logout: () => { },
    loading: true
}

// creating and exporting context with initial value
export const AuthContext = createContext(initialState);


// providing the context to those component who uses it
export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>
            {children}
            </AuthContext.Provider>;
};
