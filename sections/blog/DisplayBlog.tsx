// "use client"; // Must be at the very top!
// import { FaRegThumbsUp } from "react-icons/fa";
// import { fetchBlogById, fetchRecommandedBlog, increatelikebyId } from "@/api/blog/blog";
// import Typography from "@/components/Typography";
// import DateConverter from "@/utils/dateConverter";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Instagram from '../../public/insta.svg'
// import Facebook from '../../public/facebook.svg'
// import Twitter from '../../public/twitter.svg'
// import { FiLoader } from "react-icons/fi";
// import BlogFrame from "./blogFrame";
// import { blog } from "@/types/blog";
// import SuggestedBlog from "./suggestedBlog";
// import Skelaton from "@/components/skelaton";


// export const DisplayBlog = () => {
//     const params = useParams();
//     const blogid = params?.blogid as string;
//     const [blogData, setBlogData] = useState<blog | null>(null); // Use state to keep the data
//     const [suggestData, setSuggestData] = useState<blog[] | null>(null); // Use state to keep the data
//     const [changedLikes, setLike] = useState<number>(blogData?.likes ?? 0);
//     const [isLoading, setLoading] = useState<boolean>(false);
//     const [islikeLoading, setlikeLoading] = useState<boolean>(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!blogid) return;
//             setLoading(true)
//             const data = await fetchBlogById(Number(blogid));
//             setBlogData(data);
//             setLike(data?.likes ?? 0)

//             const suggestdata = await fetchRecommandedBlog(0, 2, data?.id ?? 1)
//             setSuggestData(suggestdata)
//             setLoading(false)
//         };
//         fetchData();

//     }, []); 
//     function handleClick() {
//         const shareData = {
//             title: 'check this Now!',
//             text: 'Amazing content from my site',
//             url: window.location.href,
//         }
//         if (navigator.share) {
//             navigator.share(shareData)
//                 .then(() => console.log('Shared successfully'))
//                 .catch((error) => console.log('Error sharing:', error));
//         } else {
//             // Fallback: Copy to clipboard or show a share modal
//             navigator.clipboard.writeText(shareData.url);
//             alert('Link copied to clipboard! Paste it to Instagram.');
//         }
//     }
//     async function handleLike(id: number) {
//         setlikeLoading(true)
//         const likes = await increatelikebyId(id)
//         setLike(changedlikes => changedlikes + 1)
//         setlikeLoading(false)
//     }

//     const renderedList = suggestData?.map((obj) => {
//         return <BlogFrame obj={obj} />
//     })

//     return (<>
//         {isLoading || !blogData ?
//             <div>
//                 <div className="px-5 md:px-20 mt-10">
//                     <div className="max-w-[1000px] mx-auto flex flex-col space-y-5 md:px-5 lg:p-0">
//                         <Skelaton className=" w-full h-36 md:h-40  lg:h-52" />
//                         <Skelaton className=" w-full h-10" />
//                         <Skelaton className=" w-full h-10" />
//                         <Skelaton className=" w-full h-10" />
//                         <Skelaton className=" w-full h-10" />

//                     </div>
//                 </div>
//             </div>
//             :
//             <div>

//                 <div className="px-5 md:px-20 mt-10">
//                     <div className="max-w-[1000px] mx-auto flex flex-col space-y-5 md:px-5 lg:p-0">
//                         {/* <div> */}
//                         <Typography size="header-large" >
//                             {blogData?.title}
//                         </Typography>
//                         {/* </div> */}
//                         <Typography size="body-large" color="font_shade_600" className="py-2    ">
//                             {DateConverter(blogData?.created_at ?? '')}|TIX ID
//                         </Typography>
//                         <div>
//                             <Image src={blogData?.imageUrl ?? '/fallback-image.jpg'} height={500} width={1000} className="aspect-video object-cover rounded-xl mb-10 md:mb-20" alt="blog image" />
//                             <Typography size='body-medium' className="whitespace-pre-line w-[90%] md:w-[100%] flex text-justify">
//                                 {blogData?.description}
//                             </Typography>
//                         </div>
//                         <div className="pt-10 md:pt-20 space-y-5">
//                             <Typography size="header-small">Share this article</Typography>
//                             <div className='flex space-x-5'>
//                                 <Image onClick={handleClick} src={Instagram} className='h-auto aspect-square' alt='instagram' />
//                                 <Image onClick={handleClick} src={Twitter} className='h-auto aspect-square' alt='Twitter' />
//                                 <Image onClick={handleClick} src={Facebook} className='h-auto aspect-square' alt='FaceBook' />
//                             </div>
//                         </div>
//                         <div className="flex justify-center items-center p-2">
//                             <div onClick={() => handleLike(blogData?.id ?? 0)} className="flex gap-4  border rounded-xl px-3 py-1 items-center border-black hover:scale-90 ">
//                                 <FaRegThumbsUp />
//                                 {/* {blogData?.likes} */}
//                                 <div className="min-h-6 flex items-center">
//                                     {islikeLoading ? <FiLoader className="animate-spin" /> : changedLikes}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>


