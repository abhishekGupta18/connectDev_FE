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

    return (
        <div className="relative group animate-fadeIn">
            {/* Glassmorphic card with explicit classes */}
            <div className="rounded-xl overflow-hidden bg-translucent-20 backdrop-blur-md border border-primary shadow-lg p-6 transition-all duration-300 hover:bg-translucent-30 hover:shadow-xl">

                {/* Company and role section */}
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-text-primary mb-1">{role}</h3>
                    <div className="flex items-center">
                        <span className="font-medium text-lg text-text-secondary">{company}</span>
                    </div>
                </div>

                {/* Description with expand/collapse functionality */}
                <div className="mb-6">
                    <p className={`text-text-secondary transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {description}
                    </p>
                    <button
                        onClick={toggleExpand}
                        className="mt-2 flex items-center text-button-primary-text hover:text-primary-focus text-sm font-medium transition-colors"
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

                {/* Details section using flex instead of grid */}
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
                                <span className="text-text-secondary">Deadline: {deadline}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Apply button */}
                <div className="flex justify-between items-center">
                    <a
                        href={applyLink}
                        className="px-6 py-2 rounded-full bg-primary text-white font-medium transition-all hover:bg-primary-focus hover:shadow-md"
                    >
                        Apply Now
                    </a>

                    <div className="flex items-center gap-2 text-sm">
                        <ClockIcon className="h-4 w-4 text-accent" />
                        <span className="text-text-secondary">
                            {new Date(deadline) < new Date()
                                ? 'Expired'
                                : `${Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left`}
                        </span>
                    </div>
                </div>
            </div>

            {/* Decorative gradient pill on hover */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end blur-xl"></div>
        </div>
    );
};

export default JobCard;