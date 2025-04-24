import axios from "axios"
import { baseURL } from "../utils/constant"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showJobs } from "../utils/jobSlice"
import JobCard from "../Components/JobCard"
import { Link } from "react-router-dom"
import Premium from "../Components/Premium"
import { Loader2 } from "lucide-react"

const Jobs = () => {
    const dispatch = useDispatch()
    const jobs = useSelector((store) => store.jobs)
    const [showTooltip, setShowTooltip] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const user = useSelector((store) => store.user)

    const fetchAllJobs = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(baseURL + "/jobs", { withCredentials: true })
            dispatch(showJobs(res.data.data))
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAllJobs()
    }, [])

    // Show tooltip every 5 seconds with proper cleanup
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


    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-text-secondary font-medium">Loading jobs...</p>
            </div>
        )
    }


    if (!user?.isPremium) return <Premium />

    return (
        <div className="relative">
            <div className="flex justify-around items-center flex-wrap min-h-screen">
                {jobs && jobs.map((job) => <JobCard key={job._id} jobInfo={job} />)}
            </div>

            <div className="fixed right-10 top-40 z-10">
                <Link to="/jobs/addJob">
                    <button type="button" className="bg-primary text-white rounded-full p-2 border-2 border-white shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                            <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                            <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
                        </svg>
                    </button>
                </Link>

                {/* Positioned tooltip relative to fixed container */}
                {showTooltip && (
                    <div className="absolute top-0 right-full mr-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                        Add New Job
                    </div>
                )}
            </div>
        </div>
    )
}

export default Jobs