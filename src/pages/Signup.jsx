import { useState } from "react";
import { useToasts } from 'react-toast-notifications';
import { useNavigate , Navigate} from 'react-router-dom';
import { useAuth } from "../hooks";
import styles from '../assets/styles/login.module.css'; 
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signingUp, setSigningUp] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToasts();

    // console.log(navigate);

    const handleFormSumbit = async (e) => {
        e.preventDefault();
        setSigningUp(true);

        let error = false;
        if (!email || !name || !confirmPassword || !password) {

            addToast("Please enter all the fields",{
                    appearance: 'error',
                    autoDismiss: true
                }
            )
            error = true;
        }

        if (confirmPassword !== password) {
            addToast("Please enter the same password in confirm password",{
                    appearance: 'error',
                    autoDismiss: true
                }
            )
            error = true;
        }

        if (error) {
            return setSigningUp(false);
        }

        const response = await auth.signup(name, email, password, confirmPassword);
        
        if (response.success) {
            navigate('/login')
            setSigningUp(false);
            addToast("Successfully Signed In please Log In to continue!!", {
                appearance: "success"
            })
        } else {
            addToast(response.message, {
                appearance: 'error'
            })
        }

    }

    if (auth.user) {
        return <Navigate to="/" />
    }

    return (
           <form className={styles.loginForm} onSubmit={handleFormSumbit}>
            <span className={styles.loginSignupHeader}> Sign up</span>
            
            <div className={styles.field}>
                <input
                    type='name'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className={styles.field} >
                <button disabled ={signingUp} >
                    {signingUp ?"Signing in...": "Sign Up"}
                </button>
            </div>
        </form>
    );
}

export default Signup;