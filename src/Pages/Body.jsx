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

    // Routes configuration
    const publicOnlyRoutes = ["/", "/login", "/signup"]
    const hideFooterFromRoutes = ["/login", "/signup", "/"]
    const hideNavbarFromRoutes = ["/"]

    const fetchUser = async () => {
        try {
            const res = await axios.get(baseURL + "/profile/view", { withCredentials: true })
            dispatch(addUser(res.data))


            if (publicOnlyRoutes.includes(location.pathname)) {
                navigate("/feed")
            }
        } catch (e) {
            if (e.response && e.response.status === 401) {
                if (!publicOnlyRoutes.includes(location.pathname)) {
                    navigate("/")
                }
            }
            console.log(e)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    // Route protection logic
    useEffect(() => {

        if (userData && userData._id) {
            if (publicOnlyRoutes.includes(location.pathname)) {
                navigate("/feed")
            }
        }
        // If user is NOT logged in and tries to access protected routes
        else if (location.pathname !== "/" && !publicOnlyRoutes.includes(location.pathname)) {
            navigate("/")
        }
    }, [location.pathname, userData])

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