"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LoginUser } from "@/api/user/authemtication";
import { ConfirmationModel } from "@/components/ConfirmationModel";
import Typography from "@/components/Typography";
import { loginData } from "@/types/user";
import toast from "react-hot-toast";
import { ShowPasswordBtn } from "@/components/showPasswordbtn";

export default function LoginForm() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [isOpenModel, setisOpenModel] = useState(false);
    const [modelData, setModelData] = useState({ title: "", message: "", location: "/" });
    const callbackurl = useSearchParams().get('redirect') || '/';
    const [passwordVisible, setPasswordVisible] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm<loginData>();

    const onSubmit = async (data: loginData) => {
        setLoading(true);
        try {
            const error = await LoginUser(data);

            if (!error) {
                router.push(callbackurl);
                router.refresh();
                return;
            }

            // If login fails, check if it's because they aren't verified
            if (error.message?.includes("Email not confirmed")) {
                const { data: status } = await supabase
                    .from('user_status')
                    .select('is_verified')
                    .eq('email', data.Email)
                    .maybeSingle();

                if (status && !status.is_verified) {
                    await supabase.auth.resend({
                        type: 'signup',
                        email: data.Email,
                        options: {
                            emailRedirectTo: `${window.location.origin}/login`
                        }
                    });

                    setModelData({
                        title: "Email Not Verified",
                        message: "Your email isn't verified yet. We've sent a new link to your inbox!",
                        location: "/login"
                    });
                    setisOpenModel(true);
                }
            }
        } catch (err) {
            console.error("Login unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col text-black my-3'>
                <label className='text-gray-600 md:text-xl text-sm my-3'>Email</label>
                <input
                    className={`p-1 ${errors.Email ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} bg-white text-sm md:text-xl font-light outline-none`}
                    type="email"
                    placeholder="Email"
                    {...register("Email", { required: 'Please enter valid Email address' })}
                />
                {errors.Email && <p role="alert" className='text-red-500 text-xs'>{errors.Email.message}</p>}

                <label className='text-gray-600 md:text-xl text-sm my-3'>Password</label>
                <div className={`${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300'} flex justify-between `}>
                    <input
                        className={`p-1 bg-white text-sm md:text-xl font-light outline-none`}
                        type={`${passwordVisible ? 'password' : 'text'}`}
                        placeholder="Password"
                        {...register("Password", { required: 'Password is required' })}
                    />
                    <ShowPasswordBtn passwordVisible={passwordVisible} setPasswordVisible={setPasswordVisible} />
                </div>
                {errors.Password && <p role="alert" className='text-red-500 text-xs'>*{errors.Password.message}</p>}

                <div className="flex justify-end mt-10">
                    <Link href={'/forgetpassword'} className="text-royal ">Forgot password?</Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`${loading ? 'bg-slate-200 text-gray-600 cursor-not-allowed' : 'bg-royal text-white'} p-2 mt-5 text-xl rounded-lg transition-colors`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <Typography className="py-2 text-center">Don't have an Account?</Typography>
            <Link
                href={'/register'}
                className="block w-full text-center p-2 mt-4 text-xl rounded-lg border transition-colors border-royal text-royal hover:bg-royal/5"
            >
                Register
            </Link>

            <ConfirmationModel
                isOpen={isOpenModel}
                onCancle={() => setisOpenModel(false)}
                title={modelData.title}
                message={modelData.message}
                onConfirmation={() => setisOpenModel(false)}
            />
        </>
    );
}
