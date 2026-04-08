export const NoDataFound = ({message}: {message: string})=>{
    return(
        <div className="w-full  flex justify-center items-center text-center py-10">
            <p className="text-gray-500">{message}</p>
        </div>
    )
}