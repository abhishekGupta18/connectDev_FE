import axios from "axios"
import { baseURL } from "../utils/constant"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addEvents } from "../utils/eventSlice"
import { Link, useNavigate } from "react-router-dom"
import { EventCard } from "../Components/EventCard"
import { Loader2 } from "lucide-react"

const Events = () => {

    const dispatch = useDispatch()
    const [showTooltip, setShowTooltip] = useState(false);
    const [isLoading, setIsLoading] = useState(true)


    const fetchAllEvents = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(baseURL + "/events", { withCredentials: true })
            dispatch(addEvents(res.data.data))



        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAllEvents()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setShowTooltip(true);

            // Hide tooltip after 2 seconds
            setTimeout(() => {
                setShowTooltip(false);
            }, 2000);
        }, 10000);

        // Initial tooltip display
        setShowTooltip(true);
        const initialTimeout = setTimeout(() => {
            setShowTooltip(false);
        }, 2000);

        // Cleanup function to prevent memory leaks
        return () => {
            clearInterval(interval);
            clearTimeout(initialTimeout);
        };
    }, []); // Empty dependency array to run once on mount


    const events = useSelector((store) => store.events)

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-text-secondary font-medium">Loading events...</p>
            </div>
        )
    }

    return <div className="relative">
        <div className="flex justify-around items-center flex-wrap min-h-screen">
            {events && events.map((event) => (
                <EventCard key={event._id} event={event} />
            ))}
        </div>

        <div className="fixed right-10 top-40 z-10">
            <Link to="/events/addEvent">
                <button type="button" className="bg-primary text-white rounded-full p-2 border-2 border-white shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5zm5 6H4v8h16v-8z" />
                        <circle cx="7" cy="15" r="1" />
                        <circle cx="12" cy="15" r="1" />
                        <circle cx="17" cy="15" r="1" />
                    </svg>
                </button>
            </Link>

            {/* Positioned tooltip relative to fixed container */}
            {showTooltip && (
                <div className="absolute top-0 right-full mr-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap"
                >
                    Add New Event
                </div>
            )}
        </div>
    </div>
}

export default Events