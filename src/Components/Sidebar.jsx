import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Store } from './Context/Store'
import { API } from '../API/api'



const Sidebar = () => {

    const navigate = useNavigate()
    const { isLoading, setIsLoading, refetch, setRefetch } = useContext(Store)
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false)

    const [chats, setChats] = useState([])

    useEffect(() => {
        fetchChats()
    }, [])

    const fetchChats = async () => {
        try {
            setIsLoading(true)
            const res = await API.get("/chat")

            setChats(res.data.chats)
            setRefetch(!refetch)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setIsLoading(false)
            setRefetch(!refetch)
        }
    }

    const HandleLogout = async () => {
        try {
            localStorage.clear()
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <nav
            className="bg-[#06344d] text-white fixed w-full min-h-16 h-fit flex flex-row justify-around items-center 
            md:h-screen md:w-fit md:min-w-36 md:flex-col md:justify-evenly md:py-4 z-10 overflow-y-scroll [scrollbar-width:none]"
        >
            <div>
                {/* <img src={testIMG} alt="img" width={50} /> */}
                <h1
                    className='text-center cursor-pointer text-xl font-bold hover:scale-110 duration-300 transition-all py-6'
                >
                    New Chat
                </h1>
            </div>

            {chats.map((item) => {
                return (
                    <div
                        key={item._id}
                        className='font-semibold text-lg p-2 hover:scale-110 duration-300 transition-all cursor-pointer'
                        onClick={() => navigate(`/message/${item._id}`)}
                    >
                        {item.chatName}
                    </div>
                )
            })}
        </nav>
    )
}

export default Sidebar