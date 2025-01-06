import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { baseURL } from "../utils/constant"
import { addUser } from "../utils/userSlice"
import { useDispatch } from "react-redux"



export const SignUp = () => {


    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSignup = async () => {
        try {

            const res = await axios.post(baseURL + "/signup", { firstName, lastName, email, password }, { withCredentials: true })


            navigate("/login")

        } catch (e) {
            setError(e.response.data)
            console.error(e.response.data)
        }
    }

    return <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
            <h2 className="card-title">SignUp Page</h2>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">First Name</span>

                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Last Name</span>

                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e) => setLastName(e.target.value)} />

            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Email</span>

                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={email} onChange={(e) => setEmail(e.target.value)} />

            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Password</span>

                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={password} onChange={(e) => setPassword(e.target.value)}
                />

            </label>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleSignup} >Sign up</button>
            </div>

        </div>
    </div>


}