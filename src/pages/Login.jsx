import { useState } from 'react';
import styles from '../assets/styles/login.module.css';
import { useToasts } from 'react-toast-notifications'; 
import { login } from '../api';
    
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const {addToast} = useToasts();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoggedIn(true);
        if (!email || !password) {
             addToast("Please enter both : Email and Password !!", {
                appearance: 'error',
            })
        }
        else {
            const response = await login(email, password);
            
            if (response.success) {
                    addToast("Successfully Logged in !!!", {
                    appearance : "success"
                })
            } else {
                    addToast(response.message, {
                    appearance: 'error'
                })
            }
            setLoggedIn(false);
        }
    }

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader}> Log In</span>

            <div className={styles.field}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={()=>setLoggedIn(false)}
                />
            </div>

            <div className={styles.field}>
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={()=>setLoggedIn(false)}
                />
            </div>

            <div className={styles.field} >
                <button disabled={loggedIn}>
                    {loggedIn ?"Logging in...": "Log In"}
                </button>
            </div>
        </form>
    )
}

export default Login;