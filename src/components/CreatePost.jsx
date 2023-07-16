import { useState } from 'react';
import styles from '../assets/styles/home.module.css'
import { useToasts } from 'react-toast-notifications';
import { addPost } from '../api';

const CreatePost = () => {
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);
    const { addToast } = useToasts();

    const handleAddPostClick = async() => {
        setAddingPost(true);

        if (post.length == 0) {
            addToast("Cannot Create an Empty post please write something", {
                appearance : "error"
            })
            return setAddingPost(false);
            
        }

        const response = await addPost(post);
        if (response.success) {
            setPost('');
            addToast("Post created succesfully", {
                appearance : "success"
            })
        } else {
            addToast(response.message, {
                appearance: "error"
            })
        }

        setAddingPost(false);
    };

    return (
        <div className={styles.createPost}>
            <textarea
                className={styles.addPost}
                value={post}
                onChange={(e) => setPost(e.target.value)}
                placeholder='Write here to create a post...'
            />

            <div>
                <button
                    className={styles.addPostBtn}
                    onClick={handleAddPostClick}
                    disabled={addingPost}
                >
                    { addingPost ? 'Adding Post...' : 'Add Post'}
                </button>
            </div>
        </div>)
}

export default CreatePost;