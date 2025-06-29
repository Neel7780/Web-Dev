import { useState } from 'react'
import { OtpBox } from './components/OtpBox'
import './App.css'

function App() {
  return (
    <div className="w-screen h-screen bg-violet-950">
      <div className='flex justify-center pt-20'>
        <img src="../pics/computer-logo-internet-png-favpng-bAJctcX18wnUDEZsgq9i1tEb3-removebg-preview.png" alt="webinar-logo" className='w-12 h-12 mr-3'/>
        <div className="text-white text-4xl">Webinar.gg</div>
      </div>
      <div>
        <h1 className='font-sans text-white text-center my-30 text-3xl font-semibold'>Check your Email for Code</h1>
      </div>
      <div className='text-center mt-4'>
        <OtpBox/>
      </div>
    </div>
  )
}

export default App
