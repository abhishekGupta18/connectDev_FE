import React, { useState } from 'react';
import { CalendarIcon, BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const JobCard = ({ jobInfo }) => {
    const {
        company,
        role,
        description,
        salary,
        applyLink,
        experience,
        location,
        deadline
    } = jobInfo
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Safely parse the date with a fallback
    const parseDate = (dateString) => {
        try {
            return new Date(dateString);
        } catch (error) {
            console.error("Error parsing date:", error);
            return new Date(); // Fallback to current date
        }
    };

    const lastDateToApply = parseDate(deadline);

    // Function to calculate days left
    const getDaysLeft = () => {
        try {
            const deadlineDate = parseDate(deadline);
            const today = new Date();
            const diffTime = deadlineDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 0 ? 'Expired' : `${diffDays} days left`;
        } catch (error) {
            console.error("Error calculating days left:", error);
            return "Date error";
        }
    };

    // Check if job is expired
    const isExpired = () => {
        const today = new Date();
        return today > lastDateToApply;
    };

    // Format the date safely
    const formatDate = () => {
        try {
            return `${lastDateToApply.getDate()}/${lastDateToApply.getMonth() + 1}/${lastDateToApply.getFullYear()}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid date";
        }
    };

    // Prevent default click and stop propagation for expired jobs
    const handleClick = (e) => {
        if (isExpired()) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`
                relative group animate-fadeIn m-8 w-full max-w-lg mx-auto 
                backdrop-blur-md rounded-xl border border-primary shadow-lg 
                transition-all duration-300 
                ${isExpired() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-base-200 hover:shadow-xl'}
            `}
        >
            {/* Overlay for expired jobs */}
            {isExpired() && (
                <div className="absolute inset-0 z-10 bg-black/30 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">Job Expired</span>
                </div>
            )}

            {/* Glassmorphic card with explicit classes */}
            <div
                className={`
                    rounded-xl overflow-hidden bg-translucent-20 backdrop-blur-md 
                    border border-primary shadow-lg p-6 transition-all duration-300 
                    ${isExpired() ? 'pointer-events-none' : 'hover:bg-translucent-30 hover:shadow-xl'}
                `}
            >
                {/* Rest of the existing component remains the same */}
                {/* Company and role section */}
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-text-primary mb-1">{role}</h3>
                    <div className="flex items-center">
                        <span className="font-medium text-lg text-text-secondary">{company}</span>
                    </div>
                </div>

                {/* Description with expand/collapse functionality */}
                <div className="mb-6">
                    <div className="relative overflow-hidden"
                        style={{ maxHeight: isExpanded ? 'none' : '4.5rem' }}>
                        <p className="text-text-secondary">
                            {description}
                        </p>
                        {!isExpanded && (
                            <div className="absolute bottom-0 left-0 w-full h-8 
                 bg-gradient-to-t from-translucent-20 to-transparent"></div>
                        )}
                    </div>
                    <button
                        onClick={toggleExpand}
                        disabled={isExpired()}
                        className={`
                            mt-2 flex items-center text-button-primary-text 
                            hover:text-primary-focus text-sm font-medium 
                            transition-colors
                            ${isExpired() ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        {isExpanded ? (
                            <>
                                Read less <ChevronUpIcon className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                Read more <ChevronDownIcon className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>

                {/* Details section */}
                <div className="mb-6">
                    <div className="flex flex-wrap -mx-2">
                        {/* Salary */}
                        <div className="px-2 w-full md:w-1/2 mb-3">
                            <div className="flex items-center gap-2">
                                <CurrencyDollarIcon className="h-5 w-5 text-primary" />
                                <span className="text-text-secondary">{salary}</span>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="px-2 w-full md:w-1/2 mb-3">
                            <div className="flex items-center gap-2">
                                <BriefcaseIcon className="h-5 w-5 text-primary" />
                                <span className="text-text-secondary">{experience}</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="px-2 w-full md:w-1/2 mb-3">
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="h-5 w-5 text-primary" />
                                <span className="text-text-secondary">{location}</span>
                            </div>
                        </div>

                        {/* Deadline */}
                        <div className="px-2 w-full md:w-1/2 mb-3">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-primary" />
                                <span className="text-text-secondary">Deadline: {formatDate()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Apply button */}
                <div className="flex justify-between items-center">
                    <a
                        href={applyLink}
                        target='_blank'
                        onClick={handleClick}
                        className={`
                            px-6 py-2 rounded-full 
                            ${isExpired()
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-primary-focus hover:shadow-md'
                            }
                        `}
                        disabled={isExpired()}
                    >
                        {isExpired() ? 'Expired' : 'Apply Now'}
                    </a>

                    <div className="flex items-center gap-2 text-sm">
                        <ClockIcon className="h-4 w-4 text-accent" />
                        <span className={`text-text-secondary ${isExpired() ? 'text-red-500' : ''}`}>
                            {getDaysLeft()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;