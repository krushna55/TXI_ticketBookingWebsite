
'use client'

import Image, { StaticImageData } from 'next/image'
import { FaArrowLeft } from "react-icons/fa6";
import Typography from '@/components/Typography';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

type AuthFrameProp = {
    children: React.ReactNode;
    backgroundImg: StaticImageData;
    title: string
}

export default function AuthFrame({ children, backgroundImg, title }: AuthFrameProp) {
    const router = useRouter();
    const callbackUrl = useSearchParams().get('redirect') || '/';

    const handleGoBack = () => {
        // Check if there's history to go back to
        console.log(callbackUrl)
        if (window.history.length > 1) {
            router.push(callbackUrl);
        } else {
            // Fallback to home page if no history
            router.push(callbackUrl);
        }
    };
    return (
        /* min-h-screen ensures the background covers the full viewport even if content is short */
        /* relative + overflow-x-hidden prevents unwanted horizontal scrolling */
        <div className='relative min-h-screen w-full overflow-x-hidden flex flex-col'>

            {/* Background Image Logic */}
            <div className='fixed inset-0 z-0'>
                <Image
                    src={backgroundImg}
                    alt='background'
                    fill // Uses the modern Next.js fill pattern
                    priority // Loads background fast
                    className="object-cover" // Ensures image covers area without stretching
                />
                {/* Overlay */}
                <div className='absolute inset-0 bg-black/50' />
            </div>

            {/* Main Content Layer */}
            <div className='relative z-10 flex-1 flex flex-col'>
                <div className='max-w-[1400px] w-full mx-auto px-4 py-10 md:py-20 flex flex-col md:flex-row items-start'>

                    {/* Desktop Return Button */}
                    <div
                        className='hidden md:flex md:w-1/2 p-2 cursor-pointer items-center'
                        onClick={handleGoBack}
                    >
                        <FaArrowLeft className='mr-2 text-white' />
                        <Typography size='header-small' className='text-white'>Return</Typography>
                    </div>

                    {/* Form Card Container */}
                    <div className='w-full md:w-1/2 flex justify-center lg:justify-start'>
                        <div className='bg-white p-6 md:p-10 w-full max-w-xl rounded-xl shadow-2xl flex flex-col'>

                            {/* Mobile Return Button */}
                            <div
                                className='flex md:hidden items-center mb-4 cursor-pointer text-black'
                                onClick={handleGoBack}
                            >
                                <FaArrowLeft className='mr-2' />
                                <Typography size='header-small'>Return</Typography>
                            </div>

                            <div className='flex flex-col w-full'>
                                <Typography size='header-medium' className="mb-6">
                                    {title}
                                </Typography>

                                {/* Inner Content */}
                                <div className="text-black">
                                    {children}
                                </div>
                            </div>

                            <div className='mt-10 pt-5 border-t border-gray-100'>
                                <Typography size='body-small' className="text-gray-500">
                                    2026 TIX ID - PT Nusantara Elang Sejahtera.
                                </Typography>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}