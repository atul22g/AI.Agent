const DefaultPage = () => {
    return (
        <div className="bg-slate-700 h-full w-full p-4">
            {/* Shortcut Keys */}
            <h2 className="text-slate-300 font-bold text-2xl pb-3">ShortCut Keys</h2>
            <div className="flex flex-col gap-3">
                <span className="flex gap-4 h-fit items-center">
                    <span className="text-slate-300 ">Save a File</span>
                    <span className="flex items-center justify-center gap-1">
                        <small className="text-slate-300 bg-slate-500 px-[4px] py-[2px] rounded-sm">Alt</small>
                        <span className="text-slate-300 ">+</span>
                        <small className="text-slate-300 bg-slate-500 px-[4px] py-[2px] rounded-sm">S</small>
                    </span>
                </span>
                <span className="flex gap-4 h-fit items-center">
                    <span className="text-slate-300 ">Open Terminal</span>
                    <span className="flex items-center justify-center gap-1">
                        <small className="text-slate-300 bg-slate-500 px-[4px] py-[2px] rounded-sm">Alt</small>
                        <span className="text-slate-300 ">+</span>
                        <small className="text-slate-300 bg-slate-500 px-[4px] py-[2px] rounded-sm">`</small>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default DefaultPage