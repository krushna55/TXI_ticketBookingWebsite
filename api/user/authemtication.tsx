import { createClient } from "@/lib/supabase/client"
import { ForgetPassData, loginData, ResettPassData, signupdata } from "@/types/user"
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const supabase = createClient()

export async function fetchUser() {
    const { data, error } = await supabase.auth.getUser()
    // if (error || !data.user) {
    //     console.error("No active session found");
    //     return null; 
    // }
    return (data.user?.user_metadata)
}
export async function LogoutUser() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        throw new Error("Error occured while fetching user", error)
    }  
    toast.success("Logout successful")

}


export async function RegisterUser(user: signupdata) {
    const { data, error } = await supabase.auth.signUp({
        email: user.Email,
        password: user.Password,
        options: {
            data: {
                first_name: user.Name
            }
        }
    })
    if (error) {
        toast.error(error.message)
        return
    }
    toast.success("Account created successfully.Please check your email for verification link")
    return data
}
export async function LoginUser(user: loginData) {
    const { error } = await supabase.auth.signInWithPassword({
        email: user.Email,
        password: user.Password,
    })
    if (error) {
        toast.error(error.message)
    } else {
        toast.success("Login successful")
    }
    return error
}
export async function ForgetPassword(user: ForgetPassData) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(user.Email, {
        redirectTo: `${window.location.origin}/updatepassword`,
    })
    if (error) {
        toast.error(error.message)
        return
    }
    toast.success("Email sent successfully. Please check your email")
    return data
}
export async function ResetPassword(user: ResettPassData) {
    const { data, error } = await supabase.auth.updateUser({ password: user.Password })

    if (error) {
        toast.error(error.message)
        return error;
    }
    toast.success('Password updated successfully')
    redirect('/login')
    return data
}