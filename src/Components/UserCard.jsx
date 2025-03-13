import axios from "axios";
import { baseURL } from "../utils/constant";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

export const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, about, gender, age, skills, organization, isPremium } = user;

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
                    <div className="mb-4 relative">
                        <div className="p-1 rounded-full bg-base-200 backdrop-blur-sm">
                            <img
                                src={photoUrl || "/api/placeholder/200/200"}
                                alt={`${firstName} ${lastName}`}
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        </div>

                        {/* Premium badge */}
                        {isPremium && (
                            <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1 border-2 border-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-text-primary">
                            {firstName + " " + lastName}
                        </h2>
                        {isPremium && (
                            <span className="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </span>
                        )}
                    </div>

                    {organization && (
                        <div className="mt-1 text-sm text-text-secondary flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {organization}
                        </div>
                    )}

                    {/* User details badges */}
                    <div className="flex gap-2 mt-3 flex-wrap justify-center">
                        {gender && (
                            <div className="text-xs backdrop-blur-sm bg-translucent-40 border border-badge text-text-secondary px-3 py-1 rounded-full flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {gender}
                            </div>
                        )}
                        {age && (
                            <div className="text-xs backdrop-blur-sm bg-translucent-40 border border-badge text-text-secondary px-3 py-1 rounded-full flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {age} years
                            </div>
                        )}
                    </div>
                </div>

                {/* Main content */}
                <div className="px-6 pb-4">
                    {/* About section */}
                    {about && (
                        <div className="mb-6 backdrop-blur-sm bg-base-200 p-4 rounded-xl">
                            <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                About
                            </h3>
                            <p className="text-text-secondary max-h-20 overflow-y-auto pr-2 text-sm">{about}</p>
                        </div>
                    )}

                    {/* Skills section */}
                    {skills && skills.length > 0 && (
                        <div className="backdrop-blur-sm bg-base-200 p-4 rounded-xl">
                            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Skills
                            </h3>
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
                            className="px-5 py-2 bg-translucent-80 backdrop-blur-sm text-button-primary-text text-sm font-medium rounded-full hover:bg-white transition-colors border border-badge flex items-center gap-1"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            Interested
                        </button>
                        <button
                            className="px-5 py-2 bg-button-secondary backdrop-blur-sm text-white text-sm font-medium rounded-full hover:bg-button-secondary-hover transition-colors flex items-center gap-1"
                            onClick={() => handleSendRequest("ignored", _id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Ignore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};