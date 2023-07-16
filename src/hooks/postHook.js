import { PostsContext } from "../provider";
import { getPosts } from "../api";
import { useContext, useEffect, useState } from "react";

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
    }, [posts]);

    const addPostToState = (post) => {
        const newPosts = [post, ...posts];

        setPosts(newPosts);
    }

    const addComment = (comment, postId) => {
        const newPosts = posts.map((post) => {

            if (post._id === postId) {
                return { ...post, comments: [...post.comments, comment] };
            }
            return post;
        });
        setPosts(newPosts);
    };

    return {
        data: posts,
        loading,
        addPostToState,
        addComment

    };
};