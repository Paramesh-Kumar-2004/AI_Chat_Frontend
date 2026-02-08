import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router'
import Car3 from "../../assets/Car_Images_3.jpg"
import { API } from '../../API/api'



const Register = () => {

    const navigate = useNavigate()
    const [viewPassword, setViewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        password: ""
    })

    const HandleOnChange = async (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await API.post("/auth/register", userData);

            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 2000,
            });
            navigate("/login")

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!", {
                position: "top-center",
                autoClose: 2000,
            });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">

            <img
                src={Car3}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-10 w-full max-w-md bg-black/30 border-2 border-[rgb(181,174,166)] shadow-[0_0_10px_rgba(0,0,0,0.8)] rounded-lg p-6 text-center">

                <form onSubmit={HandleSubmit}>

                    <h3 className="text-[#00CFFF] text-2xl font-extrabold italic mb-2">
                        Register
                    </h3>

                    <div>
                        <label className="block text-left text-[#00CFFF] font-bold text-lg mb-1">
                            Name :
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            name='userName'
                            value={userData.userName}
                            onChange={(e) => HandleOnChange(e)}
                            required
                            className="w-full p-3 mb-4 bg-black/40 border-4 border-sky-400 rounded-lg text-[rgba(0,207,255,0.8)] font-bold text-base outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-left text-[#00CFFF] font-bold text-lg mb-1">
                            Email :
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            name='email'
                            value={userData.email}
                            required
                            onChange={(e) => HandleOnChange(e)}
                            className="w-full p-3 mb-4 bg-black/40 border-4 border-sky-400 rounded-lg text-[rgba(0,207,255,0.8)] font-bold text-base outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-left text-[#00CFFF] font-bold text-lg mb-1">
                            Password :
                        </label>

                        <input
                            type={viewPassword ? "text" : "password"}
                            placeholder="Enter Your Password"
                            name="password"
                            value={userData.password}
                            required
                            onChange={(e) => HandleOnChange(e)}
                            className="w-full p-3 bg-black/40 border-4 border-sky-400 rounded-lg text-[rgba(0,207,255,0.8)] font-bold text-base outline-none"
                        />

                        <div className="mt-1 text-right text-[#00E5FF] font-bold text-sm cursor-pointer transition text-shadow hover:text-sky-400">
                            <span onClick={() => setViewPassword(!viewPassword)}>
                                {viewPassword ? "Hide Password" : "Show Password"}
                            </span>
                        </div>

                    </div>

                    <div className="flex justify-center items-center mt-1">
                        <h1 className='text-gray-300 font-semibold'>
                            Do You Have An Account ?
                        </h1>
                        <Link
                            to="/login"
                            className="inline-block font-bold text-lg px-2 py-1 rounded transition hover:scale-110 text-[rgba(0,207,255,0.8)] hover:text-sky-600"
                        >
                            Login Now
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full py-3 bg-blue-900 text-[#00CFFF] text-lg rounded-lg hover:scale-105 transition cursor-pointer disabled:bg-gray-900 disabled:text-white disabled:cursor-not-allowed disabled:hover:scale-100 font-bold"
                    >
                        Register
                    </button>

                </form>
            </div >
        </div >
    )
}

export default Register
