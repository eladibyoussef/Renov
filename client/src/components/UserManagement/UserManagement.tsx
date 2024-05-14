import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchUsers,
  selectAllUsers,
  selectUserLoading,
  selectUserError,
  
} from "../../features/user/userSlice";
import BackofficeHeader from "../shared/BackofficeHeader";
import { CircularProgress, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "./UserRow";
import '../../index.css'
import { IoFilter } from "react-icons/io5";



import { MdAddCircleOutline } from "react-icons/md";
import { AppDispatch } from "../../store/store";

const ROWS_PER_PAGE = 8;



const UserManagement: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch  ]);

  
  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    setCurrentPage(page - 1); 
  };

  const renderUsers = () => {
    
    const usersToShow = users.slice(startIndex, endIndex);

    return usersToShow.map((user) => <Row key={user.id} user={user} />);
  };

  const pageCount = Math.ceil(users.length / ROWS_PER_PAGE);

  return (
    <div className="lg:col-span-6 flex flex-col sm:col-span-8 h-screen overflow-auto  ">
      <div className=" flex flex-col h-full  gap-4 ">

      <BackofficeHeader currentPage='users' />
      <div className="mr-5 ml-5 bg-white  flex flex-col  rounded-xl gap-5">
        <div className=" p-5  flex justify-end items-center gap-3">
          <input type="text" placeholder="search" className=" bg-customBlue  pl-3 rounded-md" />
          <div className="flex gap-2 items-center bg-customBlue">
            <p className=" font-Poppins text-xs">Sort by:<span className=" ml-2 font-Poppins font-bold">Newest</span> </p>
          <IoFilter />

          </div>

        </div>

        <TableContainer component={Paper} style={{  overflow: 'auto',overflowX: 'auto', maxHeight: '500px'   } } className="hide-scrollbar h-96 ">
          <Table aria-label="collapsible table" stickyHeader >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ color: "#B5B7C0" }}>Username</TableCell>
                <TableCell style={{ color: "#B5B7C0" }}>Email</TableCell>
                <TableCell style={{ color: "#B5B7C0" }} className="hidden lg:table-cell">Phone Number</TableCell>
                <TableCell style={{ color: "#B5B7C0" }}>Actions</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {renderUsers()}
            </TableBody>
          </Table>
        </TableContainer>
        
      <Box  display="flex" justifyContent="space-between" >
        <span className=" text-[#B5B7C0] text-sm ml-5">showing {startIndex+1} to {endIndex} of {users.length} </span>
          <Pagination
            count={pageCount}
            page={currentPage + 1} 
            onChange={handlePageChange}
            color="primary"  />
        </Box>
            </div>
            <div className=" flex-1 bg-white ">

            </div>
            </div>
    </div>
  );
};

export default UserManagement;
