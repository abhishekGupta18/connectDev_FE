import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaUserCircle,
    FaHandshake,
    FaComments,
    FaRobot,
    FaBriefcase,
    FaCalendarAlt,
    FaArrowRight,
    FaCheckCircle,
    FaQuestionCircle
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
const Landingpage = () => {

    const [isScrolled, setIsScrolled] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return <div className="min-h-screen bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end">

        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-translucent-80 shadow-md' : 'bg-translucent-20'}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div>
                    <Link to="/" className="text-xl font-bold text-primary">connectdev</Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <a href="#features" className="text-text-primary hover:text-primary transition-colors">Features</a>
                    <a href="#how-it-works" className="text-text-primary hover:text-primary transition-colors">How It Works</a>

                    <a href="#faq" className="text-text-primary hover:text-primary transition-colors">FAQ</a>
                    <a href="#team" className="text-text-primary hover:text-primary transition-colors">Team</a>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 rounded-full bg-translucent-40 hover:bg-translucent-80 transition-all text-text-primary" onClick={() => navigate("/login")}>
                        Login
                    </button>
                    <button className="px-4 py-2 rounded-full bg-primary hover:bg-primary-focus transition-all text-white" onClick={() => navigate("/signup")}>
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>

        <section className="min-h-screen flex items-center pt-20 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Left content - Text and CTA - Preserving your original content */}
                    <motion.div
                        className="md:w-1/2 mb-10 md:mb-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-text-primary">
                            Connect, Collaborate, <span className="text-primary">Code.</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-text-secondary max-w-lg">
                            A developer-first platform to build connections, share ideas, and grow together.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* Updated button styling to match UserCard */}
                            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300 hover:shadow-lg" onClick={() => navigate("/signup")}>
                                <span>Join Now</span>
                                <FaArrowRight />
                            </button>

                        </div>
                    </motion.div>

                    {/* Right content - Preserving your card structure with UserCard styling */}
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Applying the UserCard's gradient background styling */}
                            <div className="absolute -top-10 -left-10 w-full h-full bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end opacity-25 rounded-xl transform rotate-6"></div>

                            {/* Main card with UserCard-like styling */}
                            <div className="backdrop-blur-lg bg-white bg-opacity-20 relative z-10 rounded-xl border border-white border-opacity-20 shadow-xl p-6">
                                {/* Profile header - keeping your original content */}
                                <div className="flex items-center space-x-4 mb-4">
                                    {/* Avatar styled like UserCard */}
                                    <div className="relative group">
                                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 shadow-md">
                                            <span className="text-white font-bold">JS</span>
                                        </div>
                                        {/* Premium indicator like in UserCard */}
                                        <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1 border-2 border-white shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-lg text-text-primary">Jane Smith</h3>
                                        <p className="text-sm text-text-secondary">Full-Stack Developer</p>
                                    </div>
                                </div>

                                {/* Skills section - styled like UserCard skills */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center space-x-2">
                                        {/* Skills badges with UserCard styling */}
                                        <span className="bg-white bg-opacity-40 border border-white border-opacity-50 rounded-full px-3 py-1 text-sm text-text-secondary shadow-sm">React</span>
                                        <span className="bg-white bg-opacity-40 border border-white border-opacity-50 rounded-full px-3 py-1 text-sm text-text-secondary shadow-sm">Node.js</span>
                                        <span className="bg-white bg-opacity-40 border border-white border-opacity-50 rounded-full px-3 py-1 text-sm text-text-secondary shadow-sm">MongoDB</span>
                                    </div>
                                </div>

                                {/* Notification items - preserving content but styling like UserCard */}
                                <div className="space-y-3">
                                    {/* Each notification card styled like sections in UserCard */}
                                    <div className="flex items-center justify-between bg-white bg-opacity-30 backdrop-blur-sm p-3 rounded-lg border border-white border-opacity-20 shadow-sm animate-fadeIn">
                                        <div className="flex items-center space-x-2">
                                            <FaUserCircle className="text-primary" />
                                            <span className="text-text-secondary text-sm">John Dev just connected</span>
                                        </div>
                                        {/* Button styled like the Interested button in UserCard */}
                                        <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full px-3 py-1 text-xs transform hover:scale-105 transition-all">
                                            Message
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between bg-white bg-opacity-30 backdrop-blur-sm p-3 rounded-lg border border-white border-opacity-20 shadow-sm animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                                        <div className="flex items-center space-x-2">
                                            <FaBriefcase className="text-primary" />
                                            <span className="text-text-secondary text-sm">3 new job matches</span>
                                        </div>
                                        {/* Button styled like the Ignore button in UserCard */}
                                        <button className="bg-gray-600 bg-opacity-30 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs hover:bg-opacity-50 transition-all">
                                            View
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between bg-white bg-opacity-30 backdrop-blur-sm p-3 rounded-lg border border-white border-opacity-20 shadow-sm animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                                        <div className="flex items-center space-x-2">
                                            <FaCalendarAlt className="text-primary" />
                                            <span className="text-text-secondary text-sm">Hackathon: May 15th</span>
                                        </div>
                                        {/* Button styled like the Ignore button in UserCard */}
                                        <button className="bg-gray-600 bg-opacity-30 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs hover:bg-opacity-50 transition-all">
                                            Interested
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
        <section className="py-20 bg-translucent-20">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">The Developer Connection Gap</h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
                        In the world of remote work and digital collaboration, finding the right connections and opportunities can be challenging.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        className="glass-card bg-translucent-30 p-8 rounded-xl border border-primary"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-text-primary">The Challenges</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 rounded-full bg-error flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">✕</span>
                                </div>
                                <p className="text-text-secondary">Professional isolation in tech roles</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 rounded-full bg-error flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">✕</span>
                                </div>
                                <p className="text-text-secondary">Difficulty finding collaborators with complementary skills</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 rounded-full bg-error flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">✕</span>
                                </div>
                                <p className="text-text-secondary">Hard to discover relevant opportunities and events</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 rounded-full bg-error flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">✕</span>
                                </div>
                                <p className="text-text-secondary">Fragmented tools for networking, learning and job searching</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="glass-card bg-translucent-30 p-8 rounded-xl border border-primary"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-text-primary">The ConnectDev Solution</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <p className="text-text-secondary">All-in-one platform built for developers, by developers</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <p className="text-text-secondary">Smart matching based on skills, interests and goals</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <p className="text-text-secondary">Curated opportunities and tech events tailored to you</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <p className="text-text-secondary">AI-powered assistant to help with networking and career growth</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
        <section id="features" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">Platform Features</h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
                        Everything you need to connect, grow and thrive in the developer ecosystem.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <FaUserCircle className="text-4xl text-primary" />,
                            title: "Developer Profiles",
                            description: "Create a rich profile showcasing your skills, projects and experience in a dev-friendly format."
                        },
                        {
                            icon: <FaHandshake className="text-4xl text-primary" />,
                            title: "Smart Connections",
                            description: "Our algorithm matches you with developers who complement your skills and share your interests."
                        },
                        {
                            icon: <FaComments className="text-4xl text-primary" />,
                            title: "Real-time Chat",
                            description: "Connect instantly with developer-friendly features like code sharing and syntax highlighting."
                        },
                        {
                            icon: <FaRobot className="text-4xl text-primary" />,
                            title: "AI Chat Assistant",
                            description: "Premium feature with AI assistance for coding problems, career advice, and learning resources."
                        },
                        {
                            icon: <FaBriefcase className="text-4xl text-primary" />,
                            title: "Job Opportunities",
                            description: "Discover relevant jobs and project collaborations matched to your specific tech stack."
                        },
                        {
                            icon: <FaCalendarAlt className="text-4xl text-primary" />,
                            title: "Events & Hackathons",
                            description: "Stay updated on tech meetups, webinars, and hackathons that match your interests."
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="glass-card bg-translucent-30 p-8 rounded-xl border border-primary hover:bg-translucent-40 transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-text-primary">{feature.title}</h3>
                                <p className="text-text-secondary">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-translucent-20">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">How It Works</h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
                        Getting started with ConnectDev is simple and straightforward.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
                    {[
                        {
                            number: "1",
                            title: "Create Your Profile",
                            description: "Sign up and build your developer profile with your tech stack, projects, and interests.",
                            delay: 0
                        },
                        {
                            number: "2",
                            title: "Connect with Devs",
                            description: "Discover and connect with developers who share your interests or complement your skills.",
                            delay: 0.2
                        },
                        {
                            number: "3",
                            title: "Collaborate & Grow",
                            description: "Join projects, find jobs, attend events, and expand your professional network.",
                            delay: 0.4
                        }
                    ].map((step, index) => (
                        <motion.div
                            key={index}
                            className="glass-card bg-translucent-30 p-8 rounded-xl border border-primary w-full md:w-1/3 relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: step.delay }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-white font-bold text-xl">{step.number}</span>
                            </div>
                            <div className="pt-6 text-center">
                                <h3 className="text-xl font-bold mb-3 text-text-primary">{step.title}</h3>
                                <p className="text-text-secondary">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>




        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-translucent-20">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">Frequently Asked Questions</h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
                        Got questions? We've got answers.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {[
                        {
                            question: "Is it free to join ConnectDev?",
                            answer: "Yes! Our basic plan is completely free and gives you access to essential features like creating a profile, connecting with other developers, and browsing job listings."
                        },
                        {
                            question: "Who can join ConnectDev?",
                            answer: "ConnectDev is open to all developers, designers, and tech professionals at any career stage. Whether you're a student, junior developer, or senior engineer, there's a place for you."
                        },
                        {
                            question: "What's included in the premium plan?",
                            answer: "Our Pro plan includes AI-powered assistance, priority access to job listings and premium event invitations."
                        },

                        {
                            question: "Can I find job opportunities on ConnectDev?",
                            answer: "Absolutely! We have a dedicated job board where companies post opportunities specifically looking for our community members. Pro members get early access to new listings."
                        },

                    ].map((faq, index) => (
                        <motion.div
                            key={index}
                            className="glass-card bg-translucent-30 p-6 rounded-xl border border-primary"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-start space-x-3">
                                <FaQuestionCircle className="text-primary text-xl flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold mb-2 text-text-primary">{faq.question}</h3>
                                    <p className="text-text-secondary">{faq.answer}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    className="glass-card bg-translucent-40 p-12 rounded-2xl border border-primary text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">Ready to Connect?</h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
                        Join thousands of developers already building their network on ConnectDev.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button onClick={() => navigate("/signup")} className="px-8 py-3 rounded-full bg-primary hover:bg-primary-focus transition-all text-white flex items-center justify-center space-x-2">
                            <span >Join the Community</span>
                            <FaArrowRight />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
        {/* Team Section */}
        <section className="pt-20 pb-5 bg-translucent-20" id='team'>
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">Meet the Team</h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
                        The people behind ConnectDev working to bring developers together.
                    </p>
                </motion.div>

                <motion.div
                    className="glass-card bg-translucent-30 p-8 rounded-xl border border-primary max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-2/3">
                            <img
                                src="https://res.cloudinary.com/dmmqvo37i/image/upload/v1745582143/photo_devfest_z78mvn.jpg"
                                alt="Abhishek Gupta"
                                className="rounded-xl shadow-lg w-full max-w-xs mx-auto transform hover:scale-105 transition-all duration-300"
                            />
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-2xl font-bold mb-2 text-text-primary">Abhishek Gupta</h3>

                            <div className="text-text-secondary space-y-4">
                                <p>
                                    <span className="text-xl font-medium">Hey there! 👋</span>
                                </p>
                                <p>
                                    I'm Abhishek Gupta, a passionate developer from India. I'm excited to see you here and hope that ConnectDev can help you forge meaningful connections in your developer journey.
                                </p>
                                <p>
                                    We're still in the early stages of development and constantly working to improve the platform. Your feedback is incredibly valuable to us as we grow and evolve ConnectDev into the best developer networking platform possible.
                                </p>
                                <p>
                                    If you encounter any issues or have ideas for new features, please reach out!
                                </p>
                                <div className="pt-4">
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
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className="text-center mt-12 ">
                <p className="text-text-secondary">Copyright © {new Date().getFullYear()} - All right reserved</p>
                <span>Abhishek Gupta</span>
            </div>
        </section>



    </div>
}

export default Landingpage