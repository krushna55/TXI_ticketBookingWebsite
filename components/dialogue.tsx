import Typography from "./Typography";

export const DialogueBox = ({ isOpen, title, message, onConfirmation, ConfirmBtn ,onCancle }: { isOpen: boolean, title: string, message: string, onConfirmation: () => void, ConfirmBtn: string, onCancle: () => void }) => {
    if (!isOpen) return null;
    return (
        <>
            <div className=" fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg p-6 w-80 md:w-[35%] shadow-xl max-w-96">
                    <div className="flex justify-start items-start flex-col mb-2">
                        <div className="flex justify-between  w-full">
                            <Typography size="header-xsmall" className="mb-3 text-center">
                                {title}
                            </Typography>
                            <div onClick={onCancle} className="active:bg-slate-100 cursor-pointer py-1 px-2 rounded-full">
                                ✕
                            </div>
                        </div>
                        <Typography size="body-small" color="font_shade_600" className="mb-3">
                            {message}
                        </Typography>
                    </div>
                    <div className="flex justify-center sm:justify-end gap-5 ">
                        <button className="bg-royal text-white px-4 py-1 rounded-lg" onClick={onConfirmation}><Typography size="body-small" className="text-gradientXXI1">{ConfirmBtn}</Typography></button>
                    </div>
                </div>
            </div>
        </>
    )
}