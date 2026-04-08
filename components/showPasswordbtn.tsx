import { AiOutlineEye } from "react-icons/ai"
import { FaRegEyeSlash } from "react-icons/fa"

export const ShowPasswordBtn =({passwordVisible, setPasswordVisible}: {passwordVisible: boolean, setPasswordVisible: (visible: boolean) => void}) => {
    return (
        <span className="cursor-pointer p-1" onClick={() => setPasswordVisible(!passwordVisible)}>  
            {passwordVisible ?
                <FaRegEyeSlash className="text-2xl text-gray-500" />
                :
                <AiOutlineEye className="text-2xl text-gray-500" />
            }
        </span>
    )
}