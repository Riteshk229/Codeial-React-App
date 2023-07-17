import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../assets/styles/home.module.css';
import { toggleLike } from '../api';
import { useToasts } from 'react-toast-notifications';

const Comment = ({ comment }) => {
    const [liking, setLiking] = useState(false);
    const { addToast } = useToasts();

    const handlePostLikeClick = async () => {
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
    return (<>
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
                        onClick={handlePostLikeClick}
                        disabled ={liking}
                    >
                        <i className="fa-regular fa-heart"></i>
                    </button>
                    <span>{ comment.likes.length }</span>
                </div>
                </div>
            </>
  );
} 

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default Comment;