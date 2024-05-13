

function StepperControl() {
  return (
    <div className="container flex justify-around mt-7 mb-8 " >
      
      <button className="bg-white text-slate-400 uppercase py-2 px-4
       rounded-xl font-semibold cursor-pointer border-2
        border-slate-300 hover:text-black transition
        duration-200 ease-in-out">
      Back
      </button>
      <button className=" bg-green-800 text-white uppercase py-2 px-4
       rounded-xl font-semibold cursor-pointer 
         hover:text-white transition
        duration-200 ease-in-out">
      Next
      </button>

    </div>
  )
}

export default StepperControl
