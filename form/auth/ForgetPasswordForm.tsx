"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ForgetPassword } from "@/api/user/authemtication";
import { ConfirmationModel } from "@/components/ConfirmationModel";
import { ForgetPassData } from "@/types/user";

export default function ForgetPasswordForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpenModel, setIsOpenModel] = useState(false);
    
    const { register, handleSubmit,reset, formState: { errors } } = useForm<ForgetPassData>();

    const onSubmit = async (data: ForgetPassData) => {
        setLoading(true);
        try {
            const error = await ForgetPassword(data);
            if (error) throw error;
            setIsOpenModel(true);
        } catch (err) {
            reset()
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col text-black my-3 h-[400px] justify-center'>
                <label className='text-gray-600 md:text-xl text-sm my-3'>Enter your Email</label>
                <input 
                    className={`p-1 ${errors.Email ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} bg-white text-sm md:text-xl font-light outline-none`} 
                    type="email" 
                    placeholder="yourname@example.com" 
                    {...register("Email", { 
                        required: 'Please enter your email',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please enter a valid email address"
                        }
                    })} 
                />
                {errors.Email && <p role="alert" className='text-red-500 text-xs'>{errors.Email.message}</p>}
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className={`${loading || Object.keys(errors).length > 0 ? 'bg-slate-200 text-gray-600 cursor-not-allowed' : 'bg-royal text-white'} p-2 mt-10 text-xl rounded-lg transition-colors`}
                >
                    {loading ? 'Sending Link...' : 'Send Reset Link'}
                </button>

                <div className="text-center mt-5">
                    <button type="button" onClick={() => router.back()} className="text-gray-500 hover:text-royal text-sm">
                        Back to Login
                    </button>
                </div>
            </form>

            <ConfirmationModel
                isOpen={isOpenModel}
                onCancle={() => setIsOpenModel(false)}
                title="Check Your Email"
                message="If an account exists for this email, we have sent a password reset link. Please check your inbox and spam folder."
                onConfirmation={() => {
                    setIsOpenModel(false);
                    router.push('/login');
                }}
            />
        </>
    );
}
