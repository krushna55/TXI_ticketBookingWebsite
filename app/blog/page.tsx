'use client'

import { fetchBlogWithType } from "@/api/blog";
import { BlogHeader } from "@/sections/blog/BlogHeader";
import BlogPageFrame from "@/sections/blog/blogPageFrame";
import UploadBlog from "@/sections/blog/uploadBlog";
import { blog } from "@/types/blog";
import { useEffect, useState } from "react";

export default function Blog() {
    const [blogList, setList] = useState<blog[] | null>([])
    const [nodata, setnodata] = useState<boolean>(false)
    function setBlogList(blogs : blog[] | null) {
        if (blogs?.length == 0) {
            setnodata(true)
            console.log('no data found')
            return
        }
        setnodata(false)
        setList(blogs)
        console.log(blogs)

    }
    useEffect(() => {
        const fetchData = async () => {
            const data : blog[] | null = await fetchBlogWithType('type', 'Spotlight')
            setBlogList(data)
        }
        fetchData()
    }, [])

    return (
        // <UploadBlog/>
        <div className="max-w-[1400px] mx-auto">

            <BlogHeader setBlogs={setBlogList} />
            {nodata ? 'No Data Found' : <BlogPageFrame blogList={blogList ?? undefined} />}
        </div>
    )
}