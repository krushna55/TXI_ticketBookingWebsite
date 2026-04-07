import Typography from "@/components/Typography"
import { getDate } from "@/utils/getDate"

 export default function HandleDate({index,state}:{index: number, state: boolean}) {
        const data = getDate(index)
        return (
            <>
                <span><Typography size="header-xxsmall" color="font_shade_600" className={state ? "bg-[#383782] text-white" : ""}>{`${data["Date"]}`}{` ${data.Monthname}`}</Typography></span>
                <p className="text-xl font-bold">{data.Weekday.slice(0, 3).toUpperCase()}</p>
            </>
        )
    }