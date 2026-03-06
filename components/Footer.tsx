'use client'
import Image from 'next/image'
import logo from '../public/footerlogo.png'
import Link from 'next/link'
import Instagram from '../public/insta.svg'
import Facebook from '../public/facebook.svg'
import Twitter from '../public/twitter.svg'
import GooglePlay from '../public/GooglePlay.png'
import AppleStore from '../public/apple-download.png'

export default function Footer() {
    return (
        <>
            <hr className='border border-gray-400 mt-10  bg-white text-black  ' />
            {/* <div className='block mx-auto md:flex flex-1 w-full mt-10'>
                <div className='flex flex-1   w-[20vw]'>
                    <div className='pl-16'>
                        <Image src={logo} alt='logo' className='w-50  aspect-auto' />
                    </div>
                </div>
                <div className='w-[10vw] flex flex-1  flex-col space-y-3'>
                    <Link href={'/'} className='font-bold'>Company </Link>
                    <Link href={'/'} className=''>Contact Us </Link>
                    <Link href={'/'} className=''>About US </Link>
                    <Link href={'/'} className=''>Partner </Link>
                </div>
                <div className='w-[10vw] flex flex-1  flex-col space-y-3'>
                    <Link href={'/'} className='font-bold'>About </Link>
                    <Link href={'/'} className=''>TIX ID News </Link>
                    <Link href={'/'} className=''>Cinema </Link>
                    <Link href={'/'} className=''>My Ticket </Link>
                    <Link href={'/'}>Installment</Link>
                </div>
                <div className='w-[10vw] flex flex-1 flex-col space-y-3'>
                    <Link href={'/'} className='font-bold'>Support</Link>
                    <Link href={'/'} className=''>Help Center </Link>
                    <Link href={'/'} className=''>Privacy Policy </Link>
                    <Link href={'/'} className=''>FAQ</Link>
                    <Link href={'/'}>Terms And Conditions</Link>
                </div>
                <div className='w-[40vw] flex flex-1 flex-col space-y-3'>
                    <p className='text-gray-600'>Follow us On Social Media</p>
                    <div className='flex space-x-5'>
                        <Image src={Instagram} alt='instagram' />
                        <Image src={Twitter} alt='Twitter' />
                        <Image src={Facebook} alt='FaceBook' />
                    </div>
                    <p className='font-bold'>Download the TIX ID Application</p>
                    <div className='flex space-x-5'>
                        <Image src={GooglePlay} alt='Google play' />
                        <Image src={AppleStore} alt='Apple Store' />

                    </div>
                    <p className='opacity-80'>2021 TIX ID - PT Nusantara Elang Sejahtera.</p>
                </div>

            </div> */}
            <div className='flex flex-col  lg:grid max-w-[1400px] mx-auto  lg:grid-cols-8 mt-10 space-x-5 space-y-5 sm:px-5 '>
                <div className='w-full col-span-2  mt-2'>
                    <div className='flex lg:block justify-center items-center mb-5 w-full'>
                        <Image src={logo} alt='logo' className='w-50 aspect-auto' />
                    </div>
                </div>
                <div className='col-span-3 mt-5'>
                    <div className='sm:grid sm:grid-cols-3'>
                        <div className=' flex items-center sm:items-start mt-5  sm:mt-0 flex-col space-y-5'>
                            <Link href={'/'} className='font-bold'>Company </Link>
                            <Link href={'/'} className=''>Contact Us </Link>
                            <Link href={'/'} className=''>About US </Link>
                            <Link href={'/'} className=''>Partner </Link>
                        </div>
                        <div className=' flex items-center sm:items-start  mt-5  sm:mt-0 flex-col space-y-5'>
                            <Link href={'/'} className='font-bold'>About </Link>
                            <Link href={'/'} className=''>TIX ID News </Link>
                            <Link href={'/'} className=''>Cinema </Link>
                            <Link href={'/'} className=''>My Ticket </Link>
                            <Link href={'/'}>Installment</Link>
                        </div>
                        <div className=' flex items-center sm:items-start  mt-5  sm:mt-0 justify-start flex-col space-y-5 '>
                            <Link href={'/'} className='font-bold'>Support</Link>
                            <Link href={'/'} className=''>Help Center </Link>
                            <Link href={'/'} className=''>Privacy Policy </Link>
                            <Link href={'/'} className=''>FAQ</Link>
                            <Link href={'/'}>Terms And Conditions</Link>
                        </div>
                    </div>
                </div>
                <div className='col-span-3  flex flex-1 flex-col justify-center items-center  mt-2'>
                    <div className='flex flex-1 flex-col space-y-5  '>
                        <p className='text-gray-600'>Follow us On Social Media</p>
                        <div className='flex space-x-5'>
                            <Image src={Instagram} className='h-auto aspect-square' alt='instagram' />
                            <Image src={Twitter} className='h-auto aspect-square' alt='Twitter' />
                            <Image src={Facebook} className='h-auto aspect-square' alt='FaceBook' />
                        </div>
                        <p className='font-bold'>Download the TIX ID Application</p>
                        <div className='flex space-x-5'>
                            <Image src={GooglePlay} alt='Google play' />
                            <Image src={AppleStore} alt='Apple Store' />

                        </div>
                        <p className='opacity-80'>2021 TIX ID - PT Nusantara Elang Sejahtera.</p>
                    </div>
                </div>
            </div>
        </>
    )
}