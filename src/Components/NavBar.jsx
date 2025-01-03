import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { baseURL } from "../utils/constant"
import { removeUser } from "../utils/userSlice"
import { removeFeed } from "../utils/feedSlice"

const NavBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((store) => store.user)

    const handleLogout = async () => {
        try {

            const res = await axios.post(baseURL + "/logout", { withCredentials: true })
            dispatch(removeUser())

            navigate("/login")


        } catch (e) {
            console.log(e)
        }
    }


    return <div className="navbar bg-base-100">
        <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
        </div>
        <div className="flex-none gap-2">
            <div className="form-control">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>
            {user && <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src={user.photoUrl}
                        />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <Link to="/profile" className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </Link>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>}
        </div>
    </div >

}

export { NavBar }