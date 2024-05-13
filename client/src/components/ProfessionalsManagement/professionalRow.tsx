import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import Avatar from '@mui/material/Avatar';
import { Professional } from '../../features/professional/professionalSlice';

const Row = ({ Professional } : {Professional: Professional}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(Professional);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Send editedUser data to backend for saving
    console.log('Saving changes:', editedUser);
    setEditMode(false); // Exit edit mode after saving
  };

  const handleChange = (field: string, value: string) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  return (
    <TableRow>
           <TableCell>
        {editMode ? (
          <input
            type="text"
            value={editedUser.profilePicture}
            onChange={(e) => handleChange('profilePicture', e.target.value)}
          />
        ) : (
          <Avatar alt={Professional.username} src={Professional.profilePicture ? Professional.profilePicture : 'placeholder.jpg'} />
        )}
      </TableCell>
      <TableCell>
        {editMode ? (
          <input
            type="text"
            value={editedUser.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
        ) : (
          Professional.username
        )}
      </TableCell>
      <TableCell>
        {editMode ? (
          <input
            type="text"
            value={editedUser.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        ) : (
          Professional.email
        )}
      </TableCell>

      
      <TableCell>
        {editMode ? (
          <input
            type="text"
            value={editedUser.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />
        ) : (
          Professional.phoneNumber
        )}
      </TableCell>

      <TableCell>
        {editMode ? (
          <input
            type="text"
            value={editedUser.CIN}
            onChange={(e) => handleChange('CIN', e.target.value)}
          />
        ) : (
          Professional.CIN
        )}
      </TableCell>
       
      <TableCell>
        {Professional.approved.approvalStatus ? <p>approved</p> :<p>pending</p>}
      </TableCell>
 
      <TableCell>
        
        <IconButton aria-label="edit" onClick={handleEdit}>
          <CiEdit />
        </IconButton>
        {editMode && (
          <IconButton aria-label="save" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        )}
      </TableCell>
      
      
    
    </TableRow>
  );
};

export default Row;
