import React, { useState } from 'react'
import { login as storeLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import authService from '../appwrite/authService.js'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [err, setErr] = useState("");

    const login = async (data) => {
        setErr("");
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(storeLogin(userData));
                navigate('/')
            }
        } catch (err) {
            setErr(err.message)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className=' mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'
            >
                <div className=' mb-2 flex justify-center '>
                    <span className=' inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>

                </div>
                <h2 className=' text-center text-2xl font-bold leading-tight'>
                    Log In to your Account
                </h2>
                <p className=' text-center mt-2 text-base text-black/60'>
                    Don&apos;t have any Account?&nbsp;
                    <Link
                        to='/signup'
                        className=' font-medium transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {err && <p className=' text-red-600 mt-8 text-center'>{err}</p>}
                <form onSubmit={handleSubmit(login)}
                    className=' mt-8'
                >
                    <div className=' space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your Email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.
                                        test(value) || "Email address must be a valid address",

                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className=" w-full"
                        >
                            Log In
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login