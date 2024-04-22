import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchUsers,
  selectAllUsers,
  selectUserLoading,
  selectUserError,
  
} from "../features/user/userSlice";
import BackofficeHeader from "../layouts/BackofficeHeader";
import { CircularProgress, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "./tables/UserRow";
import '../index.css'


const ROWS_PER_PAGE = 10;



const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    setCurrentPage(page - 1); 
  };

  const renderUsers = () => {
    const startIndex = currentPage * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const usersToShow = users.slice(startIndex, endIndex);

    return usersToShow.map((user) => <Row key={user.id} user={user} />);
  };

  const pageCount = Math.ceil(users.length / ROWS_PER_PAGE);

  return (
    <div className="lg:col-span-6 flex flex-col sm:col-span-8 h-screen overflow-auto  ">
      <BackofficeHeader currentPage='users' />
      {/* <div className="bg-white mb-8 border ">
        <h1 className="font-Poppins font-bold p-8 ">User Management</h1>
        <hr className="border-t-8 border-customPurple w-72 rounded-full" />
      </div> */}
      <div className="   pr-5 pl-5">
        <TableContainer component={Paper} style={{ borderRadius: '12px', overflow: 'auto',overflowX: 'auto', maxHeight: '500px' } } className="hide-scrollbar">
          <Table aria-label="collapsible table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ color: "#B5B7C0" }}>Username</TableCell>
                <TableCell style={{ color: "#B5B7C0" }}>Email</TableCell>
                <TableCell style={{ color: "#B5B7C0" }} className="hidden lg:table-cell">Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderUsers()}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center" >
          <Pagination
            count={pageCount}
            page={currentPage + 1} 
            onChange={handlePageChange}
            color="primary"  />
        </Box>
      </div>
    </div>
  );
};

export default UserManagement;
