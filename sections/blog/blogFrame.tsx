import DateConverter from "@/utils/dateConverter";
import Image from "next/image";
import Link from "next/link";

export default function BlogFrame({obj}) {
    return (
        <div className="">
            <Link href={`/blog/:${obj.id}`}>
            <div>
                <Image src={obj.imageUrl} alt="image of Blog" className="aspect-video rounded-xl my-10" width={1000} height={200} />
            </div>
            <div className="space-y-5">
                <div className="border border-black px-3 py-1.5 w-fit my-5"><p className="text-[10px]">{obj.type}</p></div>
                <div><h1 className="line-clamp-3 text-xl md:text-2xl font-semibold text-gray-700 w-[80%]">{obj.title}</h1></div>
                <div className="text-gray-500">{DateConverter(obj.created_at)} | TIX ID</div>
            </div>
            </Link>
        </div>
    )
}