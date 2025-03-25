import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-12 bg-base-300 backdrop-blur-md border-t border-primary rounded-t-lg p-6 px-8 sm:px-12 md:px-16 lg:px-20 w-full    ">
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6">
                    {/* Logo Section */}
                    <aside className="flex items-center">
                        <svg
                            width="42"
                            height="42"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            className="fill-primary">
                            <path
                                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                        </svg>
                        <span className="font-bold ml-3 text-xl text-primary">ConnectDev</span>
                    </aside>

                    {/* Copyright Section */}
                    <div className="text-center">
                        <p className="text-text-secondary">Copyright © {new Date().getFullYear()} - All right reserved</p>
                        <span>Abhishek Gupta</span>
                    </div>

                    {/* Social Icons */}
                    <nav className="flex gap-5">
                        <a href='https://www.linkedin.com/in/abhishekgupta12703/' target='_blank' className="hover:opacity-80 transition-opacity">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                className="fill-primary">
                                <path
                                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a href="https://github.com/abhishekGupta18" target='_blank' className="hover:opacity-80 transition-opacity">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                className="fill-primary">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.17c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.775.42-1.305.764-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.237-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.56 11.56 0 0 1 3-.405c1.02.006 2.045.137 3 .405 2.292-1.552 3.297-1.23 3.297-1.23.656 1.653.244 2.873.12 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.22v3.293c0 .32.217.693.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>

                        <a href='https://x.com/Abhishek12703' target='_blank' className="hover:opacity-80 transition-opacity">
                            <a className="hover:opacity-80 transition-opacity">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    className="fill-primary">
                                    <path d="M22.98 1.68h-3.2L14.64 8.9 9.05 1.68H1.02l8.2 10.92L.98 22.32h3.2l5.38-7.6 5.82 7.6h8.02l-8.57-11.2 7.98-9.44zM5.18 3.9h2.6l11.1 14.4h-2.6L5.18 3.9zm10.1 3.98h2.6L7 22.1H4.4l10.88-14.2z" />
                                </svg>
                            </a>

                        </a>




                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;