import axios from "axios";
import { baseURL } from "../utils/constant";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

export const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, about, gender, age, skills, organization } = user;

    const dispatch = useDispatch()

    const handleSendRequest = async (status, id) => {
        try {
            const res = await axios.post(
                baseURL + "/request/send/" + status + "/" + id,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(id))
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="relative max-w-md mx-auto overflow-hidden rounded-2xl backdrop-blur-md bg-base-100 border border-primary shadow-xl">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end opacity-50 -z-10"></div>

            {/* Content container */}
            <div className="relative z-10">
                {/* Header with image and name */}
                <div className="p-6 flex flex-col items-center">
                    <div className="mb-4 p-1 rounded-full bg-base-200 backdrop-blur-sm">
                        <img
                            src={photoUrl || "/api/placeholder/200/200"}
                            alt={`${firstName} ${lastName}`}
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    </div>

                    <h2 className="text-xl font-bold text-text-primary">
                        {firstName + " " + lastName}
                    </h2>

                    {/* User details badges */}
                    <div className="flex gap-2 mt-2">
                        {gender && (
                            <div className="text-xs backdrop-blur-sm bg-translucent-40 border border-badge text-text-secondary px-3 py-1 rounded-full">
                                {gender}
                            </div>
                        )}
                        {age && (
                            <div className="text-xs backdrop-blur-sm bg-translucent-40 border border-badge text-text-secondary px-3 py-1 rounded-full">
                                {age} years
                            </div>
                        )}

                        {organization && (
                            <div className="text-xs backdrop-blur-sm bg-translucent-40 border border-badge text-text-secondary px-3 py-1 rounded-full">
                                {organization}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main content */}
                <div className="px-6 pb-4">
                    {/* About section */}
                    {about && (
                        <div className="mb-6 backdrop-blur-sm bg-base-200 p-4 rounded-xl">
                            <h3 className="text-sm font-semibold text-text-primary mb-2">About</h3>
                            <p className="text-text-secondary max-h-20 overflow-y-auto pr-2 text-sm">{about}</p>
                        </div>
                    )}

                    {/* Skills section */}
                    {skills && skills.length > 0 && (
                        <div className="backdrop-blur-sm bg-base-200 p-4 rounded-xl">
                            <h3 className="text-sm font-semibold text-text-primary mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-translucent-40 border border-badge text-text-secondary text-xs font-medium rounded-full whitespace-nowrap"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="p-4 mt-2 backdrop-blur-md bg-translucent-20 border-t border-primary">
                    <div className="flex justify-center gap-3">
                        <button
                            className="px-5 py-2 bg-translucent-80 backdrop-blur-sm text-button-primary-text text-sm font-medium rounded-full hover:bg-white transition-colors border border-badge"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            Interested
                        </button>
                        <button
                            className="px-5 py-2 bg-button-secondary backdrop-blur-sm text-white text-sm font-medium rounded-full hover:bg-button-secondary-hover transition-colors"
                            onClick={() => handleSendRequest("ignored", _id)}
                        >
                            Ignore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};