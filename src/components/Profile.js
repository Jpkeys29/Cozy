import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [userProfile, setUserProfile] = useState({
        id: '',
        name: '',
        email: '',
        photo: '',
        gender: '',
        occupation: ''
    });

    const navigate = useNavigate();

    const addUserProfile = async (userProfile) => {
        try {
            const response = await fetch(" ", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userProfile),
            });
            if (!response.ok) {
                throw new Error('POST request failed')
            }
            const jsonResponse = await response.json();
            const data = await jsonResponse;
            setUserProfile(data);

        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserProfile({...userProfile, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (

        <section className="about">
            <div className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-title">Profile</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-content">
                {/* <div className="container"> */}
                <div className="form-card">
                    <div className="form-card-content">
                        <label className="form-label"> Name: </label>
                        <input className="form-input"
                        />
                        <label className="form-label"> Email:</label>
                        <input className="form-input"
                        />
                        <label className="form-label"> Photo:</label>
                        <div className="avatar-upload">
                            <div className="avatar-preview" id="avatar-preview">
                                <img id="avatar-image" src="default-avatar.jpeg" alt="T" />
                            </div>
                            <input type="file" id="avatar-input" accept="image/*" onChange={null} />
                        </div>

                        <div >
                            <label className="form-label"> Gender:</label>
                            <div className="radio-group">
                                <label>
                                    <input type="radio" name="gender" value="female" />
                                    Female
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="male" />
                                    Male
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="other" />
                                    Other
                                </label>
                            </div>
                            <label className="form-label"> Ocupation:</label>
                            <div className="radio-group">
                                <label>
                                    <input type="radio" name="occupation" value="professional" />
                                    Professional
                                </label>
                                <label>
                                    <input type="radio" name="occupation" value="student" />
                                    Student
                                </label>
                                <label>
                                    <input type="radio" name="occupation" value="other" />
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </section>
    )
}

export default Profile


{/* <div className="title">
                                    Lorem ipsum dolor sit amet
                            </div> */}
{/* <div className="about-text">
                                    Lorem ipsum is simply free text dolor sit am adipi we help you ensure everyone is in the right jobs sicing elit, sed do consulting firms Et leggings across the nation tempor.
                            </div> */}