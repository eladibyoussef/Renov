import UploadWidget from "../UploadWidget";
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useEffect } from "react";
import { deleteFormFile } from "@/features/product/productSlice";
import { useAppDispatch } from "@/store/hooks";
import { TiDelete } from "react-icons/ti";

export default function InfoPersonnelles({ formData, handleChange, handleCinUploadSuccess, setPersonalInfo }) {
  const dispatch = useAppDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const onDelete = (file) => {
    console.log(file);

    dispatch(deleteFormFile(file));
    
    // Update the state directly to remove the deleted file
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      CINPictures: prevInfo.CINPictures.filter(fileForm => fileForm.url !== file.url)
    }));
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
          id="CIN"
          name="CIN"
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
          rows={3}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          placeholder="Entrez votre adresse"
          required
        ></textarea>
      </div>
      <div className="mb-4 mt-2">
        <label htmlFor="cinPictures" className="block text-sm font-medium text-gray-700 mb-5">
          Images CIN recto-verso *
        </label>
        <div className="flex gap-3">
          {formData.CINPictures.length > 0 && formData.CINPictures.map((pic) => (
            <div key={pic.url} className="relative">
              <TiDelete className="absolute top-0 right-0 cursor-pointer" onClick={() => onDelete(pic)} />
              <img src={pic.url} alt="CIN" className="h-24 w-24 rounded-lg" />
            </div>
          ))}
          <UploadWidget 
            onUploadSuccess={handleCinUploadSuccess}
            customElement={   
              <button type="button" className="border hover:border-blue-600 p-5 rounded-lg mt-5">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            } 
          />
        </div>
      </div>
    </div>
  );
}
