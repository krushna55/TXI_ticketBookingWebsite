import { ForgetPassword, LoginUser, RegisterUser } from "@/api/user/authemtication";
import Typography from "@/components/Typography";
import { ForgetPassData, loginData, signupdata } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function ForgetPasswordForm() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<ForgetPassData>();
    const onSubmit = async (data: ForgetPassData) => {
        console.log(data);
        await ForgetPassword(data)

    };

    if (Object.keys(errors).length > 0) {
        console.log(errors);

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  text-black my-3 h-[400px] justify-center'>
            <label className='text-gray-600 md:text-xl text-sm  my-3'>Enter your Email</label>
            <input className={`p-1 ${errors.Email ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} bg-white  text-sm md:text-xl font-light outline-none `} type="text" placeholder="Full Name" {...register("Email", { required: 'Please Enter your Email' })} />
            {errors.Email && <p role="alert" className='text-red-500 text-xs'>{errors.Email.message}</p>}
            < input type="submit" className={`${Object.keys(errors).length > 0? 'disabled:bg-slate-200 text-gray-600 cursor-not-allowed' : 'bg-royal text-white'}  p-2  mt-10 text-xl rounded-lg`} />
        </form>
    )
}