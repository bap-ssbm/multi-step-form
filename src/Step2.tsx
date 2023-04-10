import React, { useState, useEffect, SyntheticEvent } from 'react';
import Next from './components/Next';
import { Title } from './components/Title';
import { PlanOption } from './components/PlanOption';
import { useNavigate, useLocation } from "react-router-dom"
import { motion, Variants } from 'framer-motion';

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


function Step2() {

    const [selected, setSelected] = useState<string>("Arcade");
    const [selectMoY, setMoY] = useState<string>("month");
    
    const [goback, setGoBack] = useState<boolean>(false);

    const navigate = useNavigate()
    const location = useLocation();
  

    useEffect(()=>{
      const moydata = sessionStorage.getItem("selectedMoY")
      if(moydata){
        setMoY(moydata)
      }
      const selectedata = sessionStorage.getItem("selectedPlan")
      if(selectedata){
        setSelected(selectedata)
      }
    },[])

    const catchSubmit = (e: SyntheticEvent) =>{
        e.preventDefault();

        sessionStorage.setItem("selectedMoY", selectMoY)
        sessionStorage.setItem("selectedPlan", selected)
        if(selected==="Arcade"){
            sessionStorage.setItem("planPrice", JSON.stringify(selectMoY==="month"?9:90))
        }else if(selected === "Advanced"){
            sessionStorage.setItem("planPrice", JSON.stringify(selectMoY==="month"?12:120))
        }else if(selected === "Pro"){
            sessionStorage.setItem("planPrice", JSON.stringify(selectMoY==="month"?15:150))
        }

        const typebtn = ((e.nativeEvent as SubmitEvent).submitter as HTMLInputElement).name

        if(typebtn === "back"){
            setGoBack(true)
            navigate('/multi-step-form/',{state:{id:2,name:'step2'}})
        }else if(typebtn==="next"){
            setGoBack(false)
            navigate('/multi-step-form/step3',{state:{id:2,name:'step2'}})
        }
    }



    return (
        <form onSubmit={catchSubmit} 
        className='w-full flex flex-col flex-1 items-center md:h-[580px] md:justify-between'>
            <motion.section 
             variants={pageVariant}
             initial={location.state.name==="step1"?"initial":"initial2"}
             animate="animate"
             exit={goback?"exit2":"exit"}
            className="flex flex-col mb-8 md:mb-0 bg-white w-[90%] rounded-2xl p-10 z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%] h-full">
                <Title title='Select your plan'>You have the option of monthly or yearly billing.</Title>
                <div className='space-y-4 md:space-y-0 flex flex-col md:flex-row md:space-x-6'>
                    <PlanOption setSelected={setSelected} selected={selected === "Arcade"} time={selectMoY} type='Arcade' price={selectMoY==="month"?"$9/mo":"$90/yr"} imgURL='./assets/images/icon-arcade.svg' />
                    <PlanOption setSelected={setSelected} selected={selected === "Advanced"} time={selectMoY} type='Advanced' price={selectMoY==="month"?"$12/mo":"$120/yr"} imgURL='./assets/images/icon-advanced.svg' />
                    <PlanOption setSelected={setSelected} selected={selected === "Pro"} time={selectMoY} type='Pro' price={selectMoY==="month"?"$15/mo":"$150/yr"} imgURL='./assets/images/icon-pro.svg' />
                </div>

                <div className='flex w-full justify-center bg-Alabaster space-x-10 font-[500] py-4 mt-6 md:mt-10 rounded-lg text-[15px]'>
                    <p className={selectMoY === "month" ? 'font-[700] text-Marine-blue transition duration-300 ease-in-out' : 'font-[500] text-Cool-gray transition duration-300 ease-in-out'}>Monthly</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer flex item" />
                        <div onClick={() => {
                            setMoY(selectMoY === "month" ? "year" : "month")
                        }} className="w-12 h-6 bg-Marine-blue rounded-full flex items-center relative">
                            <div className='h-4 w-4 shadow-md rounded-full bg-white absolute duration-300 ease-in-out ' style={{ left: selectMoY === "month" ? '.4rem' : '1.6rem' }}></div>
                        </div>
                    </label>
                    <p className={selectMoY === "year" ? 'font-[700] text-Marine-blue transition duration-300 ease-in-out' : 'font-[500] text-Cool-gray transition duration-300 ease-in-out'}>Yearly</p>
                </div>

            </motion.section>
            <Next  next={true} goBack={true} />
        </form>


    );
}

export default Step2;