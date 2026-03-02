import { fetchBlog, fetchBlogWithOffset } from "@/api/blog"
import Image from "next/image"
import Link from "next/link"

export const BlogSection = async () => {
    const result = await  fetchBlogWithOffset(0,2)
    console.log(result)
    const renderedList = result?.map((obj)=>{
        return (
            <div key={obj.id}>
                <div>
                    <Image src={obj.imageUrl} alt="image of Blog" className="aspect-video rounded-xl my-5" width={500} height={200}  />
                </div>
                <div></div>
            </div>
        )
    })
    return(
        <div className="my-10 px-5">
            <div className="flex justify-between">
                <div className="w-[70%]">
                    <h1 className="text-md md:text-2xl font-bold text-gray-700">TXI ID News</h1>
                    <p className="text-sm md:text-md">The latest news about the world of cinema for you!</p>
                </div>
                <div>
                    <Link href={'/blog'} className="text-md md:text-xl text-skyBlue">See All</Link>
                </div>
            </div>
            <div className="sm:grid md:grid-cols-3 sm:grid-cols-2 gap-5">
            {renderedList}
            </div>
        </div>
    )
}