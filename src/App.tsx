import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from './components/Navbar';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from "./Step4";
import Confirm from "./Confirm";
import { AnimatePresence } from "framer-motion";



function App() {
  const location = useLocation()
  return (
    <main className='bg-Light-gray grid place-items-center w-screen md:min-h-screen box-border overflow-x-hidden' style={{ fontFamily: 'Ubuntu' }}>
      <main className=" flex flex-col items-center min-h-screen md:min-h-fit w-screen md:max-w-[940px] md:flex-row md:bg-white md:rounded-xl md:p-5 relative md:h-fit md:overflow-x-hidden">
        <Navbar />
        <section

          className='w-full flex  flex-1 flex-col items-center md:h-[580px] md:justify-between md:mb-0'>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.key}>
              <Route path="/multi-step-form/" element={<Step1 />} />
              <Route path="/multi-step-form/step2" element={<Step2 />} />
              <Route path="/multi-step-form/step3" element={<Step3 />} />
              <Route path="/multi-step-form/step4" element={<Step4 />} />
              <Route path="/multi-step-form/confirm" element={<Confirm />} />
            </Routes>
          </AnimatePresence>
        </section>
      </main>
    </main>
  );
}

export default App;
