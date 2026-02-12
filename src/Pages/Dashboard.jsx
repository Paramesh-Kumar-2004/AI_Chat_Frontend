import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as changecase from "change-case"
import dayjs from 'dayjs'
import Sidebar from '../Components/Sidebar'
import { Store } from '../Components/Context/Store'
import Loader from '../Components/Loader'
import { API } from '../API/api'
import ChatCreateModal from '../Components/ChatCreateModal'
import EditChatName from '../Components/EditChatName'



const Dashboard = () => {

    const navigate = useNavigate()
    const { isLoading, setIsLoading, refetch, setRefetch, openCreateModal, setOpenCreateModal } = useContext(Store)
    const [chats, setChats] = useState([])
    const [changeNameModal, setChangeNameModal] = useState(false)
    const [chatName, setChatName] = useState("")
    const [chatId, setChatId] = useState()

    useEffect(() => {
        fetchChats()
    }, [refetch])

    const fetchChats = async () => {
        try {
            setIsLoading(true)
            const response = await API.get("/chat")
            setChats(response.data.chats);

        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    const HandleDeleteChat = async (id) => {
        try {
            const response = await API.delete(`/chat/${id}`)
            toast(response.data.message, {
                position: "top-center",
                autoClose: 2000
            })
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        }
        finally {
            setRefetch(!refetch)
        }
    }

    const HandleChangeName = async (item) => {
        setChatName(item.chatName)
        setChatId(item._id)
        setChangeNameModal(true)
    }

    // if (isLoading) {
    //     return (
    //         <Loader />
    //     )
    // }

    return (
        <>

            <div className='flex'>
                {/* <Sidebar /> */}
                <div className='bg-[#1B262C] text-white min-h-screen font-[Poppins,sans-serif w-full pt-20 md:pt-0 px-3 overflow-x-scroll [scrollbar-width:none]'>

                    <div className='py-6 pl-0'>
                        <h1 className='text-sky-400 font-bold text-3xl text-center'>My Chats</h1>
                    </div>

                    <div className='flex justify-end-safe pb-2'>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-sky-600 text-white rounded-md disabled:opacity-60 cursor-pointer hover:bg-sky-800"
                            onClick={() => setOpenCreateModal(true)}
                        >
                            Create New Chat
                        </button>
                    </div>

                    <table className="w-full min-w-xs">
                        <thead className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl w-full p-6 text-start transition-transform text-emerald-300 text-lg">
                            <tr>
                                <th className="p-4">Chat Name</th>
                                <th className="p-4" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-white text-base">
                            {chats.length > 0 ? (
                                chats.map((item) => {
                                    return (
                                        <tr key={item._id}
                                            className="bg-[#0f4c7546] border-2 border-sky-600 text-center transition-transform duration-300 ease-in-out hover:shadow-[inset_0_0_14px_rgba(71,166,230,1)]">

                                            <td className="p-3">
                                                {item.chatName}
                                            </td>

                                            <td className="p-3">
                                                <button
                                                    className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer text-amber-500 hover:bg-yellow-500 hover:text-white"
                                                    onClick={() => navigate(`/message/${item._id}`)}
                                                >
                                                    Continue Chat
                                                </button>
                                            </td>

                                            <td className="p-3">
                                                <button
                                                    className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer text-green-500 hover:bg-green-800 hover:text-white"
                                                    onClick={() => HandleChangeName(item)}
                                                >
                                                    Change Name
                                                </button>
                                            </td>

                                            <td className="p-3">
                                                <button
                                                    className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer text-red-500 hover:bg-red-700 hover:text-white"
                                                    onClick={() => HandleDeleteChat(item._id)}
                                                >
                                                    Delete Chat
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })

                            ) : (
                                <tr>
                                    {isLoading ?
                                        <td colSpan={7}>
                                            <Loader />
                                        </td>
                                        : (
                                            <td
                                                colSpan={7}
                                                className="py-4 font-extrabold text-sky-500 bg-[#0f4c7546] border-2 border-red-900 text-center transition-transform duration-300 ease-in-out"
                                            >No Chats Available</td>
                                        )}
                                </tr>
                            )}
                        </tbody>

                    </table>

                    {openCreateModal && (
                        <ChatCreateModal
                            onClose={() => setOpenCreateModal(false)}
                        />
                    )}

                    {changeNameModal && (
                        <EditChatName
                            chatId={chatId}
                            title={chatName}
                            onClose={() => setChangeNameModal(false)}
                        />
                    )}

                </div>
            </div>
        </>
    );
};

export default Dashboard