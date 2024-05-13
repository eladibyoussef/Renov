import React, { useState, ChangeEvent } from 'react';
import logo2 from '../Assets/Logo2.png';

const HeroSection: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [city, setCity] = useState<string>('');
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const [contactInfo, setContactInfo] = useState<{ firstName: string; lastName: string; phone: string; email: string }>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });
    const [address, setAddress] = useState<string>('');

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleAreaSelection = (area: string) => {
        if (selectedAreas.includes(area)) {
            setSelectedAreas(selectedAreas.filter((a) => a !== area));
        } else {
            setSelectedAreas([...selectedAreas, area]);
        }
    };

    const handleContactInfoChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        setContactInfo({ ...contactInfo, [field]: e.target.value });
    };

    const handleAddressChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAddress(e.target.value);
    };

    const handleSubmit = () => {
        // Submit logic here
        console.log("Form submitted");
    };

    return (
        <div className="relative h-screen overflow-hidden flex">
            {/* Background image */}
            <div
                className="flex-1 bg-cover bg-center hidden sm:block"
                style={{
                    backgroundImage: "url('https://tiogacontractors.com/wp-content/uploads/2019/06/Hiring-a-Professional-Plumber-Look-for-These-8-Important-Factors-_-Plumber-in-Bedford-TX.jpg')",
                }}
            />

            {/* Content */}
            <div className="bg-zinc-400 flex-1 flex flex-col justify-center items-center">
                {/* Title */}
                <h1 className="text-5xl text-black font-bold shadow-md mb-8">Plumbing Service</h1>

                {/* Form */}
                <div className="flex w-full items-center justify-center">
                    <div className="rounded-xl bg-gray-200 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                        <div className="text-white">
                            <div className="mb-8 flex flex-col items-center">
                                <img src={logo2} width="50" alt="" className="mb-2" />
                                <h1 className="mb-2 text-2xl">Renovo</h1>
                                <span className="rounded-3xl border-none bg-blue-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-800 shadow-lg outline-none backdrop-blur-md mb-4 sm:mb-0">Check Availability</span>
                            </div>
                            <form action="#" onSubmit={handleSubmit}>
                                {currentStep === 1 && (
                                    <div className="mb-4 text-md text-black">
                                        <label htmlFor="city" className="text-black mb-2">City *</label>
                                        <input 
                                            className="rounded-3xl border-none bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md hover:border-blue-300" 
                                            type="text" 
                                            id="city" 
                                            name="city" 
                                            value={city} 
                                            onChange={(e) => setCity(e.target.value)} 
                                            placeholder="Enter your city" 
                                        />
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="mb-4 text-md text-black">
                                        <label className="text-black mb-2">Which area of your home is affected? *</label>
                                        <div className="flex flex-col">
                                            <div className="flex">
                                                <label className="inline-flex items-center mt-2 mr-4">
                                                    <input 
                                                        type="checkbox" 
                                                        className="form-checkbox h-5 w-5 text-blue-600" 
                                                        value="kitchen" 
                                                        checked={selectedAreas.includes('kitchen')} 
                                                        onChange={() => handleAreaSelection('kitchen')} 
                                                    />
                                                    <span className="ml-2">Kitchen</span>
                                                </label>
                                                <label className="inline-flex items-center mt-2">
                                                    <input 
                                                        type="checkbox" 
                                                        className="form-checkbox h-5 w-5 text-blue-600" 
                                                        value="bathroom" 
                                                        checked={selectedAreas.includes('bathroom')} 
                                                        onChange={() => handleAreaSelection('bathroom')} 
                                                    />
                                                    <span className="ml-2">Bathroom</span>
                                                </label>
                                            </div>
                                            <div className="flex mt-2">
                                                <label className="inline-flex items-center mr-4">
                                                    <input 
                                                        type="checkbox" 
                                                        className="form-checkbox h-5 w-5 text-blue-600" 
                                                        value="living-room" 
                                                        checked={selectedAreas.includes('living-room')} 
                                                        onChange={() => handleAreaSelection('living-room')} 
                                                    />
                                                    <span className="ml-2">Living Room</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input 
                                                        type="checkbox" 
                                                        className="form-checkbox h-5 w-5 text-blue-600" 
                                                        value="bedroom" 
                                                        checked={selectedAreas.includes('bedroom')} 
                                                        onChange={() => handleAreaSelection('bedroom')} 
                                                    />
                                                    <span className="ml-2">Bedroom</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="mb-4 text-sm text-black">
                                        <label className="text-black">Contact Information *</label>
                                        <div className="flex flex-col">
                                            <label className="text-black mb-0 mt-2">First Name</label>
                                            <input 
                                                type="text" 
                                                className="rounded-3xl border-none bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md hover:border-blue-300 mb-2" 
                                                value={contactInfo.firstName} 
                                                onChange={(e) => handleContactInfoChange(e, 'firstName')} 
                                            />
                                            <label className="text-black mb-0 mt-2">Last Name</label>
                                            <input 
                                                type="text" 
                                                className="rounded-3xl border-none bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md hover:border-blue-300 mb-2" 
                                                value={contactInfo.lastName} 
                                                onChange={(e) => handleContactInfoChange(e, 'lastName')} 
                                            />
                                            <label className="text-black mb-0 mt-2">Phone Number</label>
                                            <input 
                                                type="text" 
                                                className="rounded-3xl border-none bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md hover:border-blue-300 mb-2" 
                                                placeholder="Phone Number" 
                                                value={contactInfo.phone} 
                                                onChange={(e) => handleContactInfoChange(e, 'phone')} 
                                            />
                                            <label className="text-black mb-0 mt-2">Email</label>
                                            <input 
                                                type="email" 
                                                className="rounded-3xl border-none bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md hover:border-blue-300 mb-2" 
                                                placeholder="Email" 
                                                value={contactInfo.email} 
                                                onChange={(e) => handleContactInfoChange(e, 'email')} 
                                            />
                                        </div>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div className="mb-4 text-sm text-black">
                                        <label className="text-black mb-2">Enter your address *</label>
                                        <textarea 
                                            className="rounded-3xl border-none bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md hover:border-blue-300 mb-2 h-24" 
                                            value={address} 
                                            onChange={handleAddressChange} 
                                            placeholder="Enter your address" 
                                        />
                                    </div>
                                )}

                                <div className="mt-8 flex justify-between text-lg text-black">
                                    {currentStep > 1 && (
                                        <button onClick={handlePreviousStep} type="button" className="rounded-3xl bg-blue-900 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-blue-600">Previous</button>
                                    )}
                                    <button onClick={handleNextStep} type="button" className="rounded-3xl bg-blue-900 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-blue-600">{currentStep === 4 ? 'Submit' : 'Next'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;
