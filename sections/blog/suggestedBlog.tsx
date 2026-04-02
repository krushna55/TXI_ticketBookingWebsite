import { useEffect, useState } from "react";
import BlogFrame from "./blogFrame"
import { blog } from "@/types/blog";
import { fetchBlogWithOffset, fetchRecommandedBlog } from "@/api/blog/blog";
import Skelaton from "@/components/skelaton";

export default function SuggestedBlog() {
    const [suggestData, setSuggestData] = useState<blog[] | null>(null); // Use state to keep the data
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        async function suggest() {
            setLoading(true)
            const suggestdata = await fetchBlogWithOffset(0, 2)
            console.log("from suggestion ", suggestdata)
            setSuggestData(suggestdata)
            setLoading(false)
        }
        suggest()
    }, [])

    const renderedList = suggestData?.map((obj) => {
        return <BlogFrame obj={obj} />
    })

    return (
        loading ? (
            <div className="sm:grid md:grid-cols-3 sm:grid-cols-2 gap-10 space-y-12 sm:space-y-0 md:space-y-0">                <Skelaton height="400px" className="w-full" />
                <Skelaton height="400px" className="w-full" />
                <Skelaton height="400px" className="w-full" />
            </div>
        ) : (
            <div className="sm:grid md:grid-cols-3 sm:grid-cols-2 gap-0 space-y-12 sm:space-y-0 md:space-y-0">
                {renderedList}
            </div>
        )
    )
}