import { ForgetPassword, LoginUser, RegisterUser, ResetPassword } from "@/api/user/authemtication";
import Typography from "@/components/Typography";
import { ForgetPassData, loginData, ResettPassData, signupdata } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function ResetPasswordForm() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<ResettPassData>();
    const onSubmit = async (data: ResettPassData) => {
        console.log(data);
        await ResetPassword(data)
        router.push('/login')
    };

    if (Object.keys(errors).length > 0) {
        console.log(errors);

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  text-black my-3 h-[400px] justify-center'>
            <label className='text-gray-600 md:text-xl text-sm  my-3'>Enter new Password</label>
            <input className={`p-1 ${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} bg-white  text-sm md:text-xl font-light outline-none `} type="text" placeholder="Full Name" {...register("Password", { required: 'Please Enter new Password' })} />
            {errors.Password && <p role="alert" className='text-red-500 text-xs'>{errors.Password.message}</p>}
            < input type="submit" className={`${Object.keys(errors).length > 0? 'disabled:bg-slate-200 text-gray-600 cursor-not-allowed' : 'bg-royal text-white'}  p-2  mt-10 text-xl rounded-lg`} />
        </form>
    )
}