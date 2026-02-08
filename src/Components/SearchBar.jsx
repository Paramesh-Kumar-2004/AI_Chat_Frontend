import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from './Context/Store'




const SearchBar = () => {

    const navigate = useNavigate()

    const { search, setSearch } = useContext(Store)

    const HandleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <div className='w-full flex gap-3 justify-around'>

                {/* <div
                    className='bg-blue-400 p-2 rounded-lg font-bold border-2 border-sky-900 text-pink-700 cursor-pointer'
                >
                    Search
                </div > */}

                <input
                    className='border-2 border-sky-400 text-white rounded-md p-2 outline-none w-4/5'
                    type="text"
                    placeholder='Search Tasks...'
                    onChange={(e) => { HandleSearch(e) }}
                />

            </div>
        </>
    )
}

export default SearchBar