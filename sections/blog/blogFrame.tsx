import Typography from "@/components/Typography";
import { blog } from "@/types/blog";
import DateConverter from "@/utils/dateConverter";
import Image from "next/image";
import Link from "next/link";
interface objProp{
    obj:blog
}
export default function BlogFrame({ obj }:objProp) {
    return (
        <Link href={`/blog/${obj.id}`}>
            <div className="px-4">
                <div>
                    {obj.imageUrl && <Image loading="lazy" src={obj.imageUrl} alt="image of Blog" className="aspect-video object-cover rounded-xl my-5 md:my-10" width={1000} height={500} />}
                </div>
                <div className="space-y-2 md:space-y-5">
                    <div className="border border-black px-3 py-1.5 w-fit my-5"><Typography size="body-xsmall">{obj.type}</Typography></div>
                    <div><Typography size="header-small" className="w-[80%] line-clamp-3">{obj.title}</Typography></div>
                    <Typography size="body-small" color="font_shade_600">{DateConverter(obj.created_at)} | TIX ID</Typography>
                </div>
            </div>
        </Link>
    )
}