import { useContext, useEffect, useState } from "react"
import { AuthContext,PostsContext } from "../provider";
import { login as UserLogin, getPosts } from "../api";
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


// custo hook to  providelogin authorization
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
    
    const login = async(email, password) => {
        const response = await UserLogin(email, password);
        
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
        
        return {
            user,
            loading,
            logout,
            login
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