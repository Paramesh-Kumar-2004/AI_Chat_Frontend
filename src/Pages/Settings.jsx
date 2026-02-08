import React from 'react'
import Sidebar from '../Components/Sidebar'



const Settings = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full min-h-screen bg-[#1B262C] flex justify-center items-center text-white pl-40'>
                <div>
                    <button className="w-full py-2 px-3 bg-blue-900 text-lg rounded-lg hover:scale-105 transition cursor-pointer text-white font-bold">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings