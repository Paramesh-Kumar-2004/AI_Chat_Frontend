import React from 'react'
import Sidebar from '../Components/Sidebar'



const NotFound = () => {

    return (
        <div div className='w-full bg-[#1B262C] min-h-screen font-extrabold text-xl flex justify-center items-center text-white flex flex-col'>
            {/* <Sidebar /> */}
            Page Not Found
            <a href="/" className='text-gray-400 text-[14px]'>Click To Go home...</a>
        </div>
    )
}

export default NotFound