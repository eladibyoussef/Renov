import React from 'react';

export default function InfoPersonnelles({ formData, handleChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-8">
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username *
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez votre nom d'utilisateur"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cin" className="block text-sm font-medium text-gray-700">
          Carte d'identité nationale (CIN) *
        </label>
        <input
          type="text"
          id="cin"
          name="cin"
          value={formData.cin}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez votre numéro de CIN"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Adresse e-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez votre adresse e-mail"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez votre mot de passe"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Numéro de téléphone *
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez votre numéro de téléphone"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Adresse *
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          rows="3"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez votre adresse"
          required
        ></textarea>
      </div>
    </div>
  );
}
