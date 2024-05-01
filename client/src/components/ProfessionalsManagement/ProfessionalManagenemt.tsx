import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchProfessionals,
  selectAllProfessionals,
  selectProfessionalError,
  selectProfessionalLoading,
  Professional,
} from "../../features/professional/professionalSlice";
import BackofficeHeader from "../shared/BackofficeHeader";
import { CircularProgress, Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "./professionalRow";

const ROWS_PER_PAGE = 10;

const ProfessionalManagement = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllProfessionals);
  const loading = useAppSelector(selectProfessionalLoading);
  const error = useAppSelector(selectProfessionalError);
  const [currentPage, setCurrentPage] = React.useState(0);

  useEffect(() => {
    dispatch(fetchProfessionals());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  const handlePageChange = (event: any, page: number) => {
    event.preventDefault();
    setCurrentPage(page - 1);
  };

  const renderUsers = () => {
    const startIndex = currentPage * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const usersToShow = users.slice(startIndex, endIndex);

    return usersToShow.map((professional) => (
      <Row key={professional.id} Professional={professional} />
    ));
  };

  const pageCount = Math.ceil(users.length / ROWS_PER_PAGE);

  return (
    <div className="col-span-6 flex flex-col">
      <BackofficeHeader currentPage="Professionals" />
      <div className="p-5">
        <TableContainer
          component={Paper}
          style={{ borderRadius: "12px", overflow: "auto", maxHeight: "500px" }}
        >
          <Table aria-label="collapsible table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#B5B7C0" }}></TableCell>

                <TableCell style={{ color: "#B5B7C0" }}>Username</TableCell>
                <TableCell style={{ color: "#B5B7C0" }}>Email</TableCell>
                <TableCell style={{ color: "#B5B7C0" }}>Phone Number</TableCell>
                <TableCell style={{ color: "#B5B7C0" }}>CIN</TableCell>

                <TableCell style={{ color: "#B5B7C0" }}>Status</TableCell>
                <TableCell style={{ color: "#B5B7C0" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderUsers()}</TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={pageCount}
          page={currentPage + 1}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ProfessionalManagement;
