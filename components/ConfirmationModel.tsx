import Typography from "./Typography";

export const ConfirmationModel = ({ isOpen, title, message, onConfirmation, onCancle }: { isOpen: boolean, title: string, message: string, onConfirmation: () => void, onCancle: () => void }) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 z-50">
                <div className="max-w-96 bg-white rounded-lg p-6 w-80 md:w-[35%] shadow-xl">
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
                        <button className="border border-font_shade_400 px-4 py-1 rounded-lg" onClick={onCancle}><Typography size="body-small" color="font_shade_500">Cancel</Typography></button>
                        <button className="bg-royal text-white px-4 py-1 rounded-lg" onClick={onConfirmation}><Typography size="body-small" className="text-gradientXXI1">Confirm</Typography></button>
                    </div>
                </div>
            </div>
        </>
    )
}