import axios from "axios"
import { baseURL } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import { UserCard } from "../Components/UserCard"

export const Feed = () => {

    const dispatch = useDispatch()
    const feed = useSelector((store) => store.feed)

    const userFeed = async () => {

        try {

            const res = await axios.get(baseURL + "/feed", { withCredentials: true })


            dispatch(addFeed(res.data))


        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        userFeed()
    }, [])


    return <div className="flex flex-wrap justify-center space-x-4">

        {
            feed && feed.map((card) => <UserCard key={card._id} user={card} userFeed={userFeed} />)
        }

    </div>
}