import { useEffect, useState } from "react";
import BlogFrame from "./blogFrame"
import { blog } from "@/types/blog";
import { fetchBlogWithOffset, fetchRecommandedBlog } from "@/api/blog";

export default function SuggestedBlog() {
    const [suggestData, setSuggestData] = useState<blog[] | null>(null); // Use state to keep the data
    useEffect(()=> {
        async function suggest(){
            const suggestdata = await fetchBlogWithOffset(0, 2)
            console.log("from suggestion ",suggestdata)
            setSuggestData(suggestdata)
        }
        suggest()
    },[])

    const renderedList = suggestData?.map((obj) => {
        return <BlogFrame obj={obj} />
    })

    return (
        <div className="sm:grid md:grid-cols-3 sm:grid-cols-2 gap-10 space-y-12 sm:space-y-0 md:space-y-0">
            {renderedList}
        </div>
    )
}