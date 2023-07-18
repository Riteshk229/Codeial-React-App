import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../provider";
import { login as UserLogin, editProfile, fetchUserFriends, register} from "../api";
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


// custom hook to  provide login authorization
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    let friends = [];
    
    useEffect(() => {
        const getUser = async() =>{
            
            const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
            
            if (userToken) {
                const user = jwt(userToken);

                const response = await fetchUserFriends();        
                if (response.success) {
                    friends = response.data.friends
                } else {
                    friends = [];
                }

                setUser({
                    ...user,
                    friends,
                });
            }
            setLoading(false);
        }
        getUser();
    },[]);
    
    const updateUser = async (userId, name, password, confirmPassword) => {
        const response = await editProfile(userId, name, password, confirmPassword);

        if (response.success) {

            const friendList = await fetchUserFriends();
            let friends = [];
            if (friendList.success) {
                friends = friendList.data.friends
            } else {
                friends = [];
            }
            
            setUser({
                ...response.data.user,
                friends
            });
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null
            );

            return {
                success: true
            }
        } else {
            return {
                success: false,
                message: response.message
            }
        }
    };

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

    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
        if (response.success) {
            setUser(response.data.user);
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null
            );
                
            return {
                success: true
            }
        } else {
            return {
                success: false,
                message: response.message
            }
        }
    };

    const updateUserFriends = (action, friend) => {
        // action = true means adding the user as friends
        if (action) {
            setUser({
                ...user,
                friends: [...user.friends, friend]
            });
            return;
        }

        
        const friends = user.friends;
        const newFriends = friends.filter(
            (person) => person.to_user._id !== friend.to_user._id
        );
        // console.log(newFriends);
        setUser({
            ...user,
            friends: newFriends
        });
        return;

    };
        
    return {
        user,
        loading,
        logout,
        login,
        signup,
        updateUser,
        updateUserFriends
    };
}