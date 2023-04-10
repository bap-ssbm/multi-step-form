import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Next from './components/Next';
import { InfoInput } from './components/InfoInput';
import { Title } from './components/Title';
import { useNavigate, useLocation} from "react-router-dom"
import { motion, Variants } from 'framer-motion';


type RedirectFunction = (
  url: string,
  init?: number | ResponseInit
) => Response;

const pageVariant: Variants = {
  initial:{
    x:'-60%',
    opacity:0
  },
  initial2:{
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
  }
}

function Step1() {

  const [nameEmpty, setNameEmpty] = useState<boolean>(false)
  const [emailEmpty, setEmailEmpty] = useState<boolean>(false)
  const [phoneEmpty, setPhoneEmpty] = useState<boolean>(false)
 
  

  const navigate = useNavigate();
  const location = useLocation();
  

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      name: { value: string };
      phone: { value: string };
    };

    const email = target.email.value
    const name = target.name.value
    const phone = target.phone.value

    if (email.length === 0) {
      setEmailEmpty(true);
    }
    if (name.length === 0) {
      setNameEmpty(true);
    }
    if (phone.length === 0) {
      setPhoneEmpty(true);
    }
    if (email.length > 0 && name.length > 0 && phone.length > 0) {
      navigate('/multi-step-form/step2', {state:{id:1,name:'step1'}})
    }
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("phone", phone);
  }

  return (

      <form
        onSubmit={handleSubmit}
        className='w-full flex flex-col flex-1 md:min-h-fit items-center md:h-[580px] md:justify-between'>
        <motion.section 
         variants={pageVariant} 
         initial={(location.hasOwnProperty('state.name'))?"initial":"initial2"}
         animate="animate"
         exit="exit"
         className="flex flex-col  mb-8 md:mb-0 bg-white w-[90%] rounded-2xl py-10 px-7 z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%]">
          <Title title="Personal info">Please provide your name, email address, and phone number.</Title>

          <div
      
          className="space-y-4 md:space-y-7 overflow-x-hidden">
            <InfoInput empty={nameEmpty} type="name" placeholder="e.g. Stephen King">Name</InfoInput>
            <InfoInput empty={emailEmpty} type="email" placeholder='e.g. stephenking@lorem.com'>Email Address</InfoInput>
            <InfoInput empty={phoneEmpty} type="phone" placeholder='e.g. +1 234 567 890'>Phone Number</InfoInput>
          </div>
        </motion.section>
        <Next goBack={false} next={true} />
      </form>
   
  );
}

export default Step1;