import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { baseURL } from '../utils/constant';

const AskAI = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        // Add user message to chat
        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        // Clear input field
        setInput('');

        // Show loading state
        setIsLoading(true);

        try {
            // Send request to backend
            const response = await axios.post(baseURL + '/ask/ai', {
                question: input
            }, {
                withCredentials: true
            });

            // Add AI response to chat
            setMessages(prev => [...prev, { text: response.data.answer, sender: 'ai' }]);
        } catch (error) {
            console.error('Error getting AI response:', error);

            // Show error message
            setMessages(prev => [...prev, {
                text: 'Sorry, I encountered an error. Please try again later.',
                sender: 'ai',
                error: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-16 h-[500px] bg-translucent-30 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="bg-primary text-primary-content p-4 text-center">
                <h2 className="text-xl font-bold">AI Assistant</h2>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-translucent-20">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-text-secondary italic opacity-70">
                        <p>Ask me anything! I'm here to help.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 animate-fadeIn ${message.sender === 'user'
                                    ? 'bg-primary text-primary-content rounded-br-sm'
                                    : message.error
                                        ? 'bg-error text-error-content rounded-bl-sm'
                                        : 'bg-translucent-40 text-text-primary rounded-bl-sm'
                                    }`}>
                                    <p className="whitespace-pre-wrap break-words">{message.text}</p>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-translucent-40 rounded-2xl rounded-bl-sm px-4 py-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 rounded-full bg-neutral animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-neutral animate-bounce" style={{ animationDelay: '200ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-neutral animate-bounce" style={{ animationDelay: '400ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            <form className="p-3 bg-translucent-30 border-t border-primary flex" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 bg-translucent-80 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="ml-2 px-4 py-2 bg-primary text-primary-content rounded-full hover:bg-primary-focus disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default AskAI