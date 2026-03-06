'use client'
import Image from 'next/image'
import Registerbackground from '../../../public/registerBackground.png'
import Moveback from '@/utils/moveback'
import { FaArrowLeft } from "react-icons/fa6";
import React from 'react';
import { useForm } from 'react-hook-form';
import Typography from '@/components/Typography';
import { signupdata } from '@/types/user';
import { RegisterUser } from '@/api/user/authemtication';



export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<signupdata>();
    const onSubmit = async (data: signupdata) => {
        console.log(data);
        const { error } = await RegisterUser(data)
        error ? 'theere is eror' : 'no error ';
    };
    if (Object.keys(errors).length > 0) {
        console.log(errors);
    }

    return (
        <div className='relative h-screen w-full overflow-hidden'>
            <div className='absolute inset-0 h-screen w-screen z-10 bg-black opacity-50' />
            <Image
                className="h-screen w-screen  object-cover"
                src={Registerbackground}
                alt='background'
            />
            <div className='absolute z-10 inset-0 text-white my-10 md:my-20  lg:mx-10  sm:flex'>
                <div className='md:w-1/2 p-2 hidden md:block' onClick={() => Moveback()}><div className='flex items-center '><FaArrowLeft className='mr-2' />Return</div></div>
                <div className='w-full md:w-1/2 flex  items-center '>
                    <div className='bg-white m-2 px-5 md:px-10 py-5  md:mr-10 w-full h-fit flex flex-col justify-between items-start rounded-xl'>
                        <div className='space-y-10 flex flex-col w-full lg:w-[70%]'>
                            <div className=' text-black md:hidden' onClick={() => Moveback()}><div className='flex items-center '><FaArrowLeft className='mr-2' />Return</div></div>
                            <Typography size='lg' className='font-extrabold'>
                                Register TIX ID
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  text-black my-3'>
                                <label className='text-gray-600 md:text-xl text-sm  my-3'>Full Name</label>
                                <input className={`p-1 ${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300'} bg-white  text-sm md:text-xl font-light outline-none mb-5`} type="text" placeholder="Full Name" {...register("Name", { required: 'Please Enter your name' })} />
                                {errors.Name && <p role="alert" className='text-red-500 text-xs'>{errors.Name.message}</p>}
                                <label className='text-gray-600 md:text-xl  text-sm my-3'>Email</label>
                                <input className={`p-1 ${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300'} bg-white  text-sm md:text-xl font-light outline-none mb-5 `} type="email" placeholder="Email" {...register("Email", { required: 'Please enter valid Email address' })} />
                                {errors.Email && <p role="alert" className='text-red-500 text-xs'>{errors.Email.message}</p>}
                                <label className='text-gray-600 md:text-xl  text-sm my-3'>Password</label>
                                <input className={`p-1 ${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300'} bg-white  text-sm md:text-xl font-light outline-none`} type="password" placeholder="Password" {...register("Password", {
                                    required: 'password must have eight characters including one uppercase letter, one lowercase letter, and one number or special character.', pattern: {
                                        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i,
                                        message: "Must be 8-16 characters, containing uppercase, lowercase, number, and symbol."
                                    }
                                })} />
                                {errors.Password && <p role="alert" className='text-red-500  text-xs'>*{errors.Password.message} </p>}
                                < input type="submit" className='bg-royal p-2 text-white mt-10 text-xl rounded-lg' />
                            </form>
                        </div>
                        <div className='mt-10'>
                            <Typography size='base' className='text-black'>
                                2021 TIX ID - PT Nusantara Elang Sejahtera.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}