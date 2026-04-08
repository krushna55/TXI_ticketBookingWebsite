"use client";

import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ResetPassword } from "@/api/user/authemtication";
import { ConfirmationModel } from "@/components/ConfirmationModel";
import { ResettPassData } from "@/types/user";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { ShowPasswordBtn } from "@/components/showPasswordbtn";

export default function ResetPasswordForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isValidSession, setIsValidSession] = useState(true);
    const [newPasswordvisible, setNewPasswordVisible] = useState(true);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ResettPassData>();
    const supabase = createClient();
    // 1. Security Check: Verify user arrived via a valid reset link
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                router.push('/login');
            }
        };
        checkSession();
    }, [supabase]);

    const onSubmit = async (data: ResettPassData) => {
        setLoading(true);
        try {
            await ResetPassword(data);
            // Show success modal instead of immediate redirect
            setIsOpenModel(true);
        } catch (err) {
            reset();
        } finally {
            setLoading(false);
        }
    };

    // If user has no session, don't show the form
    if (!isValidSession) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <p className="text-red-500 mb-4">Reset link is invalid or has expired.</p>
                <button onClick={() => router.push('/forgetpassword')} className="bg-royal text-white p-2 rounded-lg">
                    Request New Link
                </button>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col text-black my-3 h-[400px] justify-center'>
                <label className='text-gray-600 md:text-xl text-sm my-3'>New Password</label>
                <div className={`flex justify-between ${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} `}>
                    <input
                        className={`p-1 bg-white text-sm md:text-xl font-light outline-none`}
                        type={`${newPasswordvisible ? 'password' : 'text'}`} // Use password type for security
                        placeholder="Enter new password"
                        {...register("Password", {
                            required: 'Please Enter new Password',
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i,
                                message: "Must be 8-16 characters, containing uppercase, lowercase, number, and symbol."
                            }
                        })}
                    />
                    <ShowPasswordBtn passwordVisible={newPasswordvisible} setPasswordVisible={setNewPasswordVisible} />
                </div>
                {errors.Password && <p role="alert" className='text-red-500 text-xs'>{errors.Password.message}</p>}
                {/* 2. Added Confirm Password Field for UX */}
                <label className='text-gray-600 md:text-xl text-sm my-3'>Confirm Password</label>
                <div className={`flex justify-between ${errors.confirmPassword ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'}`}>
                    <input
                        className={`p-1  bg-white text-sm md:text-xl font-light outline-none`}
                        type={`${confirmPasswordVisible ? 'password' : 'text'}`} // Use password type for security
                        placeholder="Repeat new password"
                        {...register("confirmPassword", {
                            required: 'Please confirm your password',
                            validate: (val: string) => {
                                if (watch('Password') !== val) {
                                    return "Your passwords do not match";
                                }
                            },
                        })}
                    />
                    <ShowPasswordBtn passwordVisible={confirmPasswordVisible} setPasswordVisible={setConfirmPasswordVisible} />
                </div>
                {errors.confirmPassword && <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className={`${loading || Object.keys(errors).length > 0 ? 'bg-slate-200 text-gray-600 cursor-not-allowed' : 'bg-royal text-white'} p-2 mt-10 text-xl rounded-lg`}
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
                {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            </form>

            <ConfirmationModel
                isOpen={isOpenModel}
                onCancle={() => setIsOpenModel(false)}
                title="Password Reset Successful"
                message="Your password has been updated. You can now log in with your new credentials."
                onConfirmation={() => {
                    setIsOpenModel(false);
                    router.push('/login');
                }}
            />
        </>
    );
}
