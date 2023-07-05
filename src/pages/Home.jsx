const Home = () => {
    return (
        <div className="posts-list">
            <div className="post-wrapper">
                <div className="post-header">
                    <div className="post-avatar">
                        <img
                            src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600w-1773268634.jpg"
                            alt="user-pic"
                        />
                    </div>
                    <span className="post-author">Ritesh</span>
                    <span className="post-time">a minute ago</span>
                </div>
                <div className="post-content">Post Content</div>

                <div className="post-actions">
                    <div className="post-like">
                        <i class="fa-regular fa-heart"></i>
                        <span>5</span>
                    </div>
                    <div className="post-comments-icon">
                        <i class="fa-regular fa-comments"></i>
                        <span>2</span>
                    </div>
                </div>
                <div className="post-comment-box">
                    <input placeholder="Write a comment...."/>
                </div>

                <div className="post-comments-list">
                    <div className="post-comments-item">
                        <div className="post-comment-header">
                            <span className="post-comment-author">Akash</span>
                            <span className="post-comment-time">a minute ago</span>
                            <span className="post-comment-likes">22</span>
                        </div>

                        <div className="post-comment-content">Random</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;