export default function Loading() {
    return (
        <div className="max-w-[1000px] mx-auto flex flex-col space-y-5 px-5 lg:p-0">
            {/* <div> */}
            <div className="w-full bg-gray-500 animate-pulse"></div>

            {/* </div> */}

            <div>
                <div className="w-full aspect-video w-100 bg-gray-500 animate-pulse">

                </div>
                <div className="w-full h-100 bg-gray-500 animate-pulse">

                </div>
            </div>
            <div className="pt-10 md:pt-20 space-y-5 bg-gray-500 animate-pulse">

            </div>
            <div className="flex justify-center items-center p-2 bg-gray-500 animate-pulse">

            </div>
        </div>
    )
}