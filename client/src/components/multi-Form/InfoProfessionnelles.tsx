import React from 'react';

export default function InfoProfessionnelles({ formData, handleChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-8">
      <div className="mb-4">
        <label htmlFor="license" className="block text-sm font-medium text-gray-700">
          License *
        </label>
        <input
          type="text"
          id="license"
          name="license"
          value={formData.license}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez votre licence professionnelle"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="servicesProvided" className="block text-sm font-medium text-gray-700">
          Services Provided *
        </label>
        <textarea
          id="servicesProvided"
          name="servicesProvided"
          value={formData.servicesProvided}
          onChange={handleInputChange}
          rows="3"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez les services fournis (séparés par des virgules)"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="certificates" className="block text-sm font-medium text-gray-700">
          Certificates * 
        </label>
        <input
          type="text"
          id="certificates"
          name="certificates"
          value={formData.certificates}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez les certificats détenus (séparés par des virgules)"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="companyname" className="block text-sm font-medium text-gray-700">
          Companyname *
        </label>
        <input
          type="text"
          id="companyname"
          name="companyname"
          value={formData.companyname}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez le nom de l'entreprise (facultatif)"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">
          About Me *
        </label>
        <textarea
          id="aboutMe"
          name="aboutMe"
          value={formData.aboutMe}
          onChange={handleInputChange}
          rows="3"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez une description ou une biographie"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
          Portfolio (titre, type de média, URL) *
        </label>
        <textarea
          id="portfolio"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleInputChange}
          rows="3"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez les détails du portefeuille (titre, type de média, URL)"
          required
        ></textarea>
      </div>
    </div>
  );
}
 