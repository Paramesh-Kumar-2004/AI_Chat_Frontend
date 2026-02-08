import React from 'react'
import Sidebar from '../Components/Sidebar'



const NotFound = () => {

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full bg-[#1B262C] min-h-screen font-extrabold text-xl flex justify-center items-center text-white pl-40'>
                Page Not Found
            </div>
        </div>
    )
}

export default NotFound