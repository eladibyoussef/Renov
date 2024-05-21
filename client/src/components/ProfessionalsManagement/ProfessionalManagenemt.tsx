// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import {
//   fetchProfessionals,
//   selectAllProfessionals,
//   selectProfessionalError,
//   selectProfessionalLoading,
//   Professional,
// } from "../../features/professional/professionalSlice";
// import BackofficeHeader from "../shared/BackofficeHeader";
// import { CircularProgress, Pagination } from "@mui/material";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Row from "./professionalRow";

// const ROWS_PER_PAGE = 10;

// const ProfessionalManagement = () => {
//   const dispatch = useAppDispatch();
//   const users = useAppSelector(selectAllProfessionals);
//   const loading = useAppSelector(selectProfessionalLoading);
//   const error = useAppSelector(selectProfessionalError);
//   const [currentPage, setCurrentPage] = React.useState(0);

//   useEffect(() => {
//     dispatch(fetchProfessionals());
//   }, [dispatch]);

//   if (loading) return <CircularProgress />;
//   if (error) return <p>Error: {error}</p>;

//   const handlePageChange = (event: any, page: number) => {
//     event.preventDefault();
//     setCurrentPage(page - 1);
//   };

//   const renderUsers = () => {
//     const startIndex = currentPage * ROWS_PER_PAGE;
//     const endIndex = startIndex + ROWS_PER_PAGE;
//     const usersToShow = users.slice(startIndex, endIndex);

//     return usersToShow.map((professional) => (
//       <Row key={professional.id} Professional={professional} />
//     ));
//   };

//   const pageCount = Math.ceil(users.length / ROWS_PER_PAGE);

//   return (
//     <div className="col-span-6 flex flex-col">
//       <BackofficeHeader currentPage="Professionals" />
//       <div className="p-5">
//         <TableContainer
//           component={Paper}
//           style={{ borderRadius: "12px", overflow: "auto", maxHeight: "500px" }}
//         >
//           <Table aria-label="collapsible table" stickyHeader>
//             <TableHead>
//               <TableRow>
//                 <TableCell style={{ color: "#B5B7C0" }}></TableCell>

//                 <TableCell style={{ color: "#B5B7C0" }}>Username</TableCell>
//                 <TableCell style={{ color: "#B5B7C0" }}>Email</TableCell>
//                 <TableCell style={{ color: "#B5B7C0" }}>Phone Number</TableCell>
//                 <TableCell style={{ color: "#B5B7C0" }}>CIN</TableCell>

//                 <TableCell style={{ color: "#B5B7C0" }}>Status</TableCell>
//                 <TableCell style={{ color: "#B5B7C0" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>{renderUsers()}</TableBody>
//           </Table>
//         </TableContainer>
//         <Pagination
//           count={pageCount}
//           page={currentPage + 1}
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </div>
//     </div>
//   );
// };

// export default ProfessionalManagement;


import React, { useRef, useState , useEffect} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchProfessionals,
  selectAllProfessionals,
  selectProfessionalError,
  selectProfessionalLoading,
  Professional,
} from "../../features/professional/professionalSlice";
import { CircularProgress, Pagination } from "@mui/material";
import BackofficeHeader from "../shared/BackofficeHeader";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/ui/sheet"
import DetailsSheet from './detailsSheet';



interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

type DataIndex = keyof Professional;

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const ProfessionalManagement: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const dispatch = useAppDispatch();
    const users:Professional[] = useAppSelector(selectAllProfessionals);
    const loading = useAppSelector(selectProfessionalLoading);
    const error = useAppSelector(selectProfessionalError);


      useEffect(() => {
    dispatch(fetchProfessionals());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Professional> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<Professional> = [
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
      width: '30%',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Approval Status',
      dataIndex: ['approved', 'approvalStatus'],
      key: 'approved',
      width: '20%',
      render: (approvalStatus: boolean) => (
        <div className=' flex gap-5'>
        <span style={{ color: approvalStatus ? 'green' : 'red' }} >
          {approvalStatus ? 'Approved' : 'Not Approved'} 
        </span>
        </div>
      ),    },
      {
        title:'Details',
        dataIndex:'id',
        key:'id',
        width:'10%',
        render:(id)=>(
          <Sheet>
          <SheetTrigger><CgArrowsExpandUpRight /></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Professional Details</SheetTitle>
              <SheetDescription>
                review carefyllu the details , contact the professional if somthing needs clarification.
                
              </SheetDescription>
           
            </SheetHeader>
            <DetailsSheet id={id}/>
                 
          </SheetContent>
        </Sheet>
        )

      }
  ];

  return (
  <div className="col-span-6 flex flex-col">
    <BackofficeHeader currentPage="Professionals" />
   <div className="p-5">

    <Table columns={columns} dataSource={users} />;
   </div>

  </div>)
};

export default ProfessionalManagement;