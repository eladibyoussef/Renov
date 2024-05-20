import { useState } from 'react';
import icon from '../../Assets/Vector.png';

function Contact() {
  const professionalInfo = {
    name: 'Jared Palmer',
    email: 'JaredPalmer@example.com',
    phone: '123-456-7890',
  };

  const [requestSent, setRequestSent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSendRequest = () => {
    setRequestSent(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    setShowModal(true); 
  };

  const handleFinalSubmit = () => {
    setShowModal(false); 
    setShowSuccessModal(true); 
  };

  return (
    <div className="mx-auto py-8 md:mt-9 md:ml-9 md:mr-9">
      <div className="bg-white rounded-2xl border shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 md:mb-11">Contact</h1>

        <div className="mb-4 md:mb-6">
          <p className="mb-2 md:mb-3"><strong>Name:</strong> {professionalInfo.name}</p>
          <p className="mb-2 md:mb-3"><strong>Email:</strong> {professionalInfo.email}</p>
          <p className="mb-3 md:mb-5"><strong>Phone Number:</strong> {professionalInfo.phone}</p>
        </div>

        <div className="flex justify-center md:justify-end">
          <button
            className={`bg-[#ABF0F0] px-4 py-2 rounded-md shadow-md hover:bg-white`}
            onClick={handleSendRequest}
          >
            Send Request
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <div className="flex items-center justify-center mb-4">
              <img src={icon} alt="Icon" className="w-4 h-4 mr-2" /> 
              <h4 className="text-lg font-bold">We've posted your request</h4>
            </div>
            <h1 className="text-xl font-bold mb-4 text-center">Describe your request in detail</h1>
            <p className="text-sm text-gray-600 mb-4">
              Add more details to get faster and more accurate quotes.
            </p>
            <textarea
              className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4"
              placeholder="Enter your request details..."
            />
            <p className="text-sm text-gray-600 mb-2">Show me some photos</p>
            <input
              type="file"
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              accept="image/*"
            />
            <button
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 mr-2"
              onClick={closeModal}
            >
              Close
            </button>
            
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleFinalSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
          <img src={icon} alt="Icon" className='  ml-40 w-12 h-12' /> 

            <h1 className="text-2xl font-bold mb-4 text-center">Great! We’ve found you the perfect matches.</h1>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Lastly, we need your details to attach to your request.
            </p>
            <div className="flex justify-center">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 mr-52"
                onClick={() => {
                  setShowSuccessModal(false);
                  setShowModal(true); 
                }}
              >
                Back
              </button>
              
              <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleFinalSubmit}
            >
              Submit
            </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}

export default Contact;
