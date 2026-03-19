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
            <div >
                <div>
                    {obj.imageUrl && <Image src={obj.imageUrl} alt="image of Blog" className="aspect-video object-cover rounded-xl my-5 md:my-10" width={1000} height={500} />}
                </div>
                <div className="space-y-2 md:space-y-5">
                    <div className="border border-black px-3 py-1.5 w-fit my-5"><p className="text-[10px]">{obj.type}</p></div>
                    <div><h1 className="line-clamp-3 text-md md:text-2xl font-semibold text-gray-700 w-[80%]">{obj.title}</h1></div>
                    <div className="text-gray-500 text-md">{DateConverter(obj.created_at)} | TIX ID</div>
                </div>
            </div>
        </Link>
    )
}