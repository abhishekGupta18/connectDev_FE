import axios from "axios"
import { baseURL } from "../utils/constant"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateUserWithPremium } from "../utils/userSlice"

const Premium = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)
    const handlePayment = async (type) => {
        try {
            const order = await axios.post(baseURL + "/payment/create", {
                membershipType: type
            }, {
                withCredentials: true
            })


            const { keyId, amount, currency, orderId, notes } = order.data

            const options = {
                key: keyId, // Replace with your Razorpay key_id
                amount,
                currency,
                name: "connectDev",
                description: 'membership transaction',
                order_id: orderId,
                prefill: {
                    name: notes.firstName + " " + notes.lastName,
                    email: notes.email,
                },
                theme: {
                    color: '#F37254'
                },
                handler: function (response) {
                    verifyPayment(orderId)
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (e) {
            console.log(e)
            alert("Failed to initiate payment. Please try again.");
        }
    }

    const verifyPayment = async (orderId) => {

        try {

            const response = await axios.post(baseURL + "/payment/verify", { orderId }, { withCredentials: true });

            if (response.data.success) {
                dispatch(updateUserWithPremium())
                navigate("/")
                alert("Payment successfull!!")


            } else {
                alert("Payment verification failed please contact support");
            }

        } catch (e) {
            console.log(e)
            alert("Payment verification failed please contact support");
        }

    }


    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent">
                Premium Membership
            </h1>

            <div className="flex w-full flex-col lg:flex-row gap-8">
                {/* Silver Plan */}
                <div className="backdrop-blur-md bg-base-300 rounded-xl border border-primary shadow-lg p-8 transition-all duration-300 hover:bg-base-200 flex-1 flex flex-col">
                    <div className="flex-grow flex flex-col items-center text-center">
                        <div className="h-16 w-16 rounded-full bg-translucent-40 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-text-primary mb-4">Silver Plan</h2>

                        <div className="text-3xl font-bold mb-6 text-text-secondary">
                            <span className="opacity-70 text-lg">3</span> Months
                        </div>

                        <ul className="space-y-3 mb-8 text-text-secondary">
                            <li className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-success" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Ask your doubts using AI
                            </li>
                            <li className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-success" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                3 months access
                            </li>
                            <li className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-success" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="flex items-center">
                                    Blue tick
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <button
                        className="btn btn-secondary w-full rounded-full mt-auto"
                        onClick={() => handlePayment("silver")}
                    >
                        Buy Silver
                    </button>
                </div>

                {/* Gold Plan */}
                <div className="backdrop-blur-md bg-base-300 rounded-xl border-2 border-accent shadow-lg p-8 transition-all duration-300 hover:bg-base-200 flex-1 flex flex-col relative overflow-hidden">
                    {/* Recommended Badge */}
                    <div className="absolute top-5 right-5">
                        <div className="bg-gradient-to-r from-gradient-start to-gradient-middle px-3 py-1 rounded-full text-white text-xs font-semibold">
                            Recommended
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col items-center text-center">
                        <div className="h-16 w-16 rounded-full bg-translucent-40 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-text-primary mb-4">Gold Plan</h2>

                        <div className="text-3xl font-bold mb-6 text-text-secondary">
                            <span className="opacity-70 text-lg">6</span> Months
                        </div>

                        <ul className="space-y-3 mb-8 text-text-secondary">
                            <li className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-success" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Ask your doubts using AI
                            </li>
                            <li className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-success" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                6 months access
                            </li>
                            <li className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-success" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="flex items-center">
                                    Blue tick
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <button
                        className="btn btn-primary w-full rounded-full mt-auto"
                        onClick={() => handlePayment("gold")}
                    >
                        Buy Gold
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Premium