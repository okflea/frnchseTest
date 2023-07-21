"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import SwatchIcon from "@/components/ui/icons/SwatchIcon"
import { useState } from "react"
import Stepper from "./Stepper"
import PatientInfoStepForm from "./PatientInfoStepForm"

const FloatingMenu = () => {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState({})
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='fixed z-90 bottom-10 right-8 p-4 w-19 h-19 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-2xl hover:animate-pulse duration-300'>
          <SwatchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-5/6 " >
        <DialogHeader>
          <DialogTitle className="text-center">Test Booking Form</DialogTitle>
          <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </DialogHeader>
        { currentStep === 1 && <PatientInfoStepForm setCurrentStep={setCurrentStep} setData={setData} /> }
      </DialogContent>
    </Dialog >
  )
}

export default FloatingMenu
