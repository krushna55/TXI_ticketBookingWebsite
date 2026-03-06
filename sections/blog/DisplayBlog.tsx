"use client"; // Must be at the very top!
import { FaRegThumbsUp } from "react-icons/fa";
import { fetchBlogById, fetchRecommandedBlog, increatelikebyId } from "@/api/blog";
import Typography from "@/components/Typography";
import DateConverter from "@/utils/dateConverter";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Instagram from '../../public/insta.svg'
import Facebook from '../../public/facebook.svg'
import Twitter from '../../public/twitter.svg'
import { FiLoader } from "react-icons/fi";
import BlogFrame from "./blogFrame";
import { blog } from "@/types/blog";
import SuggestedBlog from "./suggestedBlog";


export const DisplayBlog = () => {
    const params = useParams();
    const blogid = params?.blogid as string;
    const [blogData, setBlogData] = useState<blog | null>(null); // Use state to keep the data
    const [suggestData, setSuggestData] = useState<blog[] | null>(null); // Use state to keep the data
    const [changedLikes, setLike] = useState<number>(blogData?.likes ?? 0);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [islikeLoading, setlikeLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!blogid) return;
            setLoading(true)
            const data = await fetchBlogById(Number(blogid));
            console.log(data)
            setBlogData(data);
            console.log(data?.likes)
            setLike(data?.likes)

            const suggestdata = await fetchRecommandedBlog(0, 2, data?.id)
            setSuggestData(suggestdata)
            setLoading(false)
        };
        fetchData();

    }, [blogid]); // Only runs when blogid changes
    function handleClick() {
        const shareData = {
            title: 'check this Now!',
            text: 'Amazing content from my site',
            url: window.location.href,
        }
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.log('Error sharing:', error));
        } else {
            // Fallback: Copy to clipboard or show a share modal
            navigator.clipboard.writeText(shareData.url);
            alert('Link copied to clipboard! Paste it to Instagram.');
        }
    }
    async function handleLike(id: number) {
        setlikeLoading(true)
        const likes = await increatelikebyId(id)
        setLike(changedlikes => changedlikes + 1)
        setlikeLoading(false)
    }

    const renderedList = suggestData?.map((obj) => {
        return <BlogFrame obj={obj} />
    })

    return isLoading ? 'Loading...' 
        :
        <div className="px-5 md:px-20">
            <div className="max-w-[1000px] mx-auto flex flex-col space-y-5 md:px-5 lg:p-0">
                {/* <div> */}
                <Typography size="xl" className="font-medium">
                    {blogData?.title || "Loading..."}
                </Typography>
                {/* </div> */}
                <Typography className="" color="light">
                    {DateConverter(blogData?.created_at ?? '')}|TIX ID
                </Typography>
                <div>
                    <Image src={blogData?.imageUrl ?? '/fallback-image.jpg'} height={500} width={1000} className="aspect-video rounded-xl mb-10 md:mb-20" alt="blog image" />
                    <Typography size='md' className="whitespace-pre-line w-[90%] md:w-[100%] flex text-justify">
                        {blogData?.description}
                    </Typography>
                </div>
                <div className="pt-10 md:pt-20 space-y-5">
                    <Typography className='' size="lg">Share this article</Typography>
                    <div className='flex space-x-5'>
                        <Image onClick={handleClick} src={Instagram} className='h-auto aspect-square' alt='instagram' />
                        <Image onClick={handleClick} src={Twitter} className='h-auto aspect-square' alt='Twitter' />
                        <Image onClick={handleClick} src={Facebook} className='h-auto aspect-square' alt='FaceBook' />
                    </div>
                </div>
                <div className="flex justify-center items-center p-2">
                    <div onClick={() => handleLike(blogData?.id ?? 0)} className="flex gap-4  border rounded-xl px-3 py-1 items-center border-black hover:scale-90 transition duration-300 ease-in-out ">
                        <FaRegThumbsUp />
                        {/* {blogData?.likes} */}
                        {islikeLoading ? <FiLoader className="animate-spin" /> : changedLikes}
                    </div>
                </div>
            </div>
            <div className="sm:grid md:grid-cols-3 sm:grid-cols-2 gap-10 space-y-12 sm:space-y-0 md:space-y-0">
                {renderedList}
            </div>
        </div>

};


// import { fetchBlogById } from "@/api/blog";
// import Typography from "@/utils/Typography";

// // Note: params is passed as a prop in Server Components
// export default async function DisplayBlog({ params }: { params: { blogid: number } }) {
//     const { blogid } = params;
//     const blogData = await fetchBlogById(blogid);

//     return (
//         <Typography type='heading'>
//             {blogData?.title}
//             hey
//         </Typography>
//     );
// }
