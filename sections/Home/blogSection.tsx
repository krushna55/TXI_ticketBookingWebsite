import { fetchBlog, fetchBlogWithOffset } from "@/api/blog"
import DateConverter from "@/utils/dateConverter"
import Image from "next/image"
import Link from "next/link"
import BlogFrame from "../blog/blogFrame"

export const BlogSection = async () => {
    const result = await  fetchBlogWithOffset(0,2)

    const renderedList = result?.map((data)=>{
        return (
            <BlogFrame obj={data} key={data.id}/>
        )
    })
    return(
        <div className="my-10 px-2">
            <div className="flex justify-between">
                <div className="w-[70%]">
                    <h1 className="text-md md:text-2xl font-semibold text-gray-700">TXI ID News</h1>
                    <p className="text-sm md:text-md">The latest news about the world of cinema for you!</p>
                </div>
                <div>
                    <Link href={'/blog'} className="text-md md:text-xl text-skyBlue">See All</Link>
                </div>
            </div>
            <div className="sm:grid md:grid-cols-3 sm:grid-cols-2 gap-10 ">
            {renderedList}
            </div>
        </div>
    )
}