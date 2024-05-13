import React, { useState, useEffect, useRef } from "react";
import { User , editUser , selectAllUsers , fetchUsers   } from "../../features/user/userSlice";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CiEdit from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";3
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { useAppDispatch , useAppSelector  } from "../../store/hooks";
import Delete from '../../Assets/Delete.png'



const fontStyle = {fontFamily:'Poppins' , fontWeight:"bold" , padding: '5px'} ;
const inputStyle = " w-3/4 border border-black rounded-lg pl-2"
const Row = ({ user }: { user: User }) => {
  
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);


  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    setEditMode(true);
  };

  
 


  const handleSave = () => {
    console.log("Saving changes:", editedUser);
    dispatch(editUser(editedUser))
    // dispatch(updateUser({ id: editedUser.id , editedUser }));


    setEditMode(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }

  }, [open]);
 

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell  style={{ padding: '5px' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={fontStyle} >
          {user.username}
        </TableCell>
        <TableCell style={fontStyle} >{user.email}</TableCell>
        <TableCell style={fontStyle} >{user.phoneNumber}</TableCell>
        <TableCell style={fontStyle} >
          <IconButton aria-label="edit" onClick={handleEdit}>
          {/* <CiEdit /> */}
        <img src={Delete} alt="" />
          </IconButton>
          {editMode && (
            <IconButton aria-label="save" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} >
              <section className="  relative ">
              {editMode ? (
                        <input
                          type="text"
                          value={editedUser.username}
                          onChange={(e) =>
                            handleChange("username", e.target.value)
                          }
                        />
                      ) : (
                        <Typography variant="h6" gutterBottom component="div">
                          {user.username}
                        </Typography>

                      )}
                                  <div ref={contentRef} />

                      <ul className=" flex flex-col gap-1">
                        <li>Username: {editMode ? (
                        <input
                          type="text"
                          value={editedUser.username}
                          onChange={(e) =>
                            handleChange("username", e.target.value)
                          }
                          className={inputStyle}
                        />
                      ) : (<span>{user.username} </span>  )}</li>
                        <li>Email: {editMode ? (
                        <input
                          type="text"
                          value={editedUser.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          className={inputStyle}

                        />
                      ) : (<span>{user.email} </span>  )}</li>
                        <li> <span className=" mr-2">Address</span>: {editMode ? (
                        <input
                          type="text"
                          value={editedUser.address}
                          onChange={(e) =>
                            handleChange("address", e.target.value)
                          }
                          className={inputStyle}

                        />
                      ) : (<span>{user.address} </span>  )}</li>
                        <li><span className=" mr-2">Phone number</span>: {editMode ? (
                        <input
                          type="text"
                          value={editedUser.phoneNumber}
                          onChange={(e) =>
                            handleChange("phoneNumber", e.target.value)
                          }
                          className={inputStyle}

                        />
                      ) : (<span>{user.phoneNumber} </span>)}</li>
                      </ul>
                      <div className="flex gap-2 absolute top-0 right-0">
                      <IconButton aria-label="edit" onClick={handleEdit}>
                        <CiEdit />
                      </IconButton>
                      {editMode && (
                        <IconButton aria-label="save" onClick={handleSave}>
                          <SaveIcon />
                        </IconButton>
                      )}
                      </div>
             

                            </section>

            </Box>

          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