//                 </div>
//             </div>
//         }
//         <div className="w-full flex justify-center my-3 md:my-10">
//             <Typography size="header-medium">See Other Articles</Typography>
//         </div>
//         <SuggestedBlog />
//     </>);
// };


"use client";

import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { fetchBlogById, fetchRecommandedBlog } from "@/api/blog/blog";
import Typography from "@/components/Typography";
import DateConverter from "@/utils/dateConverter";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Instagram from '../../public/insta.svg';
import Facebook from '../../public/facebook.svg';
import Twitter from '../../public/twitter.svg';
import { FiLoader } from "react-icons/fi";
import { blog } from "@/types/blog";
import SuggestedBlog from "./suggestedBlog";
import Skelaton from "@/components/skelaton";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export const DisplayBlog = () => {
    const params = useParams();
    const blogid = params?.blogid as string;
    const supabase = createClient();

    const [blogData, setBlogData] = useState<blog | null>(null);
    const [changedLikes, setLike] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [islikeLoading, setlikeLoading] = useState<boolean>(false);
    const pathName = usePathname()
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            if (!blogid) return;
            setLoading(true);
            
            // 1. Fetch Blog Content
            const data = await fetchBlogById(Number(blogid));
            if (data) {
                setBlogData(data);
                setLike(data.likes ?? 0);
                
                // 2. Check if current user has already liked this blog
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: likeRecord } = await supabase
                        .from('blog_likes')
                        .select('blog_id')
                        .eq('user_id', user.id)
                        .eq('blog_id', Number(blogid))
                        .maybeSingle();
                    
                    setIsLiked(!!likeRecord);
                }
            }
            setLoading(false);
        };
        fetchData();
    }, [blogid, supabase]);

    async function handleLikeToggle(id: number) {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            toast.error("Please login to like the blog.");  
            router.push(`/login?redirect=${pathName}`);
            return;
        }

        setlikeLoading(true);
        try {
            if (isLiked) {
                const { error } = await supabase
                    .from('blog_likes')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('blog_id', id);

                if (!error) {
                    setIsLiked(false);
                    setLike(prev => prev - 1);
                }
            } else {

                const { error } = await supabase
                    .from('blog_likes')
                    .insert({ user_id: user.id, blog_id: id });

                if (!error) {
                    setIsLiked(true);
                    setLike(prev => prev + 1);
                }
            }
        } catch (err) {
            console.error("Like toggle failed", err);
        } finally {
            setlikeLoading(false);
        }
    }

    function handleShare() {
        const shareData = {
            title: blogData?.title || 'Check this out!',
            url: window.location.href,
        };
        if (navigator.share) {
            navigator.share(shareData).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    }

    // Guard: Loading or Data Null
    if (isLoading || !blogData) {
        return (
            <div className="px-5 md:px-20 mt-10">
                <div className="max-w-[1000px] mx-auto flex flex-col space-y-5">
                    <Skelaton className="w-full h-36 md:h-52" />
                    <Skelaton className="w-full h-10" />
                    <Skelaton className="w-full h-10" />
                    <Skelaton className="w-full h-10" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="px-5 md:px-20 mt-10">
                <div className="max-w-[1000px] mx-auto flex flex-col space-y-5 md:px-5 lg:p-0">
                    <Typography size="header-large">{blogData.title}</Typography>
                    
                    <Typography size="body-large" color="font_shade_600" className="py-2">
                        {DateConverter(blogData.created_at)} | TIX ID
                    </Typography>

                    <div>
                        <Image 
                            src={blogData.imageUrl ?? '/fallback-image.jpg'} 
                            height={500} 
                            width={1000} 
                            priority 
                            className="aspect-video object-cover rounded-xl mb-10 md:mb-20" 
                            alt="blog image" 
                        />
                        <Typography size='body-medium' className="whitespace-pre-line text-justify">
                            {blogData.description}
                        </Typography>
                    </div>

                    <div className="pt-10 md:pt-20 space-y-5">
                        <Typography size="header-small">Share this article</Typography>
                        <div className='flex space-x-5'>
                            <Image onClick={handleShare} src={Instagram} className='cursor-pointer h-auto aspect-square' alt='instagram' />
                            <Image onClick={handleShare} src={Twitter} className='cursor-pointer h-auto aspect-square' alt='Twitter' />
                            <Image onClick={handleShare} src={Facebook} className='cursor-pointer h-auto aspect-square' alt='FaceBook' />
                        </div>
                    </div>

                    <div className="flex justify-center items-center p-2">
                        <button 
                            onClick={() => handleLikeToggle(blogData.id)} 
                            disabled={islikeLoading}
                            className={`flex gap-4 border rounded-xl px-4 py-2 items-center transition-all ${isLiked ? 'border-royal text-royal bg-royal/5' : 'border-black hover:scale-95'}`}
                        >
                            {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                            <div className="min-w-[20px] min-h-6 flex justify-center">
                                {islikeLoading ? <FiLoader className="animate-spin" /> : changedLikes}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center my-3 md:my-10">
                <Typography size="header-medium">See Other Articles</Typography>
            </div>
            <SuggestedBlog nId={blogid}/>
        </>
    );
};

