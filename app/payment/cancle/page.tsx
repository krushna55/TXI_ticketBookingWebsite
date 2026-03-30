import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold text-red-500">Payment Cancelled</h1>
      <p className="text-gray-500">Your seats have been released.</p>
      <Link href="/" className="bg-royal text-white px-6 py-2 rounded-md">
        Try Again
      </Link>
    </div>
  )
}