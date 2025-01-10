import axios from "axios"
import { baseURL } from "../utils/constant"
import { useEffect, useState } from "react"

export const Connections = () => {

    const [connections, setConnections] = useState([])

    const getUserConnections = async () => {

        try {

            const res = await axios.get(baseURL + "/user/connections", { withCredentials: true })
            setConnections(res.data.data)

        } catch (e) {
            console.error(e)
        }

    }

    useEffect(() => {
        getUserConnections()
    }, [])

    if (connections.length == 0) return <h3>No connections found</h3>

    return (
        <div >

            <h1 className="text-4xl text-bold justify-center flex my-4">Connections</h1>
            <div className="flex  flex-col items-center justify-center "> {
                connections && connections.map((connections) => <div key={connections._id} className="my-4 p-6 bg-base-300">

                    <img src={connections.photoUrl} alt="image of user" className="w-20 h-20 m-3 rounded-full " />
                    <p >{connections.firstName} {connections.lastName}</p>
                    <p>{connections.about}</p>

                </div>)
            }
            </div>
        </div>
    )


}