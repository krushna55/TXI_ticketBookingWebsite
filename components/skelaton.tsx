// ✅ Use inline styles for dynamic values
export default function Skelaton({ height, width }: { height: string, width: string }) {
    return (
        <div 
            style={{ width, height }}
            className="bg-gradient-to-r from-slate-200 to-slate-400 animate-pulse"
        />
    )
}