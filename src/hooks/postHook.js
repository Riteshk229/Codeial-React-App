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
        console.log("bew",newPosts);
        setPosts(newPosts);
    };

    const removeComment = (postId, commentId) => {
        const newPosts = posts.map((post) => {

            if (post._id === postId) {
                const newComments = post.comments.filter((comment) => comment._id !== commentId);

                return {...post,comments : newComments}
            }
            return post;
        });
        setPosts(newPosts);
    }

    return {
        data: posts,
        loading,
        addPostToState,
        addComment,
        removeComment

    };
};