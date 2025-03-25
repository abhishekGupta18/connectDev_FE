import axios from "axios";
import { useRef, useState } from "react"
import { baseURL } from "../utils/constant";



const AddJob = () => {
    const formRef = useRef(null)
    const [company, setCompany] = useState("")
    const [role, setRole] = useState("")
    const [description, setDescription] = useState("")
    const [salary, setSalary] = useState("")
    const [applyLink, setApplyLink] = useState("")
    const [experience, setExperience] = useState("")
    const [location, setLocation] = useState("")
    const [deadline, setDeadline] = useState("")

    const [showToast, setShowToast] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post(baseURL + "/jobs/post", { company, role, description, salary, applyLink, experience, location, deadline }, { withCredentials: true })
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
                resetForm()

            }, 2000)


        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {

        setCompany("")
        setRole("")
        setDescription("")
        setSalary("")
        setApplyLink("")
        setExperience("")
        setLocation("")
        setDeadline("")

        if (formRef.current) {
            formRef.current.reset()
        }

    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-translucent-30 rounded-xl backdrop-blur-md border border-primary my-4">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Add New Job Posting</h2>

            <form className="space-y-4 p-8 backdrop-blur-md bg-base-300 rounded-xl border border-primary shadow-lg transition-all duration-300 hover:bg-base-200 hover:shadow-xl " onSubmit={handleSubmit} ref={formRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company Name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Company Name</span>
                        </label>
                        <input
                            type="text"
                            name="company"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            placeholder="Enter company name"
                            required

                            onChange={(e) => setCompany(e.target.value)}

                        />
                    </div>

                    {/* Role */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Job Role</span>
                        </label>
                        <input
                            type="text"
                            name="role"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            placeholder="Enter job title"
                            required
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                </div>

                {/* Description - TextBox */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-text-secondary font-medium">Job Description</span>
                    </label>
                    <textarea
                        name="description"
                        className="textarea textarea-bordered w-full h-32 bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                        placeholder="Enter detailed job description"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Salary */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Salary Range (specify currency)</span>
                        </label>
                        <input
                            type="text"
                            name="salary"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            placeholder="e.g. $50,000 - $70,000"
                            required
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>

                    {/* Apply Link */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Application Link</span>
                        </label>
                        <input
                            type="url"
                            name="applyLink"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            placeholder="https://..."
                            required
                            onChange={(e) => setApplyLink(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Experience */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Experience Level</span>
                        </label>
                        <input
                            type="text"
                            name="experience"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            placeholder="e.g. 2-5 years"
                            required
                            onChange={(e) => setExperience(e.target.value)}
                        />
                    </div>

                    {/* Location */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Location</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            placeholder="e.g. Remote, New York, etc."
                            required
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    {/* Deadline */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Application Deadline</span>
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            required
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        type="button"
                        className="btn bg-button-secondary hover:bg-button-secondary-hover text-white"
                        onClick={resetForm}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary text-white animate-fadeIn"
                    >
                        Submit Job Posting
                    </button>
                </div>
            </form>

            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert shadow-lg border border-gray-500/30 bg-gray-800/50 backdrop-blur-lg text-white rounded-lg">
                        <span>Job added successfully!!</span>
                    </div>
                </div>
            )}



        </div>
    );
};


export default AddJob