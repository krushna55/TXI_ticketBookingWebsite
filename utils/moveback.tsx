import { useRouter } from "next/router";

export default function Moveback(){
    const router = useRouter()
    router.back()
}