import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../assets/styles/home.module.css';
import { deleteComment, toggleLike } from '../api';
import { useToasts } from 'react-toast-notifications';
import { useAuth, usePosts } from '../hooks';

const Comment = ({ comment }) => {
    // console.log(comment);
    const auth = useAuth();
    const posts = usePosts();
    const [liking, setLiking] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const { addToast } = useToasts();

    const handleCommentLikeClick = async () => {
        setLiking(true);
        const response = await toggleLike(comment._id, "Comment");
        
        if (response.success) {

            if (response.data.deleted) {
                addToast('Like removed successfully!!', {
                    appearance: "success"
                })
            } else {
                addToast('Like removed successfully!!', {
                    appearance: "success"
                })
            }
        } else {
            addToast(response.message, {
                appearance: "error"
            })
        }
        setLiking(false);
    }

    const handleCommentDeleteClick =  async() => {
        setDeleting(true);
        const response = await deleteComment(comment._id);
        if (response.success) {
            // posts.removeComment(comment.post,comment._id);
            addToast('Comment deleted Successfully', {
                appearance : 'success'
            })
        } else {
            addToast(response.message, {
                appearance : 'error'
            })
        }
        setDeleting(false);
    }

    return (
        <div className={styles.postCommentsItem}>
            <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>{comment.user.name}</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>22</span>
            </div>
                    
            <div className={styles.postCommentContent}>
                {comment.content}
            </div>
            
            <div className={styles.postLike}>
                <button
                    className={styles.actionBtn}
                    onClick={handleCommentLikeClick}
                    disabled ={liking}
                >
                    <i className="fa-regular fa-heart"></i>
                </button>
                
                <span>{comment.likes.length}</span>

                {comment.user._id == auth.user._id && 
                    <button
                        className={styles.actionBtn}
                        onClick={handleCommentDeleteClick}
                        disabled ={deleting}
                    >
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                }
                
                </div>
                </div>
  );
} 

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default Comment;