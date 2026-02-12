import React from 'react'
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ContextProvider from './Components/Context/ContextProvider'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import ForgetPassword from './Pages/Auth/ForgetPassword'
import ResetPassword from './Pages/Auth/ResetPassword'
import NotFound from './Pages/NotFound'
import Settings from './Pages/Settings'
import Messages from './Pages/Messages'
import Dashboard from './Pages/Dashboard'



const App = () => {

  return (
    <>
      <ContextProvider >

        <HashRouter>
          <ToastContainer
            autoClose={1000}
            position='top-center'
            draggable
          />
          <Routes>

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='/resetpassword/:id/:token' element={<ResetPassword />} />
            <Route path='/message/:chatId' element={<Messages />} />
            <Route path='/' element={<Dashboard />} />

            <Route path='*' element={<NotFound />} />

          </Routes>
        </HashRouter>

      </ContextProvider>
    </>
  )
}

export default App