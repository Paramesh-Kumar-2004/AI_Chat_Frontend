import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../Components/Loader'
import Sidebar from '../Components/Sidebar'
import { Store } from '../Components/Context/Store'
import { API } from '../API/api'
import { useNavigate } from 'react-router-dom'

const Chat = () => {

    const navigate = useNavigate()
    const { isLoading, setIsLoading, refetch, setRefetch } = useContext(Store)
    const bottomRef = useRef(null)

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetchMessages()
    }, [refetch])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    const fetchMessages = async () => {
        try {
            setIsLoading(true)
            const res = await API.get("/chat")
            setMessages(res.data.chats[0]?.messages || [])
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const sendMessage = async () => {
        if (!message.trim()) return

        try {
            setIsLoading(true)
            const res = await API.post("/chat/send", { message })

            setMessages(res.data)
            setMessage("")
            setRefetch(!refetch)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setIsLoading(false)
            setRefetch(!refetch)
        }
    }

    return (
        <div className="flex">
            {/* <Sidebar /> */}

            <div className="bg-[#1B262C] text-white min-h-screen w-full pt-20 md:pt-6 px-4">

                <h1 className="text-sky-400 font-bold text-3xl text-center mb-6">
                    AI Chat
                </h1>

                {/* <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md font-semibold transition cursor-pointer"
                >
                    Logout
                </button> */}

                {/* CHAT AREA */}
                <div className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-xl p-4 h-[65vh] overflow-y-auto space-y-4 [scrollbar-width:none]">

                    {isLoading && messages.length === 0 ? (
                        <Loader />
                    ) : messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                ref={index === messages.length - 1 ? bottomRef : null}
                                className={`max-w-[80%] px-4 py-2 rounded-lg text-sm
                                    ${msg.role === "user"
                                        ? "ml-auto bg-sky-600 text-white"
                                        : "mr-auto bg-[#1b262c] border border-sky-500"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-sky-500 font-semibold">
                            Start a conversation 🚀
                        </p>
                    )}
                </div>

                {/* INPUT AREA */}
                <div className="flex gap-2 mt-4">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 rounded-md bg-[#0f4c7546] border border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 text-white"
                    />

                    <button
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="px-6 py-2 bg-sky-500 hover:bg-sky-600 rounded-md font-semibold transition cursor-pointer"
                    >
                        {!isLoading ? "Send" : "Sending..."}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Chat