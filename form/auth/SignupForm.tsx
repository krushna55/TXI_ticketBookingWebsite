// import { RegisterUser } from "@/api/user/authemtication";
// import { ConfirmationModel } from "@/components/ConfirmationModel";
// import Typography from "@/components/Typography";
// import { createClient } from "@/lib/supabase/client";
// import { signupdata } from "@/types/user";
// import { redirect } from "next/dist/server/api-utils";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { use, useState } from "react";
// import { set, useForm } from "react-hook-form";

// export default function SignupForm() {
//     const { register, handleSubmit, reset, formState: { errors } } = useForm<signupdata>();
//     const [loading, setLoading] = useState(false);
//     const [isOpenModel, setisOpenModel] = useState(false);
//     const router = useRouter()
//     const [modelData, setModelData] = useState({
//         location: '/login',
//         title: "Account Created Successfully",
//         message: "Please check your email for verification link. go to login Page !"
//     })
//     const supabase = createClient()
//     const onSubmit = async (data: signupdata) => {
//         setLoading(true);
//         const { data: existingUser, error } = await supabase.from('user_status').select('email,is_verified').eq('email', data.Email).maybeSingle();
//         if (error) {
//             console.error("Error fetching status:", error.message);
//             return;
//         }
//         console.log("Existing user status:", existingUser);
        
//         if (!existingUser) {
//             await RegisterUser(data)
//             reset();
//             setLoading(false);
//             setisOpenModel(true);
//             setModelData({
//                 location: '/login',
//                 title: "Account Created Successfully",
//                 message: "Please check your email for verification link. go to login Page !"
//             });
//         } else if (existingUser?.is_verified) {
//             reset();
//             setLoading(false);
//             setisOpenModel(true);
//             setModelData({
//                 location: '/login',
//                 title: "Email Already Verified",
//                 message: "An account with this email already exists and is verified. Please go to login page."
//             })
//         } else {
//             const { data: resendLink, error } = await supabase.auth.resend({
//                 type: 'signup',
//                 email: data.Email,
//                 options: {
//                     emailRedirectTo: `${window.location.origin}/login`
//                 }
//             })
//             if(error){
//                 console.error("Error resending verification email:", error.message);
//                 setLoading(false);
//                 return;
//             }
//             reset();
//             setLoading(false);
//             setisOpenModel(true);
//              setModelData({
//                 location: '/login',
//                 title: "Your account already exisist  We sent you email verification link.Please check your email",
//                 message: "Please check your email for verification link. go to login Page !"
//             })
//         }
//     };

//     if (Object.keys(errors).length > 0) {
//         console.log(errors);

//     }
//     return (
//         <>
//             <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  text-black my-3'>
//                 <label className='text-gray-600 md:text-xl text-sm  my-3'>Full Name</label>
//                 <input className={`p-1 ${errors.Name ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} bg-white  text-sm md:text-xl font-light outline-none `} type="text" placeholder="Full Name" {...register("Name", { required: 'Please Enter your name' })} />
//                 {errors.Name && <p role="alert" className='text-red-500 text-xs'>{errors.Name.message}</p>}
//                 <label className='text-gray-600 md:text-xl  text-sm my-3'>Email</label>
//                 <input className={`p-1 ${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} bg-white  text-sm md:text-xl font-light outline-none `} type="email" placeholder="Email" {...register("Email", { required: 'Please enter valid Email address' })} />
//                 {errors.Email && <p role="alert" className='text-red-500 text-xs'>{errors.Email.message}</p>}
//                 <label className='text-gray-600 md:text-xl  text-sm my-3'>Password</label>
//                 <input className={`p-1 ${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300'} bg-white  text-sm md:text-xl font-light outline-none`} type="password" placeholder="Password" {...register("Password", {
//                     required: 'password must Must be 8-16 characters, containing uppercase, lowercase, number, and symbol.', pattern: {
//                         value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i,
//                         message: "Must be 8-16 characters, containing uppercase, lowercase, number, and symbol."
//                     }
//                 })} />
//                 {errors.Password && <p role="alert" className='text-red-500  text-xs'>*{errors.Password.message} </p>}
//                 {loading ? (
//                     <button type="submit" className={`${Object.keys(errors).length > 0 ? 'disabled:bg-slate-200 text-gray-600 cursor-not-allowed' : 'bg-royal text-white'}  p-2  mt-10 text-xl rounded-lg`} >Signing Up...</button>
//                 ) : (
//                     <button type="submit" className={`${Object.keys(errors).length > 0 ? 'disabled:bg-slate-200 text-gray-600 cursor-not-allowed' : 'bg-royal text-white'}  p-2  mt-10 text-xl rounded-lg`} >Sign Up</button>
//                 )}
//             </form>
//             <Typography className="py-2 text-center">Already have an Account?</Typography>
//             <Link
//                 href={'/login'}
//                 className={`block w-full text-center p-2 mt-4 text-xl rounded-lg border border-royal text-royal hover:bg-royal/5`} >
//                 Login
//             </Link>

//             <ConfirmationModel
//                 isOpen={isOpenModel}
//                 onCancle={() => setisOpenModel(false)}
//                 title="Account Created Successfully"
//                 message="Please check your email for verification link. go to login Page !"
//                 onConfirmation={() => {
//                     setisOpenModel(false)
//                     router.push('/login')
//                 }}
//             />
//         </>
//     )
// }



"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { RegisterUser } from "@/api/user/authemtication";
import { ConfirmationModel } from "@/components/ConfirmationModel";
import Typography from "@/components/Typography";
import { signupdata } from "@/types/user";

export default function SignupForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<signupdata>();
    const [loading, setLoading] = useState(false);
    const [isOpenModel, setisOpenModel] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const [modelData, setModelData] = useState({
        location: '/login',
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
                // Verified User: Direct to login
                setModelData({
                    location: '/login',
                    title: "Email Already exists",
                    message: "An account with this email already exists and is verified. Please proceed to login."
                });
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
                <input 
                    className={`p-1 ${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300'} bg-white text-sm md:text-xl font-light outline-none`} 
                    type="password" 
                    placeholder="Password" 
                    {...register("Password", {
                        required: 'Password is required.', 
                        pattern: {
                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i,
                            message: "Must be 8-16 characters, containing uppercase, lowercase, number, and symbol."
                        }
                    })} 
                />
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
        </>
    );
}
