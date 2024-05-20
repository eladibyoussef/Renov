import { useState } from 'react';

export default function Pro3() {
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: 'Maroua BEN ALI',
    email: 'marouabenali040@gmail.com',
    phone: '(213) 280-7442',
    address: 'Agdal, Rabat',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Your Contact Info</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-lg text-left text-gray-700">
                <div>
                  <label className="font-semibold">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={contactInfo.name}
                    onChange={handleChange}
                    className="ml-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleChange}
                    className="ml-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleChange}
                    className="ml-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={contactInfo.address}
                    onChange={handleChange}
                    className="ml-2 p-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-lg text-left text-gray-700">
                <div>
                  <span className="font-semibold">Name:</span> {contactInfo.name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {contactInfo.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {contactInfo.phone}
                </div>
                <div>
                  <span className="font-semibold">Address:</span> {contactInfo.address}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleEditToggle}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? 'Cancel' : 'Modifier'}
          </button>
        </div>
      </div>
    </section>
  );
}
