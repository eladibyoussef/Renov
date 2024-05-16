import { useState } from 'react';

function Contact() {
  const professionalInfo = {
    name: 'Jared Palmer',
    email: 'JaredPalmer@example.com',
    phone: '123-456-7890',
  };

  const [requestSent, setRequestSent] = useState(false);

  const handleSendRequest = () => {
    setRequestSent(true);
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
    </div>
  );
}

export default Contact;
