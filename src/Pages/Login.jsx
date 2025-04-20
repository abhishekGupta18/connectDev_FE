import { useState } from "react"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { baseURL } from "../utils/constant"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isloading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNavigate = () => navigate("/signup")

    const handleClick = async () => {
        try {
            // Add loading state if you have one
            setIsLoading(true);

            const res = await axios.post(
                baseURL + "/login",
                { email, password },
                { withCredentials: true }
            );

            // Check if response data exists and contains user info
            if (res.data) {
                // Store token in localStorage as fallback
                if (res.data.token) {
                    localStorage.setItem('authToken', res.data.token);
                }

                // Dispatch action with the user data
                dispatch(addUser(res.data.data));

                // Small delay to ensure Redux state is updated
                setTimeout(() => {
                    navigate("/feed");
                }, 100);
            } else {
                setError("Login successful but no user data received");
            }
        } catch (e) {
            console.error("Login error:", e);
            setError(e.response?.data || "Login failed");
        } finally {
            setIsLoading(false);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end p-4">
            <div className="card w-full max-w-md bg-translucent-30 backdrop-blur-md shadow-xl rounded-box border border-primary">
                <div className="card-body p-8">
                    <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Welcome Back</h2>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text text-text-primary">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input bg-translucent-20 border-primary text-text-primary w-full rounded-btn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text text-text-primary">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="input bg-translucent-20 border-primary text-text-primary w-full pr-10 rounded-btn"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-error text-sm mt-1 mb-4">{error}</p>}

                    <button
                        className="btn btn-primary text-primary-content w-full rounded-btn mt-2"
                        onClick={handleClick}
                    >
                        Login
                    </button>

                    <div className="divider text-text-secondary text-sm">OR</div>

                    <p className="text-center text-text-secondary mt-4">
                        Don't have an account?{" "}
                        <span
                            className="text-button-primary-text cursor-pointer hover:underline"
                            onClick={handleNavigate}
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login