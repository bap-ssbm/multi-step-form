import { motion, AnimatePresence } from "framer-motion"
import useMeasure from 'react-use-measure'

type optionType = {
    type: string,
    imgURL: string,
    price: string,
    selected: boolean,
    setSelected: Function,
    time: string
}

export const PlanOption = ({ type, imgURL, price, selected, setSelected, time }: optionType) => {
    let [ref, { height }] = useMeasure()
    return (
        <motion.div
            animate={{ height: height }}
            transition={{
                height: { ease: "easeInOut", duration: 0.4 }
            }}
            onClick={() => { setSelected(type) }}
            className={'cursor-pointer   border-Light-gray border-solid border rounded-xl w-full overflow-y-hidden transition ease-in-out duration-300 ' + (selected && ("bg-Alabaster border-Purplish-blue"))}>
            <div className="flex w-full items-center space-x-5 px-5 py-4 md:flex-col md:items-start md:space-x-0 md:space-y-16 overflow-y-hidden" ref={ref}>
                <div >
                    <img className="md:mt-1" src={imgURL} alt='' />
                </div>
                <div >

                    <h2 className="font-[700] text-Marine-blue text-[16px]">{type}</h2>
                    <p className="text-Cool-gray text-[14px]">{price}</p>
                    <AnimatePresence>
                        {time === "year" && (
                        <motion.p initial={{ opacity: 0 }} 
                            animate={{ opacity: 1, transition:{ delay:0.2 } }} 
                            exit={{opacity:0}} 
                            className="font-[500] text-Marine-blue">
                            2 months free
                        </motion.p>)}
                    </AnimatePresence>
                </div>
            </div>

        </motion.div>
    )
}