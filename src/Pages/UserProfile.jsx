import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { baseURL } from "../utils/constant"
import { UserCard } from "../Components/UserCard"

const UserProfile = () => {

    const { targetUserId } = useParams()
    console.log(targetUserId)
    const [showUser, setShowUser] = useState()

    const getUserDetails = async () => {
        try {

            const res = await axios.get(baseURL + "/profile/" + targetUserId, { withCredentials: true })
            setShowUser(res.data)


        } catch (e) {
            console.log(e)

        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])
    console.log(showUser)


    return <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent">

            {showUser && `${showUser.firstName} ${showUser.lastName} profile`}

        </h1>

        <div className="max-w-4xl mx-auto px-4">
            {showUser && <UserCard user={showUser} showButon={false} />}
        </div>
    </div>


}

export default UserProfile