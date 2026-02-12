import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { API } from '../../API/api';
import { Store } from './Store';



const ContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [refetch, setRefetch] = useState(false)
    const [users, setUsers] = useState([])
    const [openCreateModal, setOpenCreateModal] = useState(false)

    const [search, setSearch] = useState("");
    const [paginate, setPaginate] = useState(1);
    const [page, setPage] = useState(1);

    return (
        <Store.Provider value={{
            isLoading, setIsLoading,
            refetch, setRefetch,
            users, setUsers,
            openCreateModal, setOpenCreateModal,
            search, setSearch,
            paginate, setPaginate,
            page, setPage
        }}>
            {children}
        </Store.Provider>
    )
}

export default ContextProvider