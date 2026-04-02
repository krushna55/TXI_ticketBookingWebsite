import { RegisterUser } from "@/api/user/authemtication";
import Typography from "@/components/Typography";
import { signupdata } from "@/types/user";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignupForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<signupdata>();
    const onSubmit = async (data: signupdata) => {
        console.log(data);
        await RegisterUser(data)
        reset();
    };

    if (Object.keys(errors).length > 0) {
        console.log(errors);

    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  text-black my-3'>
                <label className='text-gray-600 md:text-xl text-sm  my-3'>Full Name</label>
                <input className={`p-1 ${errors.Name ? 'border-b-2 border-red-500' : 'border-b-2 border-gray-300 mb-5'} bg-white  text-sm md:text-xl font-light outline-none `} type="text" placeholder="Full Name" {...register("Name", { required: 'Please Enter your name' })} />
                {errors.Name && <p role="alert" className='text-red-500 text-xs'>{errors.Name.message}</p>}
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
                < input type="submit" className={`${Object.keys(errors).length > 0 ? 'disabled:bg-slate-200 text-gray-600 cursor-not-allowed' : 'bg-royal text-white'}  p-2  mt-10 text-xl rounded-lg`} />
            </form>
            <Typography className="py-2 text-center">Already have an Account?</Typography>
            <Link
                href={'/login'}
                className={`block w-full text-center p-2 mt-4 text-xl rounded-lg border border-royal text-royal hover:bg-royal/5`} >
                Login
            </Link>        
            </>
    )
}