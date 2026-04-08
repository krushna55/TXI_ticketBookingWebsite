"use client";

import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { RegisterUser } from "@/api/user/authemtication";
import { ConfirmationModel } from "@/components/ConfirmationModel";
import Typography from "@/components/Typography";
import { signupdata } from "@/types/user";
import { DialogueBox } from "@/components/dialogue";
import { ShowPasswordBtn } from "@/components/showPasswordbtn";

export default function SignupForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<signupdata>();
    const [loading, setLoading] = useState(false);
    const [isOpenModel, setisOpenModel] = useState(false);
    const [isdialogueModel, setisdialogueModel] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);
    const router = useRouter();
    const supabase = createClient();
    const callbackurl =  '/login';

    const [modelData, setModelData] = useState({
        location: callbackurl,
        title: "",
        message: ""
    });

    const onSubmit = async (data: signupdata) => {
        setLoading(true);
        try {
            // 1. Check existing status using the View
            const { data: existingUser, error: fetchError } = await supabase
                .from('user_status')
                .select('email, is_verified')
                .eq('email', data.Email)
                .maybeSingle();

            if (fetchError) throw fetchError;

            // 2. Branch logic based on status
            if (!existingUser) {
                // New User: Proceed with registration
                await RegisterUser(data);
                setModelData({
                    location: '/login',
                    title: "Account Created Successfully",
                    message: "Please check your email for the verification link. Then, go to the login page!"
                });
            } else if (existingUser.is_verified) {
               
                setisdialogueModel(true);
            } else {
                // Unverified User: Resend the link
                const { error: resendError } = await supabase.auth.resend({
                    type: 'signup',
                    email: data.Email,
                    options: {
                        emailRedirectTo: `${window.location.origin}/login`
                    }
                });
                if (resendError) throw resendError;

                setModelData({
                    location: '/login',
                    title: "Verification Email Resent",
                    message: "It looks like you're not verified yet. We've sent a new link to your inbox. Check it and login!"
                });
            }

            reset(); // Clear form on success
            setisOpenModel(true);
        } catch (err: any) {
            console.error("Signup Error:", err.message);
            // Optionally set modelData here to show an error modal
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col text-black my-3'>
                <label className='text-gray-600 md:text-xl text-sm my-3'>Full Name</label>
                <input
                    className={`p-1 ${errors.Name ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} bg-white text-sm md:text-xl font-light outline-none`}
                    type="text"
                    placeholder="Full Name"
                    {...register("Name", { required: 'Please enter your name' })}
                />
                {errors.Name && <p role="alert" className='text-red-500 text-xs'>{errors.Name.message}</p>}

                <label className='text-gray-600 md:text-xl text-sm my-3'>Email</label>
                <input
                    className={`p-1 ${errors.Email ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} bg-white text-sm md:text-xl font-light outline-none`}
                    type="email"
                    placeholder="Email"
                    {...register("Email", { required: 'Please enter a valid email address' })}
                />
                {errors.Email && <p role="alert" className='text-red-500 text-xs'>{errors.Email.message}</p>}

                <label className='text-gray-600 md:text-xl text-sm my-3'>Password</label>
                <div className={`${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300'} flex justify-between `}>
                    <input
                        className={`p-1 bg-white text-sm md:text-xl font-light outline-none`}
                        type={`${passwordVisible ? 'password' : 'text'}`}
                        placeholder="Password"
                        {...register("Password", {
                            required: 'Password is required.',
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i,
                                message: "Must be 8-16 characters, containing uppercase, lowercase, number, and symbol."
                            }
                        })}
                    />
                    <ShowPasswordBtn passwordVisible={passwordVisible} setPasswordVisible={setPasswordVisible} />
                    {/* <span className="cursor-pointer p-1" onClick={() => setPasswordVisible(prev => !prev)}>
                        {passwordVisible ?
                            <FaRegEyeSlash className="text-2xl text-gray-500" />
                            :
                            <AiOutlineEye className="text-2xl text-gray-500" />
                        }
                    </span> */}
                </div>
                {errors.Password && <p role="alert" className='text-red-500 text-xs'>*{errors.Password.message}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className={`${loading ? 'bg-slate-200 text-gray-600 cursor-not-allowed' : 'bg-royal text-white'} p-2 mt-10 text-xl rounded-lg transition-colors`}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            <Typography className="py-2 text-center">Already have an Account?</Typography>
            <Link
                href={'/login'}
                className={`block w-full text-center p-2 mt-4 text-xl rounded-lg border border-royal text-royal hover:bg-royal/5`}
            >
                Login
            </Link>

            {/* Combined Single Modal */}
            <ConfirmationModel
                isOpen={isOpenModel}
                onCancle={() => setisOpenModel(false)}
                title={modelData.title}
                message={modelData.message}
                onConfirmation={() => {
                    setisOpenModel(false);
                    router.push(modelData.location);
                }}
            />
            <DialogueBox
                isOpen={isdialogueModel}
                onCancle={() => setisdialogueModel(false)}
                title="Email Already Exists"
                message="An account with this email already exists and is verified. Please proceed to login."
                onConfirmation={() => router.push('/login')}
                ConfirmBtn="login"

            />
        </>
    );
}
