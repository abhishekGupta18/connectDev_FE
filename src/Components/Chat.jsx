import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket"
import { useSelector } from "react-redux"
import axios from "axios"
import { baseURL } from "../utils/constant"
import { Loader2 } from "lucide-react"

const Chat = () => {

    const { targetUserId } = useParams()
    const chatContainer = useRef(null)
    const [sendMessage, setSendMessage] = useState([])
    const [newMsg, setNewMsg] = useState("")
    const [targetUserDetails, setTargetUserDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const user = useSelector((store) => store.user)
    const userId = user?._id
    const firstName = user?.firstName
    const timestamp = new Date().toISOString()


    const getUserConnections = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(baseURL + "/user/connections", { withCredentials: true })
            const targetUser = res.data.data.find((connection) => connection._id == targetUserId)
            setTargetUserDetails(targetUser)


        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }


    const getChatHistory = async () => {
        try {

            setIsLoading(true)

            const chats = await axios.get(baseURL + "/chat/" + targetUserId, { withCredentials: true })

            const chatInfo = chats.data.message.map((msg) => {
                return {
                    createdAt: msg.createdAt,
                    firstName: msg.senderId.firstName,
                    text: msg.text
                }
            })

            setSendMessage(chatInfo)

        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getChatHistory()
        getUserConnections()
    }, [])

    useEffect(() => {

        if (!userId) return

        const socket = createSocketConnection()
        socket.emit("joinChat", { firstName, userId, targetUserId })

        socket.on("messageRecevied", ({ firstName, text, createdAt }) => {
            console.log(firstName + ": " + text + " " + createdAt)
            setSendMessage((sendMessage) => [...sendMessage, { firstName, text, createdAt }])
        })

        return () => {
            socket.disconnect()
        }

        // useState return statement run when react component unmount here when a ever the chat page is being closed socket will be dissconnect
    }, [userId, targetUserId])

    useEffect(() => {
        if (chatContainer.current) {
            chatContainer.current.scrollTop = chatContainer.current.scrollHeight
        }
    }, [sendMessage])

    useEffect(() => {
        if (chatContainer.current) {
            chatContainer.current.scrollTop = chatContainer.current.scrollHeight
        }
    }, [newMsg, sendMessage])

    const sendNewMessage = () => {
        const socket = createSocketConnection()
        socket.emit("sendMessage", { firstName, userId, targetUserId, text: newMsg, createdAt: timestamp })
        setNewMsg("")

    }

    const formatMessageTime = (isoString) => {
        const messageDate = new Date(isoString);
        const today = new Date();

        // Check if message is from today
        const isToday = messageDate.getDate() === today.getDate() &&
            messageDate.getMonth() === today.getMonth() &&
            messageDate.getFullYear() === today.getFullYear();

        // Check if message is from the current year
        const isSameYear = messageDate.getFullYear() === today.getFullYear();

        if (isToday) {
            // Format as time only: "2:30 PM"
            return messageDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } else if (isSameYear) {
            // Format as "24 Nov 2:30 PM" for different days in same year
            const day = messageDate.getDate();
            const month = messageDate.toLocaleString('default', { month: 'short' });
            const time = messageDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            return `${day} ${month} ${time}`;
        } else {
            // Format as "24 Nov 2023 2:30 PM" for messages from different years
            const day = messageDate.getDate();
            const month = messageDate.toLocaleString('default', { month: 'short' });
            const year = messageDate.getFullYear();
            const time = messageDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            return `${day} ${month} ${year} ${time}`;
        }
    };

    // Helper function to determine if a message is from the current user
    const isCurrentUser = (msgFirstName) => {
        return msgFirstName === firstName;
    };

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-text-secondary font-medium">Loading chats...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end">
            <div className="backdrop-blur-lg bg-translucent-30 rounded-xl shadow-lg p-4 flex flex-col h-full">
                {/* Replace the current profile photo and header section with this */}
                {isLoading ? <Loader2 className="h-12 w-12 animate-spin text-primary" /> : <div className="flex items-center mb-4 border-b border-primary pb-2">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary mr-3">
                        <img
                            src={targetUserDetails?.photoUrl}
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary">
                        Chats with {targetUserDetails?.firstName + " " + targetUserDetails?.lastName}
                    </h1>
                </div>}

                <div ref={chatContainer} className="flex-1 overflow-y-auto pr-2 mb-4 space-y-3">
                    {sendMessage.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-text-secondary opacity-70">No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        sendMessage.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${isCurrentUser(msg.firstName) ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`chat ${isCurrentUser(msg.firstName) ? 'chat-end' : 'chat-start'} max-w-xs md:max-w-md`}>
                                    <div className="chat-header text-sm text-text-secondary">
                                        {msg.firstName}
                                        <time className="text-xs opacity-70 ml-1">{formatMessageTime(msg.createdAt)}</time>
                                    </div>
                                    <div className={`chat-bubble ${isCurrentUser(msg.firstName)
                                        ? 'bg-primary text-white'
                                        : 'bg-translucent-40 text-text-primary'}`}>
                                        {msg.text}
                                    </div>
                                    {/* <div className="chat-footer opacity-50 text-xs">
                                        {isCurrentUser(msg.firstName) && "Seen"}
                                    </div> */}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex gap-2 border-t border-primary pt-4">
                    <input
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendNewMessage()}
                        type="text"
                        placeholder="Type your message..."
                        className="input bg-translucent-40 border-primary text-text-primary placeholder:text-text-secondary/50 flex-1"
                    />
                    <button
                        onClick={sendNewMessage}
                        disabled={!newMsg.trim()}
                        className="btn btn-primary px-6 normal-case"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat