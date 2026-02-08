import React, { useState } from 'react'
import { Link, useParams } from 'react-router'
import { toast } from 'react-toastify';
import { API } from '../../API/api.js';
import Car2 from "../../assets/Car_Images_2.jpg"



const ResetPassword = () => {

    const { id, token } = useParams();
    const [resetPassword, setResetPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);



    const Onchange = async (e) => {
        setResetPassword(e.target.value)
    }

    const HandleSubmit = async (e) => {
        console.log("Entered Handle Submit")
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await API.put(`/auth/resetpassword/${id}/${token}`, resetPassword);

            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 2000,
            });

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password. Please try again.", {
                position: "top-center",
                autoClose: 2000,
            });
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">

            <img
                src={Car2}
                alt="bg"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative z-10 w-full max-w-md bg-black/30 border-2 border-cyan-600 shadow-[0_0_10px_rgba(0,0,0,0.8)] rounded-lg p-8 text-center">

                <form onSubmit={HandleSubmit}>

                    <h3 className="text-[#00CFFF] text-2xl font-extrabold italic mb-6">
                        Reset Password
                    </h3>

                    <div>
                        <label className="block text-left text-[#00CFFF] font-bold text-lg mb-1">
                            Password :
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Your New Password"
                            required
                            value={resetPassword}
                            onChange={(e) => Onchange(e)}
                            className="w-full p-3 mb-4 bg-black/40 border-[3px] border-sky-400 rounded-lg text-[rgba(0,207,255,0.8)] font-bold text-base outline-none"
                        />
                    </div>

                    {/* <div>
                        Do not worry! We will send you an email to reset your password.
                    </div> */}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full py-3 bg-blue-900 text-[#00CFFF] text-lg rounded-lg hover:scale-105 transition cursor-pointer disabled:bg-gray-900 disabled:text-white disabled:cursor-not-allowed disabled:hover:scale-100 font-bold"
                    >
                        Reset Password
                    </button>

                </form>

            </div>
        </div>
    )
}

export default ResetPassword
