import { useState } from "react"
import { UserCard } from "./UserCard"
import axios from "axios"
import { baseURL } from "../utils/constant"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { Chips } from "primereact/chips"

export const EditProfile = ({ user }) => {
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState(user.age)
    const [about, setAbout] = useState(user.about)
    const [gender, setGender] = useState(user.gender)
    const [skills, setSkills] = useState(user.skills)

    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return
        const formData = new FormData();

        if (file) {
            formData.append("file", file)
            formData.append("upload_preset", "connectDev")
            formData.append('cloud_name', "dmmqvo37i");
        }

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dmmqvo37i/image/upload',
                formData
            );
            setPhotoUrl(response.data.secure_url);
        } catch (e) {
            console.log(e.response || e.message || e)
        }
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    const editProfileHandler = async () => {
        try {
            setError("")
            const res = await axios.post(
                baseURL + "/profile/edit",
                { firstName, lastName, photoUrl, about, gender, age, skills },
                { withCredentials: true }
            )
            dispatch(addUser(res.data.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2000)
        } catch (e) {
            setError(e.response.data)
            console.error(e.response.data)
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-6 rounded-xl bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end">
            <div className="w-full lg:w-1/2 backdrop-blur-lg bg-translucent-30 rounded-xl shadow-xl p-6 border border-primary">
                <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">Edit Your Profile</h2>

                <div className="space-y-4">
                    {/* First name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">First Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input  w-full bg-translucent-40 border-primary"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    {/* Last name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Last Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input  w-full bg-translucent-40 border-primary"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    {/* Photo upload */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Profile Photo</span>
                        </label>
                        <div className="flex items-center space-x-4">
                            {photoUrl && (
                                <div className="h-16 w-16 rounded-full overflow-hidden">
                                    <img src={photoUrl} alt="Profile" className="h-full w-full object-cover" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input file-input-bordered bg-translucent-40 border-primary w-full max-w-xs"
                            />
                        </div>
                    </div>

                    {/* Age */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Age</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input  w-full bg-translucent-40 border-primary"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    {/* About */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">About</span>
                        </label>
                        <textarea
                            className="textarea  h-24 w-full bg-translucent-40 border-primary"
                            placeholder="Tell us about yourself"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Gender */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Gender</span>
                        </label>
                        <div className="flex justify-between bg-translucent-40 rounded-lg p-3 border border-primary">
                            <div className="flex items-center space-x-2">
                                <span>Male</span>
                                <input
                                    type="radio"
                                    name="radio-1"
                                    className="radio"
                                    value="male"
                                    checked={gender === "male"}
                                    onChange={handleGenderChange}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <span>Female</span>
                                <input
                                    type="radio"
                                    name="radio-1"
                                    className="radio"
                                    value="female"
                                    checked={gender === "female"}
                                    onChange={handleGenderChange}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <span>Others</span>
                                <input
                                    type="radio"
                                    name="radio-1"
                                    className="radio"
                                    value="others"
                                    checked={gender === "others"}
                                    onChange={handleGenderChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Skills - IMPROVED UI */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Skills</span>
                        </label>
                        <div className="bg-translucent-40 rounded-lg border border-primary p-4">
                            {/* Custom styling to ensure Chips component is clearly visible */}
                            <div className="p-chips-container">
                                <style jsx>{`
                                    /* Ensure the chips component has proper contrast */
                                    :global(.p-chips) {
                                        width: 100%;
                                        background: rgba(255, 255, 255, 0.8) !important;
                                        border-radius: 0.5rem !important;
                                        padding: 0.5rem !important;
                                    }
                                    :global(.p-chips-token) {
                                        background: #4f46e5 !important;
                                        color: white !important;
                                    }
                                    :global(.p-chips-input-token) {
                                        width: 100%;
                                    }
                                    :global(.p-chips-input-token input) {
                                        width: 100% !important;
                                        padding: 0.5rem !important;
                                    }
                                `}</style>
                                <Chips
                                    id="skills"
                                    value={skills}
                                    onChange={(e) => setSkills(e.value)}

                                />
                            </div>
                            <p className="text-text-secondary text-sm mt-2">Enter your skills one by one and press Enter after each</p>
                        </div>
                    </div>

                    {/* Error message */}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Save button */}
                    <div className="card-actions justify-end">
                        <button
                            className="btn btn-primary"
                            onClick={editProfileHandler}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* UserCard for preview */}
            <div className="w-full lg:w-1/2 backdrop-blur-lg bg-translucent-30 rounded-xl shadow-xl border border-primary overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">Profile Preview</h2>
                    <UserCard user={{ firstName, lastName, photoUrl, about, gender, age, skills }} />
                </div>
            </div>

            {/* Toast notification */}
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile updated successfully!!</span>
                    </div>
                </div>
            )}
        </div>
    )
}