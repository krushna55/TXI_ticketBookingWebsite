export default function SeatOptions() {
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-4 sm:gap-2 space-y-2 sm:space-y-0">
                <div className="flex gap-2 items-center sm:mx-auto "><div className="h-4 w-4 bg-royal"></div><p className="text-[14px]">Filled</p></div>
                <div className="flex gap-2 items-center sm:mx-auto"><div className="h-4 w-4 border-2 border-gray-400"></div><p className="text-[14px]">Empty Chair</p></div>
                <div className="flex gap-2 items-center sm:mx-auto "><div className="h-4 w-4 bg-choosenBtnColor"></div><p className="text-[14px]">Chosen</p></div>
                <div className="flex gap-2 items-center sm:mx-auto "><div className="h-4 w-4 bg-gray-300 text-gray-500 cursor-not-allowed"></div><p className="text-[14px]">On Hold</p></div>
            </div></>
    )
}