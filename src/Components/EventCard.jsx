import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export const EventCard = ({ event }) => {
    // State to track if description is expanded
    const [isExpanded, setIsExpanded] = useState(false);

    // Format date for display
    // const formatDateTime = (dateTimeStr) => {
    //     const date = new Date(dateTimeStr);
    //     return date.toLocaleString('en-US', {
    //         weekday: 'short',
    //         month: 'short',
    //         day: 'numeric',
    //         year: 'numeric',
    //         hour: 'numeric',
    //         minute: '2-digit',
    //         hour12: true
    //     });
    // };

    // Format date for display (compact version)
    const formatDate = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    // Get upcoming status
    const isUpcoming = new Date(event.eventStartTime) > new Date();

    // Determine if event is happening now
    const now = new Date();
    const isHappeningNow =
        new Date(event.eventStartTime) <= now &&
        new Date(event.eventEndTime) >= now;

    const isPast = new Date(event.eventEndTime) < now;

    // Toggle description visibility
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`
            relative group animate-fadeIn m-8 w-full max-w-sm mx-auto 
            backdrop-blur-md rounded-xl border border-primary shadow-lg 
            transition-all duration-300 h-96
            ${isPast ? 'opacity-50' : 'hover:bg-base-200 hover:shadow-xl'}
        `}>
            {/* Overlay for past events */}
            {isPast && (
                <div className="absolute inset-0 z-10 bg-black/30 flex items-center justify-center rounded-xl">
                    <span className="text-white text-lg font-bold">Event Ended</span>
                </div>
            )}

            {/* Glassmorphic card with explicit classes */}
            <div className={`
                rounded-xl overflow-hidden bg-translucent-20 backdrop-blur-md 
                border border-primary shadow-lg p-6 transition-all duration-300 
                h-full flex flex-col
                ${isPast ? 'pointer-events-none' : 'hover:bg-translucent-30 hover:shadow-xl'}
            `}>
                {/* Event name and status section */}
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-text-primary mb-1 line-clamp-1">{event.eventName}</h3>
                    <div className="flex items-center">
                        {isHappeningNow ? (
                            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 animate-pulse">Happening Now</span>
                        ) : isUpcoming ? (
                            <span className="px-3 py-1 text-xs rounded-full bg-accent text-white">Upcoming</span>
                        ) : (
                            <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Past</span>
                        )}
                    </div>
                </div>

                {/* Description with expand/collapse functionality and scrolling */}
                <div className="flex-grow mb-4 flex flex-col">
                    <div className={`
                        relative overflow-hidden flex-grow
                        ${isExpanded ? 'overflow-y-auto' : ''}
                    `}
                        style={{
                            maxHeight: isExpanded ? '10rem' : '4.5rem',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#6b7280 transparent'
                        }}>
                        <p className="text-text-secondary pr-2">
                            {event.description}
                        </p>
                        {!isExpanded && (
                            <div className="absolute bottom-0 left-0 w-full h-8 
                                bg-gradient-to-t from-translucent-20 to-transparent"></div>
                        )}
                    </div>
                    <button
                        onClick={toggleExpand}
                        disabled={isPast}
                        className={`
                            mt-2 flex items-center text-button-primary-text 
                            hover:text-primary-focus text-sm font-medium 
                            transition-colors
                            ${isPast ? 'opacity-50 cursor-not-allowed' : ''}
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

                {/* Details section - Fixed height section */}
                <div className="mt-auto">
                    <div className="flex flex-wrap -mx-2 mb-4">
                        {/* Start Time */}
                        <div className="px-2 w-full md:w-1/2 mb-3">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="text-text-secondary truncate">
                                    <span className="font-medium">Start:</span> {formatDate(event.eventStartTime)}
                                </span>
                            </div>
                        </div>

                        {/* End Time */}
                        <div className="px-2 w-full md:w-1/2 mb-3">
                            <div className="flex items-center gap-2">
                                <ClockIcon className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="text-text-secondary truncate">
                                    <span className="font-medium">End:</span> {formatDate(event.eventEndTime)}
                                </span>
                            </div>
                        </div>

                        {/* Location */}
                        {event.location && (
                            <div className="px-2 w-full mb-3">
                                <div className="flex items-center gap-2">
                                    <MapPinIcon className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span className="text-text-secondary truncate">{event.location}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons - Always at the bottom */}
                    <div className="flex justify-between items-center mt-2">
                        {event.registrationLink ? (
                            <a
                                href={event.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`
                                    px-6 py-2 rounded-full 
                                    ${isPast
                                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                        : 'bg-primary text-white hover:bg-primary-focus hover:shadow-md'
                                    }
                                `}
                                disabled={isPast}
                            >
                                {isPast ? 'Event Ended' : 'Register Now'}
                            </a>
                        ) : (
                            <div className="px-6 py-2">
                                {/* Empty div to maintain layout when no registration link */}
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-sm">
                            <ClockIcon className="h-4 w-4 text-accent" />
                            <span className="text-text-secondary">
                                {isHappeningNow ? 'Happening Now' : isUpcoming ? 'Upcoming' : 'Past Event'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;