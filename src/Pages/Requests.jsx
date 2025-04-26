import axios from "axios"
import { useEffect, useState } from "react"
import { baseURL } from "../utils/constant"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"


const Requests = () => {
    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const getUserRequests = async () => {
        try {
            setIsLoading(true)
            const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
            const fetchRequest = await axios.get(baseURL + "/user/requests/recevied", { withCredentials: true })

            const [res] = await Promise.all([fetchRequest, minLoadingTime]);

            setRequests(res.data.data)
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRequest = async (status, requestId) => {
        try {
            await axios.post(baseURL + "/request/review/" + status + "/" + requestId, {}, { withCredentials: true })
            getUserRequests()
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getUserRequests()
    }, [])

    const showRequestProfile = (id) => {
        navigate("/user/" + id)
    }


    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-text-secondary font-medium">Loading requests...</p>
            </div>
        )
    }

    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent">No connection requests</h3>
                <p className="mt-2 text-text-secondary opacity-80">When someone wants to connect, you'll see their request here</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent">
                Connection Requests
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requests.map((request) => (
                    <div
                        key={request._id}
                        className="backdrop-blur-md bg-base-300 rounded-xl border border-primary shadow-lg p-6 transition-all duration-300 hover:bg-base-200"
                    >
                        <div className="flex items-center">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end blur-sm"></div>
                                <img
                                    src={request.fromUserId.photoUrl}
                                    alt={`${request.fromUserId.firstName}'s profile picture`}
                                    className="relative w-16 h-16 rounded-full object-cover border-2 border-badge cursor-pointer"
                                    style={{ aspectRatio: "1/1" }}
                                    onClick={() => showRequestProfile(request.fromUserId._id)}
                                />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-text-primary cursor-pointer" onClick={() => showRequestProfile(request.fromUserId._id)}>
                                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                                </h3>
                                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                                    {request.fromUserId.about || "No bio available"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => handleRequest("accepted", request._id)}
                                className="btn btn-primary px-6 rounded-full text-white hover:bg-primary-focus transition-all duration-200"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleRequest("rejected", request._id)}
                                className="btn btn-secondary px-6 rounded-full hover:bg-secondary-focus transition-all duration-200"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Requests