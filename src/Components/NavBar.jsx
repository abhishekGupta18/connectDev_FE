import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { baseURL } from "../utils/constant"
import { removeUser } from "../utils/userSlice"
import { removeFeed } from "../utils/feedSlice"
import { useState } from "react"

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((store) => store.user)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)



    const handleLogout = async () => {
        try {
            const res = await axios.post(baseURL + "/logout", {}, { withCredentials: true })
            dispatch(removeUser())
            dispatch(removeFeed())
            navigate("/login")
        } catch (e) {
            console.log(e)
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div className="bg-base-100 backdrop-blur-md shadow-lg py-3 px-4 relative">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div>
                    <Link to="/" className="text-xl font-bold text-primary">connectdev</Link>
                </div>

                {/* Mobile Menu Button */}
                {user && (
                    <button
                        className="md:hidden text-text-primary"
                        onClick={toggleMobileMenu}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                )}

                {/* Desktop Navigation Links */}
                {user && (
                    <div className="hidden md:flex space-x-6">
                        <Link to="/profile" className="text-text-primary hover:text-primary transition-colors">
                            Profile
                        </Link>
                        <Link to="/connections" className="text-text-primary hover:text-primary transition-colors">
                            Connections
                        </Link>
                        <Link to="/requests" className="text-text-primary hover:text-primary transition-colors">
                            Requests
                        </Link>
                        {!user.isPremium && <Link to="/premium" className="text-text-primary hover:text-primary transition-colors">
                            Premium
                        </Link>}
                        <Link to="/ask/ai" className="text-text-primary hover:text-primary transition-colors">
                            Ask AI
                        </Link>
                        <Link to="/jobs" className="text-text-primary hover:text-primary transition-colors">
                            Jobs
                        </Link>
                        <Link to="/events" className="text-text-primary hover:text-primary transition-colors">
                            Events
                        </Link>
                    </div>
                )}

                {/* User Avatar */}
                {user && (
                    <div className="relative group hidden md:block">
                        <button className="flex items-center focus:outline-none">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                                <img
                                    src={user.photoUrl}
                                    alt="User"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </button>

                        {/* Dropdown Menu - Only Logout Option */}
                        <div className="absolute right-0 mt-2 w-48 bg-base-200 backdrop-blur-md rounded-box shadow-lg py-1 z- invisible group-hover:visible transition-all">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-text-primary "
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {user && isMobileMenuOpen && (
                <div className="md:hidden mt-4 py-2 border-t border-primary">
                    <Link
                        to="/profile"
                        className="block py-2 text-text-primary hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Profile
                    </Link>
                    <Link
                        to="/connections"
                        className="block py-2 text-text-primary hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Connections
                    </Link>
                    <Link
                        to="/requests"
                        className="block py-2 text-text-primary hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Requests
                    </Link>
                    {!user.isPremiumb && <Link
                        to="/premium"
                        className="block py-2 text-text-primary hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Premium
                    </Link>}

                    <Link
                        to="/ask/ai"
                        className="block py-2 text-text-primary hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Ask AI
                    </Link>

                    <Link
                        to="/jobs"
                        className="block py-2 text-text-primary hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Jobs
                    </Link>
                    <Link
                        to="/events"
                        className="block py-2 text-text-primary hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Events
                    </Link>



                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary mr-2">
                                <img
                                    src={user.photoUrl}
                                    alt="User"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-text-primary">Your Account</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-primary hover:text-primary-focus z-20"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export { NavBar }