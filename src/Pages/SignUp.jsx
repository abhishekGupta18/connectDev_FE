import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { baseURL } from "../utils/constant"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

import { InputOtp } from 'primereact/inputotp';
import { Loader2 } from "lucide-react"


const SignUp = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [otpBox, setOtpBox] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNavigateToLogin = () => navigate("/login")


    const [otp, setOtp] = useState();

    const customInput = ({ events, props }) => {
        return <input {...events} {...props} type="text" className="custom-otp-input" />
    };

    const handleSignup = async () => {
        try {
            setOtpBox(false)
            const res = await axios.post(baseURL + "/signup", { firstName, lastName, email, password }, { withCredentials: true })

            dispatch(addUser(res.data.data))
            navigate("/profile")
        } catch (e) {
            setError(e.response?.data || "Signup failed")
            setOtpBox(false)
            console.error(e.response?.data)
        }
    }

    const handleSendOtp = async () => {
        try {
            setError("")
            setIsLoading(true)
            const res = await axios.post(baseURL + "/send-otp", { firstName, lastName, email, password }, { withCredentials: true })

            setOtpBox(true)
            setTimeout(() => {
                setOtpBox(false)
            }, 240000);

        } catch (e) {
            setIsLoading(false)
            console.log(e.response.data.error)
            setError(e.response.data.error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOtp = async () => {
        try {
            setError("")
            const res = await axios.post(baseURL + "/verify-otp", { email, otp })
            if (res.status === 200) {
                handleSignup()
            }

        } catch (e) {
            console.log(e)
            setError(e.response.data.error)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end p-4">
            <div className="card w-full max-w-md bg-translucent-30 backdrop-blur-md shadow-xl rounded-box border border-primary">
                <div className="card-body p-8">
                    <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Create Account</h2>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-text-primary">First Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="input bg-translucent-20 border-primary text-text-primary w-full rounded-btn"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-text-primary">Last Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="input bg-translucent-20 border-primary text-text-primary w-full rounded-btn"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

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
                                placeholder="Create a password"
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

                    {/* Show loading spinner, sign up button, or OTP box based on state */}
                    {isLoading ? (
                        <div className="flex flex-col justify-center items-center">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            <p className="mt-4 text-text-secondary font-medium">Sending OTP...</p>
                        </div>
                    ) : otpBox ? (
                        <div className="card otp-container">
                            <style jsx>{`
                                @keyframes smoothFadeIn {
                                    from { opacity: 0; transform: translateY(5px); }
                                    to { opacity: 1; transform: translateY(0); }
                                }
                                
                                .otp-container {
                                    animation: smoothFadeIn 0.5s ease-out;
                                }
                                
                                .custom-otp-input {
                                    width: 32px;
                                    height: 38px;
                                    font-size: 16px;
                                    text-align: center;
                                    margin: 0 3px;
                                    background: rgba(255, 255, 255, 0.2);
                                    border: 1px solid rgba(255, 255, 255, 0.3);
                                    border-radius: 0.4rem;
                                    color: #111827;
                                    transition: all 0.3s ease;
                                }
                                
                                .custom-otp-input:focus {
                                    outline: none;
                                    box-shadow: 0 0 0 2px #4f46e5;
                                    background: rgba(255, 255, 255, 0.3);
                                }
                                
                                @media (max-width: 640px) {
                                    .custom-otp-input {
                                        width: 28px;
                                        height: 34px;
                                        font-size: 14px;
                                        margin: 0 2px;
                                    }
                                }
                                
                                .otp-button {
                                    transition: all 0.3s ease;
                                    font-size: 0.875rem;
                                    padding: 0.5rem 1rem;
                                    border-radius: 1.5rem;
                                }
                                
                                .resend-button {
                                    color: #4f46e5;
                                    background: transparent;
                                    border: none;
                                    cursor: pointer;
                                    font-size: 0.875rem;
                                    padding: 0;
                                    transition: all 0.3s ease;
                                }
                                
                                .resend-button:hover {
                                    text-decoration: underline;
                                }
                                
                                .submit-button {
                                    background-color: #4f46e5;
                                    color: white;
                                    border: none;
                                    border-radius: 1.5rem;
                                    padding: 0.5rem 1.25rem;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                }
                                
                                .submit-button:hover {
                                    background-color: #4338ca;
                                }
                            `}</style>
                            <div className="flex flex-col items-center w-full">
                                <h3 className="font-bold text-lg text-text-primary mb-1">Authenticate Your Account</h3>
                                <p className="text-text-secondary text-sm text-center mb-4">Please enter the code sent to your email. OTP will expire after 4 minutes</p>

                                <div className="flex justify-center my-2">
                                    <InputOtp
                                        value={otp}
                                        onChange={(e) => setOtp(e.value)}
                                        length={6}
                                        inputTemplate={customInput}
                                    />
                                </div>

                                <div className="flex justify-between w-full mt-3">
                                    <button className="resend-button" onClick={handleSendOtp}>
                                        Resend Code
                                    </button>
                                    <button className="submit-button" onClick={handleVerifyOtp}>
                                        Submit OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary text-primary-content w-full rounded-btn mt-2"
                            onClick={handleSendOtp}
                        >
                            Sign Up
                        </button>
                    )}

                    <div className="divider text-text-secondary text-sm">OR</div>

                    <p className="text-center text-text-secondary mt-4">
                        Already have an account?{" "}
                        <span
                            className="text-button-primary-text cursor-pointer hover:underline"
                            onClick={handleNavigateToLogin}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp