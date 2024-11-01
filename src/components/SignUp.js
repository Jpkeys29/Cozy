import { auth } from "../firebase/config"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
// import { error } from "webpack-dev-server/lib/utils/colors";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom'



const SignUp = ({ setUser }) => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        let email = data.get("email")
        let password = data.get("password")
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                setUser(user)
                navigate('/')
            })
            .catch((error) => {
                console.log("error:", error)
            })
    }

    const validateInputs = () => {
        const email = document.getElementById("email")
        const password = document.getElementById("password")

        let isValid = true

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            isValid = false
        }
        if (!password.value || password.value.length < 6) {
            isValid = false
        }

        return isValid
    }

    // const handleGoogleSignUp = () => {
    //     const provider = new GoogleAuthProvider()
    //     signInWithPopup(auth, provider)
    //     .then((result) => {
    //         console.log(result.user)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

    return (
        <div>
            <div className="form-card">
                <h2 className="form-card-title">SignUp</h2>
                <form className="form-card-content" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label
                            className="form-label"
                        >Email</label>
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
                    <button type="submit" className="btn-submit" onClick={validateInputs}>SignUp</button>
                </form>
            </div>



        </div>
    )
}

export default SignUp;