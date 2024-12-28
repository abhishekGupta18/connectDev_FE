import { useState } from "react"

import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/constant";

export const Login = () => {

    const [email, setEmail] = useState("virat@gmail.com");
    const [password, setPassword] = useState("Virat@123")

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleClick = async () => {

        try {

            const res = await axios.post(baseURL + "/login", { email, password }, { withCredentials: true });
            dispatch(addUser(res.data))
            navigate("/")


        } catch (e) {
            console.log(e)
        }


    }


    return <>
        <div className="card bg-neutral text-neutral-content w-96">
            <div className="card-body items-center text-center">
                <h2 className="card-title">LOGIN PAGE</h2>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email</span>

                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />

                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Password</span>

                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />

                </label>

                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={handleClick}>Login</button>
                </div>
            </div>
        </div>
    </>


}