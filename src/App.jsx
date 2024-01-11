import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from './appwrite/authService';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index'
import { Outlet } from "react-router-dom";

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])


  return !loading ? (
    <div className=" min-h-full flex justify-center items-center flex-wrap content-between bg-slate-600">
      <div className=" w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App
