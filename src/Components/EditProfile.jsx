import { useState } from "react"
import { UserCard } from "./UserCard"
import axios from "axios"
import { baseURL } from "../utils/constant"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { Chips } from "primereact/chips"
import { FloatLabel } from "primereact/floatlabel";

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

            const res = await axios.post(baseURL + "/profile/edit", { firstName, lastName, photoUrl, about, gender, age, skills }, { withCredentials: true })
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



    return <div className="card bg-neutral text-neutral-content w-96  ">

        <div className="card-body items-center text-center">
            <h2 className="card-title">Edit Profile</h2>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">First name</span>

                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Last name</span>

                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e) => setLastName(e.target.value)}
                />

            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Photourl</span>

                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Age</span>

                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={age} onChange={(e) => setAge(e.target.value)} />

            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text ">About</span>
                </div>
                <textarea className="textarea textarea-bordered h-24" placeholder="Tell us about your self" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>

            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Gender</span>

                </div>
                <div className="flex justify-between">

                    <div className="flex align-middle space-x-2">
                        <span>male</span>

                        <input type="radio" name="radio-1" className="radio" value="male" checked={gender == "male"} onChange={handleGenderChange} />
                    </div>

                    <div className="flex align-middle space-x-2">
                        <span>female</span>

                        <input type="radio" name="radio-1" className="radio" value="female" checked={gender == "female"} onChange={handleGenderChange} />
                    </div>
                    <div className="flex align-middle space-x-2">
                        <span>others</span>

                        <input type="radio" name="radio-1" className="radio" value="others" checked={gender == "others"} onChange={handleGenderChange} />
                    </div>


                </div>

            </label>

            <div className="card p-fluid bg-white my-10 w-full text-black h-20">
                <FloatLabel>
                    <Chips id="username" value={skills} onChange={(e) => setSkills(e.value)} />
                    <label htmlFor="username">write your skiils and press enter after each skill </label>
                </FloatLabel>
            </div>

            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={editProfileHandler}>Save Changes</button>
            </div>
        </div>
        <div>
            <UserCard user={{ firstName, lastName, photoUrl, about, gender, age, skills }} />

        </div >
        {showToast && <div className="toast toast-top toast-center">

            <div className="alert alert-success">
                <span>Profile updated successfully!!</span>
            </div>
        </div>}
    </div >
}