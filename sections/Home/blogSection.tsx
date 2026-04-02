'use client'
import { useState, useEffect } from "react";
import { fetchBlogWithOffset } from "@/api/blog/blog";
import Link from "next/link";
import BlogFrame from "../blog/blogFrame";
import Skelaton from "@/components/skelaton";
import Typography from "@/components/Typography";

export const BlogSection = () => {
    const [blogData, setBlogData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);  // Loading state

    // Fetch blog data on component mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const result = await fetchBlogWithOffset(0, 2);
                setBlogData(result || []);
            } catch (error) {
                console.error("Error fetching blog data", error);
            } finally {
                setIsLoading(false);  // Stop loading once data is fetched
            }
        };

        fetchBlogs();
    }, []);

    const renderedList = blogData.map((data) => (
        <BlogFrame obj={data} key={data.id} />
    ));

    return (
        <div className="my-10 px-2">
            <div className="flex justify-between">
                <div className="w-[70%]">
                    <Typography size="header-small" color="font_shade_900">
                        TXI ID News
                    </Typography>

                    <Typography size="body-small" color="font_shade_600">
                        The latest news about the world of cinema for you!
                    </Typography>

                </div>
                <div>
                    <Link href={'/blog'} className="text-md md:text-xl ">
                        <Typography size="header-small" color="font_shade_900" className="text-skyBlue">
                            See All
                        </Typography>
                    </Link>
                </div>
            </div>

            {/* Show skeleton loaders while data is loading */}
            {isLoading ? (
                <div className="mt-6 sm:grid md:grid-cols-3 sm:grid-cols-2 gap-10">
                    {[...Array(3)].map((_, idx) => (<div key={idx} className="flex flex-col space-y-2">
                        <Skelaton height="250px" width="100%" />
                        <Skelaton height="50px" width="30%" />
                        <Skelaton height="50px" width="100%" />
                    </div>
                    ))}
                </div>
            ) : (
                <div className="sm:grid md:grid-cols-3 sm:grid-cols-2 ">
                    {renderedList}
                </div>
            )}
        </div>
    );
}