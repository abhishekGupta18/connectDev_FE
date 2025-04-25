import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { baseURL } from "../utils/constant"
import { UserCard } from "../Components/UserCard"
import { Loader2 } from "lucide-react"

const UserProfile = () => {

    const { targetUserId } = useParams()

    const [showUser, setShowUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const getUserDetails = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(baseURL + "/profile/" + targetUserId, { withCredentials: true })
            setShowUser(res.data)


        } catch (e) {
            console.log(e)

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-text-secondary font-medium">Loading profile...</p>
            </div>
        )
    }

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