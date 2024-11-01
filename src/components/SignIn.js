// import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';

const SignIn = ({ setUser }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        let email = data.get("email")
        let password = data.get("password")
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                setUser(user)
            })
            .catch((error) => {
                console.log("error:", error)
            })
    }

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            isValid = false
        }
        if (!password.value || password.value.length < 6) {
            isValid = false
        }

        return isValid
    }

    return (
        <div className="form-card">
            <h2 className="form-card-title">SigIn</h2>
            <form className="form-card-content" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label
                        className="form-label"
                    >Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn-submit" onClick={validateInputs}>Login</button>
                <p>Don't have an account? </p>
                <span>
                    <Link component={RouterLink} to={"/signup"} >SignUp</Link>{" "}
                </span>


            </form>
        </div>
    )
}

export default SignIn;