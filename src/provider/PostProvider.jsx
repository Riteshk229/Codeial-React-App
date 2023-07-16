import { createContext } from "react";
import { useProvidePosts } from "../hooks";

// setting the initial value of our context
const initialState = {
    posts: [],
    loading: true,
}

// creating and exporting context with initial value
export const PostsContext = createContext(initialState);

// providing the context to those component who uses it
export const PostProvider = ({children}) => {
    const posts = useProvidePosts();

    return <PostsContext.Provider value={posts}>
        {children}
    </PostsContext.Provider>;
}