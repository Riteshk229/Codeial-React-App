import PropTypes from 'prop-types';
import styles from '../assets/styles/home.module.css'
import { CreatePost, FriendsList, Posts } from '../components'
import {Loader} from '../components';
import { useAuth, usePosts } from '../hooks';
import { Link } from 'react-router-dom';

const Home = () => {
    const auth = useAuth();
    const posts = usePosts();

    // console.log(posts);

    if (posts.loading) {
        return <Loader />;
    }
    
    return (
        <div className={styles.home}>
            <div className={styles.postsList}>
                <CreatePost/>
                {posts.data.map(post => 
                    <Posts post={post} key={`post-${post._id}`}/>
                )}
            </div>
            {auth.user && <FriendsList />}
        </div>
    )
}

// Home.propTypes = {
//     posts: PropTypes.array.isRequired
// }

export default Home;