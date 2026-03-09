'use client'
import loginbackground from '../../../public/loginbackground.png'
import AuthFrame from '@/components/AuthFrame';
import LoginForm from '@/form/auth/LoginForm';
import SignupForm from '@/form/auth/SignupForm';



export default function Login() {
    
    return (
        <>
        <AuthFrame backgroundImg={loginbackground} title='Login to TIX ID'>
            <LoginForm/>
        </AuthFrame>
        </>
    )
}