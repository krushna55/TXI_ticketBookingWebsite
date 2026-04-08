'use client'

import { fetchBlogWithType } from "@/api/blog/blog";
import { NoDataFound } from "@/components/NoDataFound";
import Skelaton from "@/components/skelaton";
import Typography from "@/components/Typography";
import { BlogHeader } from "@/sections/blog/BlogHeader";
import BlogPageFrame from "@/sections/blog/blogPageFrame";
import SuggestedBlog from "@/sections/blog/suggestedBlog";
import { blog } from "@/types/blog";
import { useEffect, useState } from "react";

export default function Blog() {
    const [blogList, setList] = useState<blog[] | null>([])
    const [nodata, setnodata] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    function setBlogList(blogs: blog[] | null) {
        if (blogs?.length == 0) {
            setnodata(true)
            return
        }
        setnodata(false)
        setList(blogs)
        console.log(blogs)

    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data: blog[] | null = await fetchBlogWithType('type', 'Spotlight')
            setBlogList(data)
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        // <UploadBlog/>
        <div className="max-w-[1400px] mx-auto">

            <BlogHeader setBlogs={setBlogList} />
            {
                loading ?
                    <div className="flex flex-col w-full space-y-5 justify-center mx-auto mt-10">
                        <Skelaton height="100px" className="w-full" ></Skelaton>
                        <Skelaton height="100px" className="w-full"></Skelaton>
                    </div>
                    :
                    nodata ?
                        <NoDataFound message="Sorry! No Blogs Found" />
                        :
                        <>
                            <BlogPageFrame blogList={blogList ?? undefined} />
                        </>
            }
            <div>
                <div className="my-10  ">
                    <Typography size="header-medium" className="flex justify-center items-center" >Suggested Blogs</Typography>
                </div>
                <SuggestedBlog nId={'1'}/>
            </div>
        </div>
    )
}