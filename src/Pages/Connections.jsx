import axios from "axios";
import { baseURL } from "../utils/constant";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Loader2 } from "lucide-react";

const Connections = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);
    const navigate = useNavigate();

    const getUserConnections = async () => {
        try {
            setIsLoading(true);
            const fetchData = await axios.get(baseURL + "/user/connections", { withCredentials: true });
            console.log(fetchData.data.data);
            dispatch(addConnections(fetchData.data.data));
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserConnections();
    }, []);

    const showConnectionProfile = (id) => {
        navigate("/user/" + id);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-text-secondary font-medium">Loading connections...</p>
            </div>
        );
    }

    if (connections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent">No connections found</h3>
                <p className="mt-2 text-text-secondary opacity-80">Start connecting with people to see them here</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent">
                Connections
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {connections.map((connection) => (
                    <div
                        key={connection._id}
                        className="backdrop-blur-md bg-base-300 rounded-xl border border-primary shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-accent"
                    >
                        <div className="flex items-center">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end blur-sm"></div>
                                <div
                                    className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-badge cursor-pointer"
                                    onClick={() => showConnectionProfile(connection._id)}
                                >
                                    <img
                                        src={connection.photoUrl}
                                        alt={`${connection.firstName}'s profile picture`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="ml-4">
                                <h3
                                    className="text-lg font-semibold text-text-primary cursor-pointer hover:underline"
                                    onClick={() => showConnectionProfile(connection._id)}
                                >
                                    {connection.firstName} {connection.lastName}
                                </h3>
                                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                                    {connection.about || "No bio available"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Link to={"/chat/" + connection._id}>
                                <button className="btn btn-primary px-6 rounded-full text-white hover:bg-primary-focus transition-all duration-200">
                                    Message
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Connections;
