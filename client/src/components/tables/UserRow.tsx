import React, { useState, useEffect, useRef } from "react";
import { User } from "../../features/user/userSlice";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CiEdit from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";

const Row = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    console.log("Saving changes:", editedUser);
    setEditMode(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  useEffect(() => {
    // Scroll to the bottom of the expanded content when it opens
    if (open && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {user.username}
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell className="hidden lg:block">{user.phoneNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
            <div ref={contentRef} />

              <Typography variant="h6" gutterBottom component="div">
                Customer Details
              </Typography>
              <Table size="small" aria-label="customer-details">
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {editMode ? (
                        <input
                          type="text"
                          value={editedUser.address}
                          onChange={(e) =>
                            handleChange("address", e.target.value)
                          }
                        />
                      ) : (
                        user.address
                      )}
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
                </TableBody>
              </Table>
              {/* This empty div acts as a reference for scrolling */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
