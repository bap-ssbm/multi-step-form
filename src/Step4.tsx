import Next from "./components/Next"
import { Title } from "./components/Title"
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Link } from "react-router-dom";
import FinishUp from "./components/FinishUp";
import { motion, Variants } from "framer-motion";

const pageVariant: Variants = {
    initial:{
      x:'60%',
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

export default function Step4() {
    const navigate = useNavigate()
    const [plan, setPlan] = useState<any>()
    const [planPrice, setPlanPrice] = useState(9)
    const [moydata, setmoydata] = useState<any>()
    const [total, setTotal] = useState<number | null>()

    const [goback, setGoBack] = useState<boolean>(false);

    const [dataOnline, setDataOnline] = useState({ picked: false, price: 1 })
    const [dataStorage, setDataStorage] = useState({ picked: false, price: 1 })
    const [dataProfile, setDataProfile] = useState({ picked: false, price: 1 })


    useEffect(() => {
        const moydata = sessionStorage.getItem("selectedMoY")
        const selectedPlan = sessionStorage.getItem("selectedPlan")
        const planPrice = JSON.parse(sessionStorage.getItem("planPrice") || "{}")
        let totalToSet = planPrice;
        setPlan(selectedPlan)
        setPlanPrice(planPrice)
        setmoydata(moydata)

        const onlineData = JSON.parse(sessionStorage.getItem("onlineService") || '{}')
        const storageData = JSON.parse(sessionStorage.getItem("largerStorage") || '{}')
        const profileData = JSON.parse(sessionStorage.getItem("customProfile") || '{}')

        setDataOnline(onlineData)
        setDataStorage(storageData)
        setDataProfile(profileData)

        onlineData.picked && (totalToSet = totalToSet + onlineData.price)
        storageData.picked && (totalToSet = totalToSet + storageData.price)
        profileData.picked && (totalToSet = totalToSet + profileData.price)

        setTotal(totalToSet)
    }, [])

    const catchSubmit = (e: SyntheticEvent) => {
        e.preventDefault();


        const typebtn = ((e.nativeEvent as SubmitEvent).submitter as HTMLInputElement).name




        if (typebtn === "back") {
            setGoBack(true)
            navigate('/multi-step-form/step3' ,{state:{id:4,name:'step4'}})
        } else if (typebtn === "next") {
            setGoBack(false)
            navigate('/multi-step-form/confirm',{state:{id:4,name:'step4'}})
        }
    }

    return (
        <form
            onSubmit={catchSubmit} className=' w-full flex flex-col  items-center md:h-[580px] md:justify-between'>
            <motion.section
                variants={pageVariant}
                initial="initial"
                animate="animate"
                exit={goback?"exit2":"exit"}
                className="flex flex-col  mb-8 md:mb-0 bg-white w-[90%] rounded-2xl py-10 px-7 z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%] h-full">
                <Title title="Finishing up">Double-check everything looks OK before confirming.</Title>
                <div className="w-full flex flex-col space-y-4 md:space-y-5 bg-Alabaster p-6 rounded-xl md:p-8">
                    <div className="flex w-full items-center justify-between md:text-[16px]">
                        <div>
                            <p className="font-[500] text-Marine-blue">{plan} ({moydata === "month" ? "Monthly" : "Yearly"})</p>
                            <Link to="/multi-step-form/step2" state={{id:4,name:'step4'}}><span className="underline text-Cool-gray font-[400] hover:text-Purplish-blue duration-300 ease-in-out transition">Change</span></Link>
                        </div>
                        <p className="font-[700] text-Marine-blue">${planPrice}/{moydata === "month" ? "mo" : "yr"}</p>
                    </div>
                    <hr className="border-Light-gray" />
                    <FinishUp type="Online service" data={dataOnline} moydata={moydata} />
                    <FinishUp type="Larger storage" data={dataStorage} moydata={moydata} />
                    <FinishUp type="Customizable profile" data={dataProfile} moydata={moydata} />

                </div>
                <div className="flex justify-between  p-6  text-[16px]">
                    <p className="text-Cool-gray">
                        Total (per {moydata})
                    </p>
                    <p className="font-[700] text-Purplish-blue md:text-[20px]">
                        +${total}/{moydata === "month" ? "mo" : "yr"}
                    </p>
                </div>
            </motion.section>
            <Next goBack={true} next={false} />
        </form>
    )
}