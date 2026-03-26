import { createClient } from "@/lib/supabase/client"
import { ForgetPassData, loginData, ResettPassData, signupdata } from "@/types/user"

const supabase = createClient()

export async function fetchUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) {
        console.warn("No active session found");
        return null; 
    }
    return (data.user?.user_metadata)
}
export async function LogoutUser() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        throw new Error("Error occured while fetching user", error)
    }

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

    console.log({ error })

    if (error) {
        throw new Error(error.message)
    }

    return data
}
export async function LoginUser(user: loginData) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: user.Email,
        password: user.Password,
    })

    console.log({ error })

    if (error) {
        throw new Error(error.message)
    }

    return data
}
export async function ForgetPassword(user: ForgetPassData) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(user.Email, {
        redirectTo: 'http://localhost:3000/updatepassword',
    })
    console.log({ error })

    if (error) {
        throw new Error(error.message)
    }

    return data
}
export async function ResetPassword(user: ResettPassData) {
    const { data, error } = await supabase.auth.updateUser({ password: user.Password })
    console.log({ error })

    if (error) {
        throw new Error(error.message)
    }

    return data
}