import styles from '../assets/styles/home.module.css'

const Home = ({posts}) => {
    return (
        <div className={styles.postList}>
            {posts.map(post => 
                <div className={styles.postWrapper} key={post._id}>
                <div className={styles.postHeader}>
                    <div className={styles.postAvatar}>
                        <img
                            src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600w-1773268634.jpg"
                            alt="user-pic"
                        />
                        <div>
                                <span className={styles.postAuthor}>{post.user.name}</span>
                            <span className={styles.postTime}>a minute ago</span>
                        </div>
                    </div>
                </div>
                    <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                    <div className={ styles.postLike}>
                        <i className="fa-regular fa-heart"></i>
                        <span>5</span>
                    </div>
                    <div className={ styles.postCommentsIcon}>
                        <i className="fa-regular fa-comments"></i>
                        <span>2</span>
                    </div>
                </div>
                <div className={styles.postCommentBox}>
                    <input placeholder="Write a comment...."/>
                </div>

                <div className={styles.postCommentLike}>
                    <div className={styles.postCommentItem}>
                        <div className={styles.postCommentHeader}>
                            <span className={styles.postCommentAuthor}>Akash</span>
                            <span className={styles.postCommentTime}>a minute ago</span>
                            <span className={styles.postCommentLikes}>22</span>
                        </div>

                        <div className={styles.postCommentContent}>Random</div>
                    </div>
                </div>
            </div>
            )};
        </div>
    )
}

export default Home;