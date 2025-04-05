import axios from "axios";
import { useRef, useState } from "react";
import { baseURL } from "../utils/constant";

const AddEvent = () => {

    const formRef = useRef(null)
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventEndTime, setEventEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [registrationLink, setRegistrationLink] = useState(""); 1

    const [showToast, setShowToast] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const res = await axios.post(baseURL + "/add/event", { eventName, description, eventStartTime, eventEndTime, location, registrationLink }, { withCredentials: true })

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

        setEventName("")
        setDescription("")
        setEventStartTime("")
        setEventEndTime("")
        setLocation("")
        setRegistrationLink("")

        if (formRef.current) {
            formRef.current.reset()
        }

    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-translucent-30 rounded-xl backdrop-blur-md border border-primary my-4">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Add New Event</h2>

            <form className="space-y-4 p-8 backdrop-blur-md bg-base-300 rounded-xl border border-primary shadow-lg transition-all duration-300 hover:bg-base-200 hover:shadow-xl" onSubmit={handleSubmit} ref={formRef}>
                {/* Event Name */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-text-secondary font-medium">Event Name</span>
                    </label>
                    <input
                        type="text"
                        name="eventName"
                        className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                        placeholder="Enter event name"
                        required
                        minLength={4}
                        maxLength={50}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>

                {/* Description - TextBox */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-text-secondary font-medium">Event Description</span>
                    </label>
                    <textarea
                        name="description"
                        className="textarea textarea-bordered w-full h-32 bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                        placeholder="Enter detailed event description"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Event Start DateTime */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Event Start</span>
                        </label>
                        <input
                            type="datetime-local"
                            name="eventStart"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            required
                            onChange={(e) => setEventStartTime(e.target.value)}
                        />
                    </div>

                    {/* Event End DateTime */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Event End</span>
                        </label>
                        <input
                            type="datetime-local"
                            name="eventEnd"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            required
                            onChange={(e) => setEventEndTime(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Location */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Location</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            placeholder="e.g. Conference Hall, Virtual, etc."
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    {/* Registration Link */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-text-secondary font-medium">Registration Link</span>
                        </label>
                        <input
                            type="url"
                            name="registrationLink"
                            className="input input-bordered w-full bg-translucent-20 focus:bg-translucent-40 transition-all duration-300"
                            placeholder="https://..."
                            onChange={(e) => setRegistrationLink(e.target.value)}
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
                        Submit Event
                    </button>
                </div>
            </form>

            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert shadow-lg border border-gray-500/30 bg-gray-800/50 backdrop-blur-lg text-white rounded-lg">
                        <span>Event added successfully!!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddEvent;