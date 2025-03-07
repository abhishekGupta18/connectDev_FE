import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket"
import { useSelector } from "react-redux"
import axios from "axios"
import { baseURL } from "../utils/constant"
import { text } from "@cloudinary/url-gen/qualifiers/source"

export const Chat = () => {

    const { targetUserId } = useParams()
    const [sendMessage, setSendMessage] = useState([])
    const [newMsg, setNewMsg] = useState("")
    const user = useSelector((store) => store.user)
    const userId = user?._id
    const firstName = user?.firstName

    const getChatHistory = async () => {
        try {

            const chats = await axios.get(baseURL + "/chat/" + targetUserId, { withCredentials: true })
            console.log(chats.data.message)

            const chatInfo = chats.data.message.map((msg) => {
                return {
                    firstName: msg.senderId.firstName,
                    text: msg.text
                }
            })

            setSendMessage(chatInfo)

        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getChatHistory()
    }, [])

    useEffect(() => {

        if (!userId) return

        const socket = createSocketConnection()
        socket.emit("joinChat", { firstName, userId, targetUserId })

        socket.on("messageRecevied", ({ firstName, text }) => {
            console.log(firstName + ": " + text)
            setSendMessage((sendMessage) => [...sendMessage, { firstName, text }])
        })

        return () => {
            socket.disconnect()
        }

        // useState return statement run when react component unmount here when a ever the chat page is being closed socket will be dissconnect
    }, [userId, targetUserId])

    const sendNewMessage = () => {
        const socket = createSocketConnection()
        socket.emit("sendMessage", { firstName, userId, targetUserId, text: newMsg })
        setNewMsg("")

    }

    return <div><h1 className="">chat</h1>
        {sendMessage.map((msg, index) => <div key={index} className="chat chat-start">
            <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
        </div>)}

        <div className="gap-2">
            <input value={newMsg} onChange={(e) => setNewMsg(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <button onClick={sendNewMessage} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">send</button>
        </div>
    </div>
}