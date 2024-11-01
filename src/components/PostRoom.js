// import BlogItem from "./BlogItem"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { app } from "../firebase/config";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import BlogItem from "./BlogItem";

const PostRoom = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        console.log(auth)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(auth)
                // Signed up 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }

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
            {/* <div className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-title">Profile</h1>
                        </div>
                    </div>
                </div>
            </div> */}
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
                                <div className="about-features">
                                    <p className="about-feature"><i className="fas fa-long-arrow-alt-right"></i> Lorem ipsum is simply</p>
                                    <p className="about-feature" ><i className="fas fa-long-arrow-alt-right"></i> Lorem ipsum is simply</p>
                                    <p className="about-feature"><i className="fas fa-long-arrow-alt-right"></i> Lorem ipsum is simply</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


            {/* <div className="page-content">
                <div className="container">
                    <div className="row">
                        <BlogItem link="blog-1" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                        <BlogItem link="blog-2" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                        <BlogItem link="blog-3" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                        <BlogItem link="blog-4" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                        <BlogItem link="blog-5" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                        <BlogItem link="blog-6" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                        <BlogItem link="blog-7" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                        <BlogItem link="blog-8" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                        <BlogItem link="blog-9" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                    </div>
                </div>
            </div> */}


        </section>
    )
}

export default PostRoom