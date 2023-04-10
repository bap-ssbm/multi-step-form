import { Title } from "./components/Title";
import AddOn from "./components/AddOn";
import Next from "./components/Next";
import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useNavigate , useLocation} from "react-router-dom"
import { motion, Variants } from "framer-motion";



const pageVariant: Variants = {
    initial:{
      x:'60%',
      opacity:0
    },
    initial2:{
        x:'-60%',
        opacity:0
      },
    animate:{
      x:'0%',
      opacity:1,
      transition:{
        type:'tween',
        duration:0.4,
        ease:'easeInOut'
      }
    },
    exit:{
      x:'-60%',
      opacity:0,
      transition:{
        duration:0.4,
        ease:'easeInOut'
      }
    },
    exit2:{
        x:'60%',
        opacity:0,
        transition:{
          duration:0.4,
          ease:'easeInOut'
        }
      }
  }

  
export default function Step3() {
    const navigate = useNavigate()

    const [onlineService, setOnlineService] = useState(true)
    const [largerStorage, setLargerStorage] = useState(true)
    const [customProfile, setCustomProfile] = useState(false)

    const [goback, setGoBack] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        const dataOnline = JSON.parse(sessionStorage.getItem("onlineService") || '{}')
        const dataStorage = JSON.parse(sessionStorage.getItem("largerStorage") || '{}')
        const dataProfile = JSON.parse(sessionStorage.getItem("customProfile") || '{}')



        if (typeof dataOnline.picked === 'boolean') {
            setOnlineService(dataOnline.picked)
        }
        if (typeof dataStorage.picked === 'boolean') {
            setLargerStorage(dataStorage.picked)
        }
        if (typeof dataProfile.picked === 'boolean') {
            setCustomProfile(dataProfile.picked)
        }
    }, [])
    const [selectMoY, setMoY] = useState<string>("month");


    useEffect(() => {
        const moydata = sessionStorage.getItem("selectedMoY")
        if (moydata) {
            setMoY(moydata)
        }
    
    }, [])

    const catchSubmit = (e: SyntheticEvent) => {
        e.preventDefault();


        const typebtn = ((e.nativeEvent as SubmitEvent).submitter as HTMLInputElement).name

        sessionStorage.setItem("onlineService", JSON.stringify({picked: onlineService, price: (selectMoY==='month')?1:10}))
        sessionStorage.setItem("largerStorage", JSON.stringify({picked: largerStorage, price: (selectMoY==='month')?2:20}))
        sessionStorage.setItem("customProfile", JSON.stringify({picked: customProfile, price: (selectMoY==='month')?2:20}))


        if (typebtn === "back") {
            setGoBack(true)
            navigate('/multi-step-form/step2', {state:{id:2,name:'step3'}})
        } else if (typebtn === "next") {
            setGoBack(false)
            navigate('/multi-step-form/step4' ,{state:{id:3,name:'step3'}})
        }
    }
    return (
        <form onSubmit={catchSubmit} className=' w-full flex flex-col  items-center md:h-[580px] md:justify-between'>
            <motion.section 
              variants={pageVariant}
              initial={location.state.name==="step2"?"initial":"initial2"}
              animate="animate"
              exit={goback?"exit2":"exit"}
            className="flex flex-col  mb-8 md:mb-0 bg-white w-[90%] rounded-2xl py-10 px-7 z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%] h-full">
                <Title title="Pick add-ons">Add-ons help enhance your gaming experience.</Title>
                <div className="w-full flex flex-col space-y-4 md:space-y-5">
                    <AddOn picked={onlineService} setPicked={setOnlineService} title="Online service" price={selectMoY==='month'?"+1$/mo":"+$10/yr"}>Access to multiplayer games</AddOn>
                    <AddOn picked={largerStorage} setPicked={setLargerStorage} title="Larger storage" price={selectMoY==='month'?"+2$/mo":"+$20/yr"}>Extra 1TB of cloud save</AddOn>
                    <AddOn picked={customProfile} setPicked={setCustomProfile} title="Customizable profile" price={selectMoY==='month'?"+2$/mo":"+20/yr"}>Custom theme on your profile</AddOn>
                </div>
            </motion.section>
            <Next goBack={true} next={true} />
        </form>
    )
}


