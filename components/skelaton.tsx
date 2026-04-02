
export default function Skelaton({ height, width ,className='' }: { height?: string, width?: string, className?: string }) {
    return (
        <div
            style={{ height, width }}
            className={`rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${className} my-10`}
        ></div>
    )
}   