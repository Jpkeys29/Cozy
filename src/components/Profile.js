import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getAuth, getIdToken } from "firebase/auth"

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
            const formData = new FormData();

            Object.entries(userProfile).forEach(([key, value]) => {
                formData.append(key, value);
            })

            const response = await fetch("http://127.0.0.1:5000/api/add_profile", {
                method: 'POST',
                body: formData
                // headers: {
                //     'Content-Type': 'application/json'
                //     // 'Authorization': `Bearer ${token}`
                // },
                // body: JSON.stringify(userProfile),
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`POST request failed: ${errorText}`)
                throw new Error('POST request failed')
            }
            const jsonResponse = await response.json();
            const data = await jsonResponse;
            setUserProfile(data);
        navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserProfile(prevState => ({
                    ...prevState,
                    photo: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUserProfile(userProfile)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserProfile({ ...userProfile, [name]: value })
    }

    const handleRadioButton = (e) => {
        const { name, value } = e.target
        setUserProfile({
            ...userProfile, [name]: value,
        })
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
                        <input
                            className="form-input"
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                            required
                        />
                        <label className="form-label"> Email:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="email"
                            onChange={handleInputChange}
                            required
                        />
                        <label className="form-label"> Photo:</label>
                        <div className="avatar-upload">
                            <input
                             type="file"
                              id="avatar-input"
                               accept="image/*" 
                               onChange={handlePhotoUpload} />
                        </div>

                        <div >
                            <label className="form-label"> Gender:</label>
                            <div
                                className="radio-group"
                                onChange={handleRadioButton}
                            >
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
                            <div
                                className="radio-group"
                                onChange={handleRadioButton}
                            >
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
                        <button onClick={handleSubmit}>Create</button>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </section>
    )
}

export default Profile


