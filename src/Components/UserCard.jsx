import axios from "axios";
import { baseURL } from "../utils/constant";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, about, gender, age, skills, organization, isPremium, twitterUrl, githubUrl, linkedlnUrl, projectUrl } = user;

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")

    const dispatch = useDispatch();
    const loggedInuser = useSelector((store) => store.user)

    const handleSendRequest = async (status, id) => {
        try {
            const res = await axios.post(
                baseURL + "/request/send/" + status + "/" + id,
                {},
                { withCredentials: true }
            );

            let message = ""
            if (status === "interested") {
                message = `${loggedInuser.firstName} is interested in ${firstName} profile`
            } else if (status === "ignored") {
                message = `${loggedInuser.firstName} ignored ${firstName} profile`
            }

            setToastMessage(message)

            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
                navigate("/")
            }, 1000)
            dispatch(removeUserFromFeed(id));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="relative max-w-md mx-auto overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            {/* Frosted glass background with improved gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end opacity-25"></div>

            {/* Card body with glass effect */}
            <div className="backdrop-blur-lg bg-white bg-opacity-20 relative z-10 border border-white border-opacity-20">
                {/* Profile header section */}
                <div className="p-6">
                    <div className="flex flex-col items-center">
                        {/* Profile image with animation */}
                        <div className="mb-4 relative group">
                            <div className="p-1 rounded-full bg-white bg-opacity-30 shadow-md transform transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src={photoUrl || "/api/placeholder/200/200"}
                                    alt={`${firstName} ${lastName}`}
                                    className="h-28 w-28 rounded-full object-cover"
                                />
                            </div>

                            {/* Premium badge with animation */}
                            {isPremium && (
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1.5 border-2 border-white shadow-md animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Name with premium badge */}
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl font-bold text-text-primary">
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

                        {/* Organization with improved icon */}
                        {organization && (
                            <div className="mb-3 text-sm text-text-secondary flex items-center gap-2 bg-white bg-opacity-30 px-3 py-1 rounded-full shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {organization}
                            </div>
                        )}

                        {/* Social links */}
                        <div className="flex gap-3 mt-2 mb-4">
                            {twitterUrl && (
                                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            )}
                            {githubUrl && (
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </a>
                            )}
                            {linkedlnUrl && (
                                <a href={linkedlnUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            )}
                            {projectUrl && (
                                <a title="view project" href={projectUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </a>
                            )}
                        </div>

                        {/* User details badges with improved styling */}
                        <div className="flex gap-2 flex-wrap justify-center">
                            {gender && (
                                <div className="text-xs bg-white bg-opacity-30 border border-white border-opacity-50 text-text-secondary px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {gender}
                                </div>
                            )}
                            {age && (
                                <div className="text-xs bg-white bg-opacity-30 border border-white border-opacity-50 text-text-secondary px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {age} years
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main content section with improved spacing and styling */}
                <div className="px-6 pb-4">
                    {/* About section with enhanced glass effect */}
                    {about && (
                        <div className="mb-6 bg-white bg-opacity-30 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-white border-opacity-20">
                            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                About
                            </h3>
                            <p className="text-text-secondary max-h-20 overflow-y-auto pr-2 text-sm">{about}</p>
                        </div>
                    )}

                    {/* Skills section with enhanced glass effect */}
                    {skills && skills.length > 0 && (
                        <div className="bg-white bg-opacity-30 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-white border-opacity-20">
                            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-white bg-opacity-40 border border-white border-opacity-50 text-text-secondary text-xs font-medium rounded-full whitespace-nowrap shadow-sm hover:bg-opacity-50 transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions with improved button styling */}
                <div className="p-5 mt-2 bg-white bg-opacity-10 backdrop-blur-md border-t border-white border-opacity-20">
                    <div className="flex justify-center gap-4">
                        <button
                            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            Interested
                        </button>
                        <button
                            className="px-6 py-2.5 bg-gray-600 bg-opacity-30 backdrop-blur-sm text-white text-sm font-medium rounded-full hover:bg-opacity-50 transition-all duration-300 flex items-center gap-2"
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
            {/* Toast notification */}
            {showToast && (
                <div className="toast toast-top toast-center z-100">
                    <div className="alert shadow-lg border border-gray-500/30 bg-gray-800/50 backdrop-blur-lg text-white rounded-lg">
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
};