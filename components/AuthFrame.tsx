import Image, { StaticImageData } from 'next/image'
import Moveback from '@/utils/moveback'
import { FaArrowLeft } from "react-icons/fa6";
import Typography from '@/components/Typography';
type AuthFrameProp = {
    children: React.ReactNode;
    backgroundImg: StaticImageData;
    title:string
}
export default function AuthFrame({ children, backgroundImg,title }:AuthFrameProp) {
    return (
        <div className='relative h-screen w-full overflow-hidden'>
            <div className='absolute inset-0 h-screen w-screen z-10 bg-black opacity-50' />
            <Image
                className="h-screen w-screen  object-cover"
                src={backgroundImg}
                alt='background'
            />
            <div className='absolute z-10 inset-0 text-white my-10 md:my-20  lg:mx-10  sm:flex'>
                <div className='md:w-1/2 p-2 hidden md:block cursor-pointer pb-1' onClick={() => window.history.back()}><div className='flex items-center '>
                    <FaArrowLeft className='mr-2' />Return</div></div>
                <div className='w-full  md:w-1/2 flex  items-center xl:items-start'>
                    <div className='h-fit bg-white m-2 px-5 md:px-10 py-5  md:mr-10 w-full flex-col justify-between items-start rounded-xl'>
                        <div className='space-y- flex flex-col w-full lg:w-[70%]'>
                            <div className=' text-black md:hidden cursor-pointer pb-1' onClick={() =>window.history.back()}><div className='flex items-center '>
                                <FaArrowLeft className='mr-2' />Return</div></div>
                            <Typography size='lg' className='font-extrabold'>
                                {title}
                            </Typography>
                            {children}
                        </div>
                        <div className='mt-5'>
                            <Typography size='base' className='text-black'>
                                2021 TIX ID - PT Nusantara Elang Sejahtera.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}