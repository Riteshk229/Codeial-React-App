import PropTypes from 'prop-types';
import styles from '../assets/styles/home.module.css'

const Comments = ({ comments }) => {
    return (
        <div className={styles.postCommentList}>
            {comments.map(comment => 
                <div className={styles.postCommentItem} key={comment._id}>
                    <div className={styles.postCommentHeader}>
                        <span className={styles.postCommentAuthor}> { comment.user.name }</span>
                        <span className={styles.postCommentTime}>a minute ago</span>
                        <span className={styles.postCommentLikes}>
                            <i className="fa-regular fa-heart"></i> &nbsp;22
                        </span>
                    </div>

                    <div className={styles.postCommentContent}>{ comment.content }</div>
                </div>
                )}
            
        </div>
    );
} 

Comments.propTypes = {
    comments: PropTypes.array
}

export default Comments;