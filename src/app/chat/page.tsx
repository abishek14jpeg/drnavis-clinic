"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm Dr. Navi's virtual assistant. How can I help you today? You can ask about appointments, services, or pet care tips.",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const userQuery = inputValue.trim();
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: userQuery,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        try {
            // Import dynamically or use the imported service
            const { sendMessage } = await import("@/lib/chat-service");
            const response = await sendMessage(userQuery);

            const newAssistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: response.role,
                content: response.content,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, newAssistantMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, something went wrong. Please try again.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-card border border-border rounded-2xl shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="p-4 border-b border-border bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-transparent flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Bot className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="font-heading font-bold text-lg text-foreground">Clinic Assistant</h1>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                                Beta
                            </span>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
                        {messages.map((message) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={message.id}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-4 shadow-sm ${message.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-tr-none"
                                        : "bg-card border border-border rounded-tl-none"
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                    <span className={`text-[10px] block mt-1 opacity-70 ${message.role === "user" ? "text-primary-foreground" : "text-muted-foreground"}`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start"
                            >
                                <div className="bg-card border border-border rounded-2xl rounded-tl-none p-4 shadow-sm">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-card border-t border-border">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your query here..."
                                className="flex-1 bg-muted/50 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm transition-all outline-none placeholder:text-muted-foreground"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-accent hover:bg-accent/90 text-accent-foreground p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/25"
                            >
                                <Send className="w-5 h-5" />
                                <span className="sr-only">Send</span>
                            </button>
                        </form>
                        <p className="text-center text-[10px] text-muted-foreground mt-2">
                            Response generated by AI. For medical emergencies, please call <a href="tel:+919363414845" className="text-primary hover:underline">93634 14845</a> directly.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
