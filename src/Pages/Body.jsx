import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { NavBar } from "../Components/NavBar"
import axios from "axios"
import { baseURL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect, useState } from "react"
import Footer from "../Components/Footer"

const Body = () => {
    const userData = useSelector((store) => store.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [authChecked, setAuthChecked] = useState(false)

    // Routes configuration
    const publicOnlyRoutes = ["/", "/login", "/signup"]
    const hideFooterFromRoutes = ["/login", "/signup", "/"]
    const hideNavbarFromRoutes = ["/"]

    const fetchUser = async () => {
        try {
            const res = await axios.get(baseURL + "/profile/view", { withCredentials: true })
            dispatch(addUser(res.data))
            setAuthChecked(true)
        } catch (e) {
            // Clear user data on authentication errors
            if (e.response && e.response.status === 401) {
                dispatch(addUser(null))
            }
            setAuthChecked(true)
            console.log(e)
        }
    }


    useEffect(() => {
        fetchUser()
    }, [])


    useEffect(() => {

        if (!authChecked) return


        if (userData && userData._id) {
            // Redirect away from public-only routes
            if (publicOnlyRoutes.includes(location.pathname)) {
                navigate("/feed")
            }
        }
        // User is NOT logged in
        else {

            if (!publicOnlyRoutes.includes(location.pathname)) {
                navigate("/")
            }
        }
    }, [location.pathname, userData, authChecked, navigate])

    return (
        <div className="flex flex-col min-h-screen">
            {!hideNavbarFromRoutes.includes(location.pathname) && <NavBar />}
            <main className="flex-grow">
                <Outlet />
            </main>
            {!hideFooterFromRoutes.includes(location.pathname) && <Footer />}
        </div>
    )
}

export default Body