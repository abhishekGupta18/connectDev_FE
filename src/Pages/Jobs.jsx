import axios from "axios"
import { baseURL } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showJobs } from "../utils/jobSlice"
import JobCard from "../Components/JobCard"

const Jobs = () => {

    const dispatch = useDispatch()

    const jobs = useSelector((store) => store.jobs)


    const fetchAllJobs = async () => {

        try {
            const res = await axios.get(baseURL + "/jobs", { withCredentials: true })
            dispatch(showJobs(res.data.data))

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        fetchAllJobs()
    }, [])

    console.log(jobs)

    return <div>
        {
            jobs && jobs.map((job) => <JobCard key={job._id} jobInfo={job} />)
        }

    </div>
}

export default Jobs