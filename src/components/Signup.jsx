import React, { useState } from 'react'
import authService from '../appwrite/authService'
import { Button, Input, Logo } from './index'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'


function Signup() {
    const navigate = useNavigate()
    const [err, setErr] = useState()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const createAcc = async (data) => {
        setErr("");
        try {
            const user = await authService.createAccount(data)
            if (user) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate('/')
            }

        } catch (err) {
            setErr(err.message)

        }
    }

    return (
        <div className=' flex items-center justify-center'>
            <div className=' mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className=' mb-2 flex justify-center '>
                    <span className=' inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>

                </div>
                <h2 className=' text-center text-2xl font-bold leading-tight'>
                    Create your Account
                </h2>
                <p className=' text-center mt-2 text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link
                        to='/login'
                        className=' font-medium transition-all duration-200 hover:underline'
                    >
                        Log In
                    </Link>
                </p>
                {err && <p className=' text-red-600 mt-8 text-center'>{err}</p>}
                <form onSubmit={handleSubmit(createAcc)}>
                    <div className=' space-y-5'>
                        <Input
                            label="Full Name"
                            type='text'
                            placeholder="Enter your name"
                            {...register('name', {
                                required: true,
                            })}
                        />
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
                            type='password'
                            placeholder="Enter your password"
                            {...register('password', {
                                required: true
                            })}
                        />
                        <Button
                            type="submit"
                            className=" w-full"
                        >
                            Create Account
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup