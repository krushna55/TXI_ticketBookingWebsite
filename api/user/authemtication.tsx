import { createClient } from "@/lib/supabase/client"
import { signupdata } from "@/types/user"

const supabase = createClient()

export async function RegisterUser(user: signupdata) {
    const { data, error } = await supabase.auth.signUp({
        email: user.Email,
        password: user.Password,
        options: {
            data: {
                fullName: user.Name
            }
        }
    })

    console.log({error})

    if (error) {
        throw new Error(error.message)
    }

    return data
}