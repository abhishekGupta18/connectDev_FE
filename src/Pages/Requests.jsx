import axios from "axios"
import { useEffect, useState } from "react"
import { baseURL } from "../utils/constant"

export const Requests = () => {

    const [requests, setRequests] = useState([])



    const getUserRequests = async () => {


        try {


            const res = await axios.get(baseURL + "/user/requests/recevied", { withCredentials: true })
            setRequests(res.data.data)
        } catch (e) {
            console.error(e)
        }
    }

    const handleRequest = async (status, requestId) => {


        try {

            const res = await axios.post(baseURL + "/request/review/" + status + "/" + requestId, {}, { withCredentials: true })
            getUserRequests()

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getUserRequests()
    }, [])



    if (requests.length == 0) return <h3>No requests found</h3>
    return (
        <div >

            <h1 className="text-4xl text-bold justify-center flex my-4">Requests</h1>
            <div className="flex  flex-col items-center justify-center "> {
                requests && requests.map((request) => <div key={request._id} className="my-4 p-6 bg-base-300">

                    <img src={request.fromUserId
                        .photoUrl} alt="image of user" className="w-20 h-20 m-3 rounded-full " />
                    <p key={request._id}>{request.fromUserId
                        .firstName} {request.fromUserId
                            .lastName}</p>
                    <p>{request.fromUserId
                        .about}</p>
                    <div className=" flex gap-4">
                        <button className=" bg-white btn-secondary p-1" onClick={() => handleRequest("accepted", request._id)}>Accept</button>
                        <button className=" bg-white btn-secondary p-1" onClick={() => handleRequest("rejected", request._id)}>Reject</button>
                    </div>
                </div>)
            }
            </div>
        </div>
    )
}