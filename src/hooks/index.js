import { useContext, useEffect, useState } from "react"
import { AuthContext,PostsContext } from "../provider";
import { login as UserLogin, editProfile, getPosts, register} from "../api";
import {
    setItemInLocalStorage,
    LOCALSTORAGE_TOKEN_KEY,
    removeItemFromLocalStorage,
    getItemFromLocalStorage
} from "../utils";
import jwt from "jwt-decode";



export const useAuth = () => {
    return useContext(AuthContext);
}


// custo hook to  provide login authorization
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        
        if (userToken) {
            const user = jwt(userToken);
            
            setUser(user);
        }
        setLoading(false);
    }, []);
    
    const updateUser = async (userId, name, password, confirmPassword) =>{
        const response = await editProfile(userId, name, password, confirmPassword);

        if (response.success) {
            setUser(response.data.user);
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null
            );

            return {
                success : true
            }
        } else {
            return {
                success: false,
                message : response.message
            }
        }
    }

    const login = async(email, password) => {
        const response = await UserLogin(email, password);
        
        console.log("response ",response)
        if (response.success) {
            setUser(response.data.user);
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null
                );
                
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
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };

    const signup = async (name,email,password,confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
        if (response.success) {
            setUser(response.data.user);
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null
                );
                
                return {
                    success : true
                }
            } else {
                return {
                    success: false,
                    message : response.message
                }
            }
    }
        
    return {
        user,
        loading,
        logout,
        login,
        signup,
        updateUser
    }
    

    }
    
    
    export const usePosts = () => {
        return useContext(PostsContext);
    }
    
    export const useProvidePosts = () => {
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        
        useEffect(() => {
            const fetchPosts = async () => {
                const response = await getPosts();
                
                if (response.success) {
                    setPosts(response.data.posts);
                }
                
                setLoading(false);
            };
            
            fetchPosts();
        }, []);

        return {
            data: posts,
            loading
        }
    }