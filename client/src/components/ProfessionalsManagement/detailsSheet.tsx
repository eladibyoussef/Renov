import React, { useRef, useState , useEffect} from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchProfessionals,
  selectAllProfessionals,
  selectProfessionalError,
  selectProfessionalLoading,
  Professional,
} from "../../features/professional/professionalSlice";
import '../../App.css'



function DetailsSheet({id}) {
    const dispatch = useAppDispatch();
    const users:Professional[] = useAppSelector(selectAllProfessionals);
    const user = users.find(user => user.id === id);
    if (!user) {
        return <p>User not found</p>;
      }




    
    // useEffect(() => {
    //     dispatch(fetchProfessionals());
    //   }, [dispatch]);


  return (
    <div className="details-sheet">
    <div className="details-section">
      <div className="details-item">
        <span className="details-label">Username:</span>
        <span className="details-value">{user.username}</span>
      </div>
      <div className="details-item">
        <span className="details-label">Email:</span>
        <span className="details-value">{user.email}</span>
      </div>
      <div className="details-item">
        <span className="details-label">Phone Number:</span>
        <span className="details-value">{user.phoneNumber}</span>
      </div>
      <div className="details-item">
        <span className="details-label">Address:</span>
        <span className="details-value">{user.address}</span>
      </div>
      <div className="details-item">
        <span className="details-label">License:</span>
        <span className="details-value">{user.license}</span>
      </div>
      <div className="details-item">
        <span className="details-label">CIN:</span>
        <span className="details-value">{user.CIN}</span>
      </div>
      <div className="details-item">
        <span className="details-label">Approved:</span>
        <span className="details-value">{user.approved.approvalStatus ? 'Yes' : 'No'}</span>
      </div>
      <div className="details-item">
        <span className="details-label">Services Provided:</span>
        <span className="details-value">{user.servicesProvided.join(', ')}</span>
      </div>
    </div>
  </div>
  )
}

export default DetailsSheet
