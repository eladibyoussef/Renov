import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchUsers,
  selectAllUsers,
  selectUserLoading,
  selectUserError,
  User,
} from "../../features/user/userSlice";
import { CiEdit } from "react-icons/ci";


const Row = ({ user } : {user:User}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

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
    <>
      <TableRow>
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
        <TableCell>
          {editMode ? (
            <input
              type="text"
              value={editedUser.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
          ) : (
            user.username
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
            user.email
          )}
        </TableCell>
        <TableCell>{user.phoneNumber}</TableCell>
      </TableRow>
    </>
  );
};

export default Row;
