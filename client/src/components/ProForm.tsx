// UserForm.tsx
import React, { useState } from 'react';
import { useAppDispatch , useAppSelector } from '../store/hooks';
import { professionalRegisterReq } from '../features/professional/professionalSlice';
import { proDocument } from '../features/professional/professionalSlice';


const ProForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const professionals = useAppSelector((state)=> state.professional.message[0])
  const formData:proDocument = {
    
      CIN: '',
      username: '',
      email: '',
      phoneNumber: 0,
      license:'',
      address: '',
      servicesProvided: [],
    
  }
  const [form, setForm] = useState(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: name === 'servicesProvided' ? value.split(',') : value, 
      
    }));

  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(professionalRegisterReq(form));
    // Here you can send the data to the backend
  };

  return (
    <>
    
    <form onSubmit={handleSubmit}>
      <input type="text" name="CIN" value={form.CIN} onChange={handleChange} placeholder="CIN" /><br />
      <input type="text" name="license" value={form.license} onChange={handleChange} placeholder="license" /><br />
      <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" /><br />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" /><br />
      <input type="number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" /><br />
      <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" /><br />
      <input type="text" name="servicesProvided" value={form.servicesProvided.join(',')} onChange={handleChange} placeholder="Services Provided (comma-separated)" /> <br />
      <button type="submit">Submit</button><br />
    </form>

<div className='border-solid border-black h-1/4'><p>{professionals}</p></div>
    </>
  );
};

export default ProForm;
