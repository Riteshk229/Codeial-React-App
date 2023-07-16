import { useState } from 'react';
import styles from '../assets/styles/home.module.css'

const CreatePost = () => {
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);

    const handleAddPostClick = () => {
        setAddingPost(true);
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