import { RootState } from "@/lib/store"
import { useSelector } from "react-redux"

export default function SeatSection(){
    const screen_details = useSelector((state:RootState)=>state.movieDetails.screenDetails)
    if(screen_details.screen_column === 0 || screen_details.screen_row === 0 || screen_details?.screen_column == null || screen_details?.screen_row == null) return <div>no col or row</div>
    const divide = Math.floor(  screen_details.screen_column/ 2)
    return (
    <div className="flex flex-row justify-center my-10">
    {
        Array(screen_details.screen_column).fill(0).map((_,col)=>{
            return(<div>{Array(screen_details.screen_row).fill(0).map((_,row)=>(<div className={`w-8 h-8 border border-gray-500 mb-3 ${divide === col ? "mr-24" : "mr-3"}`} >{String.fromCharCode(row+65)   },{col}</div>))}</div>)

        })
    }
    </div>
    )
}