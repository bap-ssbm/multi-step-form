import { NavItem } from "./NavItem"
import { useLocation } from 'react-router-dom'

import { motion, Variants } from "framer-motion";

const navVariant: Variants = {
    initial: {
        opacity:0
    },
    animate:{
        opacity:1,
        transition:{
            staggerChildren:0.7
        }
    }
} 

export default function Navbar() {
    const location = useLocation();
    const pathname = location.pathname


    return (
       
        <motion.nav 
        variants={navVariant}
        initial="initial"
        animate="animate"
        className="flex w-full pt-10 h-[170px] md:z-50 space-x-[17px] text-[16px] justify-center md:flex-col md:space-x-0 md:space-y-10  md:h-[580px] md:w-[290px] md:justify-start md:rounded-xl text-white">
            <NavItem step="1" type="YOUR INFO" on={pathname==="/multi-step-form/"}/>
            <NavItem step="2" type="SELECT PLAN" on={pathname==="/multi-step-form/step2"}/>
            <NavItem step="3" type="ADD-ONS" on={pathname==="/multi-step-form/step3"}/>
            <NavItem step="4" type="SUMMARY" on={pathname==="/multi-step-form/confirm" || pathname==="/step4"}/>
        </motion.nav>
    )
}