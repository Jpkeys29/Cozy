// import BlogItem from "./BlogItem"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { app } from "../firebase/config";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const PostRoom = () => {
    const [ roomPosting, setRoomPosting ] = useState({
        id:'',
        title:'',
        description:'',
        image:[],
        price:'',
        availability:'',
        area:'',
        neighborhood:'',
    })
    
    return (
        <section className="blog">
            <div className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-title">Post a Room</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="about">
                <div className="page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <img src="/img/product1.jpeg" alt="product" className="w-100" />
                            </div>
                            <div className="col-lg-6">
                                <div className="about-item">
                                    <div className="title">
                                        Lorem ipsum dolor sit amet
                                    </div>
                                    <div className="about-text">
                                        Lorem ipsum is simply free text dolor sit am adipi we help you ensure everyone is in the right jobs sicing elit, sed do consulting firms Et leggings across the nation tempor.
                                    </div>
                                    {/* <div className="about-features">
                                    <p className="about-feature"><i className="fas fa-long-arrow-alt-right"></i> Lorem ipsum is simply</p>
                                    <p className="about-feature" ><i className="fas fa-long-arrow-alt-right"></i> Lorem ipsum is simply</p>
                                    <p className="about-feature"><i className="fas fa-long-arrow-alt-right"></i> Lorem ipsum is simply</p>

                                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default PostRoom

// const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const auth = getAuth(app);
    //     console.log(auth)

    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             console.log(auth)
    //             // Signed up 
    //             const user = userCredential.user;
    //             // ...
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // ..
    //         });

    // }
