import { blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import DateConverter from "@/utils/dateConverter";
import Typography from "@/components/Typography";
interface BlogframeProp {
    blogList?: blog[]
}
export default function BlogPageFrame({ blogList }: BlogframeProp) {
    let renderedList;
    console.log({ blogList })
    if (blogList?.length == 0) {
        renderedList = <p>No Data Found</p>
    } else {
        renderedList = blogList?.map((blog: blog , index :number) => {
            return (
                <Link href={`/blog/${blog.id}`} key={blog.id}>
                    <div  className={`${index%2 == 0 ? "md:flex-row":"md:flex-row-reverse" }  mb-5 flex gap-0 md:gap-10 flex-col `} >
                        <div className="md:w-1/2">
                            {blog.imageUrl && <Image src={blog.imageUrl} alt="image of Blog" className="aspect-video object-cover rounded-xl my-5 md:my-10" width={1000} height={500} />}
                        </div>
                        <div className="space-y-2 md:space-y-5 md:w-1/2 flex flex-col justify-center ">
                            <div className="border border-black px-3 py-1.5 w-fit my-5 "><Typography size="body-small">{blog.type}</Typography></div>
                            <div><Typography className="line-clamp-3 w-[80%]" size="header-medium">{blog.title}</Typography></div>
                            <div><Typography className="line-clamp-3  w-[80%]" size="body-small">{blog.description}</Typography></div>
                            <div ><Typography size="body-large">{DateConverter(blog.created_at)} | TIX ID</Typography></div>
                        </div>
                    </div>
                </Link>
            )
        })
    }
    return (
        <div className="max-w-[1400px] px-4 ">
            {renderedList}
        </div>
    )
}