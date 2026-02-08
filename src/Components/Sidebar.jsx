import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



const Sidebar = () => {

    const navigate = useNavigate()
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false)

    const [chats, setChats] = useState([
        { chatName: "1" }, { chatName: "2" }, { chatName: "3" },
        { chatName: "4" }, { chatName: "5" }, { chatName: "6" },
        { chatName: "7" }, { chatName: "8" }, { chatName: "9" },
        { chatName: "10" }, { chatName: "11" }, { chatName: "12" },
        { chatName: "13" }, { chatName: "14" }, { chatName: "14" },
        { chatName: "15" }, { chatName: "16" }, { chatName: "17" },
        { chatName: "18" }, { chatName: "19" }, { chatName: "20" },
        { chatName: "21" }, { chatName: "22" }, { chatName: "23" },
        { chatName: "24" },
    ])

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
                    onClick={() => navigate("/")}
                >
                    New Chat
                </h1>
            </div>

            {chats.map((item, index) => {
                return (
                    <div
                        key={index}
                        className='font-semibold text-lg p-2 hover:scale-110 duration-300 transition-all cursor-pointer'
                        onClick={() => navigate(`/${index}`)}
                    >
                        {item.chatName}
                    </div>
                )
            })}
        </nav>
    )
}

export default Sidebar