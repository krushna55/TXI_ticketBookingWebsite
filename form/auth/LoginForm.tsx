import { LoginUser, RegisterUser } from "@/api/user/authemtication";
import Typography from "@/components/Typography";
import { loginData, signupdata } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginForm() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<loginData>();
    const onSubmit = async (data: loginData) => {
        console.log(data);
        const error = await LoginUser(data)
        console.log(error)
        if (!error) {
            router.push('/')
            router.refresh() 
        }
    };

    if (Object.keys(errors).length > 0) {
        console.log(errors);

    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  text-black my-3'>
                <label className='text-gray-600 md:text-xl  text-sm my-3'>Email</label>
                <input className={`p-1 ${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} bg-white  text-sm md:text-xl font-light outline-none `} type="email" placeholder="Email" {...register("Email", { required: 'Please enter valid Email address' })} />
                {errors.Email && <p role="alert" className='text-red-500 text-xs'>{errors.Email.message}</p>}
                <label className='text-gray-600 md:text-xl  text-sm my-3'>Password</label>
                <input className={`p-1 ${errors.Password ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300'} bg-white  text-sm md:text-xl font-light outline-none`} type="password" placeholder="Password" {...register("Password", {
                    required: 'password must Must be 8-16 characters, containing uppercase, lowercase, number, and symbol.', pattern: {
                        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i,
                        message: "Must be 8-16 characters, containing uppercase, lowercase, number, and symbol."
                    }
                })} />
                {errors.Password && <p role="alert" className='text-red-500  text-xs'>*{errors.Password.message} </p>}
                <div className="flex justify-end mt-10">
                    <Link href={'/forgetpassword'}>Forgot password?</Link>
                </div>
                < button type="submit" className={`${Object.keys(errors).length > 0 ? 'disabled:bg-slate-200 text-gray-600 cursor-not-allowed' : 'bg-royal text-white'}  p-2  mt-5 text-xl rounded-lg`} >Login</button>
            </form>
            <Typography className="py-2 text-center">Don't have an Account?</Typography>
            <Link
                href={'/register'}
                className={`block w-full text-center p-2 mt-4 text-xl rounded-lg border transition-colors border-royal text-royal hover:bg-royal/5`} >
                Register
            </Link> 
        </>
    )
}