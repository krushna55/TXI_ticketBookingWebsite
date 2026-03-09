'use client'
import Registerbackground from '../../../public/registerBackground.png'
import AuthFrame from '@/components/AuthFrame';
import SignupForm from '@/form/auth/SignupForm';



export default function Register() {
    
    return (
        <>
        <AuthFrame backgroundImg={Registerbackground} title='Register TIX ID'>
            <SignupForm/>
        </AuthFrame>
        </>
    )
}