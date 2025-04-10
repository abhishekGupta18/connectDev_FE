import axios from "axios";
import { baseURL } from "../utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { UserCard } from "../Components/UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);
    const [isLoading, setIsLoading] = useState(true);

    const userFeed = async () => {
        if (feed) return;
        try {
            setIsLoading(true);
            const res = await axios.get(baseURL + "/feed", { withCredentials: true });
            dispatch(addFeed(res.data));
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        userFeed();
    }, []);

    if (isLoading && (!feed || feed.length === 0)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-secondary">
                <div className="animate-pulse">
                    <div className="h-12 w-64 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-6 w-48 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (!feed || feed.length <= 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent">
                    No new users in your feed
                </h2>
                <p className="mt-2 text-text-secondary opacity-80 max-w-md">
                    We're looking for more people to connect with. Check back soon!
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent">
                Discover People
            </h1>

            <div className="max-w-4xl mx-auto px-4">
                {feed && feed[0] && <UserCard user={feed[0]} />}
            </div>
        </div>
    );
};

export default Feed;