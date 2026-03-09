'use client'
import forgetpassbackground from '../../../public/forgetpassbackground.png'
import AuthFrame from '@/components/AuthFrame';
import ForgetPasswordForm from '@/form/auth/ForgetPasswordForm';
import LoginForm from '@/form/auth/LoginForm';
import SignupForm from '@/form/auth/SignupForm';



export default function ResetPassword() {
    
    return (
        <>
        <AuthFrame backgroundImg={forgetpassbackground} title='Reset Password'>
            <ResetPassword/>
        </AuthFrame>
        </>
    )
}