'use client'
import { ResetPassword } from '@/api/user/authemtication';
import forgetpassbackground from '../../../public/forgetpassbackground.png'
import AuthFrame from '@/components/AuthFrame';
import ResetPasswordForm from '@/form/auth/ResetPassword';




export default function ResetPasswordFrame() {
    
    return (
        <>
        <AuthFrame backgroundImg={forgetpassbackground} title='Reset Password'>
            <ResetPasswordForm/>
        </AuthFrame>
        </>
    )
}