'use client'
import forgetpassbackground from '../../../public/forgetpassbackground.png'
import AuthFrame from '@/components/AuthFrame';
import ForgetPasswordForm from '@/form/auth/ForgetPasswordForm';



export default function ForgetPassword(){
    
    return (
        <>
        <AuthFrame backgroundImg={forgetpassbackground} title='Forget Password'>
            <ForgetPasswordForm/>
        </AuthFrame>
        </>
    )
}