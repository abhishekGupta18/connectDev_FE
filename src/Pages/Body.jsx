import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { NavBar } from "../Components/NavBar"
import axios from "axios"
import { baseURL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
import Footer from "../Components/Footer"

const Body = () => {
    const userData = useSelector((store) => store.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const hideFooterFromRoutes = ["/login", "/signup"]

    const fetchUser = async () => {
        try {
            const res = await axios.get(baseURL + "/profile/view", { withCredentials: true })
            dispatch(addUser(res.data))
        } catch (e) {
            //navigate("/login")
            if (e.status === 401) {
                navigate("/login")
            }
            console.log(e)
        }
    }

    useEffect(() => {
        if (!userData) {
            fetchUser()
        }
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            {!hideFooterFromRoutes.includes(location.pathname) && <Footer />}
        </div>
    )
}

export default Body