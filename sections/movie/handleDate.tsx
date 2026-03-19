import { getDate } from "@/utils/getDate"

 export default function HandleDate({index}:{index: number}) {
        const data = getDate(index)
        return (
            <>
                <p className="text-sm font-medium text-gray-500">{`${data["Date"]} ${data.Monthname}`}</p>
                <p className="text-xl font-bold">{data.Weekday.slice(0, 3).toUpperCase()}</p>
            </>
        )
    }