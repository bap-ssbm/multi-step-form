type addonType = {
    title: string,
    price: string,
    children: string,
    picked: boolean,
    setPicked: Function
}

export default function AddOn({ title, price, children, picked, setPicked }: addonType) {
    const handleClick = () =>{
        setPicked(!picked);
    }
  

    return (
        <div className={"flex w-full  justify-between border-Light-gray border-solid border rounded-xl px-5 py-[11px] items-center md:px-7 md:py-[15px] transform ease-out duration-300 " + (picked&&("border-Purplish-blue + bg-Alabaster"))}>
            <div className="flex items-center">
                <input 
                onClick={handleClick}
                type="checkbox"
                checked={picked}
                className="w-7 h-7  form-checkbox border-Light-gray  checked:text-Purplish-blue rounded-md focus:ring-0 transform duration-300 cursor-pointer mr-5" />
                <div>
                    <h2 className="text-Marine-blue font-[700] md:text-[16px]">{title}</h2>
                    <p className="text-[12px] text-Cool-gray md:text-[14px]">{children}</p>
                </div>
            </div>

            <p className="place-self-end-end tracking-tighter text-[13px] text-Purplish-blue font-[500]">
                {price}
            </p>
        </div>
    )
}