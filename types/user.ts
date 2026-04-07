import { Tables } from "@/database.types"
export type user = Tables<'profile'>
export interface signupdata {
    Name: string
    Email: string
    Password: string
}
export interface loginData {
    Email: string
    Password: string
}
export interface ForgetPassData {
    Email: string
}
export interface ResettPassData {
    Password: string
    confirmPassword: string
}