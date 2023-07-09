import { useContext, useState } from "react"
import { AuthContext } from "../provider";
import { login as UserLogin } from "../api";



export const useAuth = () => {
    return useContext(AuthContext);
}


// custo hook to  providelogin authorization
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async(email, password) => {
        const response = await UserLogin(email, password);

        if (response.success) {
            setUser(response.data.user);
            return {
                success : true
            }
        } else {
            return {
                success: false,
                message : response.message
            }
        }
    };

    const logout = () => {
        setUser(null);
    };

    return {
        user,
        loading,
        logout,
        login
    }
}