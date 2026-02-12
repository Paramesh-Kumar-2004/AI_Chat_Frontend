import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "./Context/Store";
import { API } from "../API/api";



const EditChatName = ({ chatId, title, onClose }) => {

    const { refetch, setRefetch } = useContext(Store)
    const [chatName, setChatName] = useState(`${title}`);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!chatName.trim()) {
            toast.error("Chat Name cannot be empty", {
                position: "top-center",
                autoClose: 2000
            });
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await API.patch(`/chat/${chatId}`, { chatName });

            toast(response.data.message, {
                position: "top-center",
                autoClose: 2000
            });
            setRefetch(prev => !prev);
            // setChatName("");
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add chatName", {
                position: "top-center",
                autoClose: 2000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#06344d] w-md rounded-xl border-2 border-sky-500 p-6">

                <h2 className="text-white text-xl font-semibold text-center mb-4">
                    Update Chat Name
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        value={chatName}
                        onChange={(e) => setChatName(e.target.value)}
                        placeholder="Write Your New Chat Name..."
                        className="w-full p-3 rounded-md text-white outline-none border-2 border-sky-500 resize-none"
                    />

                    <div className="flex justify-end gap-3 mt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-sky-600 text-white rounded-md disabled:opacity-60 cursor-pointer"
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditChatName;