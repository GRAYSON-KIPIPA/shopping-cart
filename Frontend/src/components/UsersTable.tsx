import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { ResponseUser } from "../modals/Modals";
import api from "../api";
import { useNavigate } from "react-router-dom";
import useAxiosWithAuth from "../api";

interface UsersTableProps {
  users: ResponseUser[];
  onDeleteProduct: (id: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onDeleteProduct }) => {
  const api = useAxiosWithAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice the products array to show only current page items
  const currentUsers = users?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  //   const deleteProduct = async (id: string) => {
  //     try {
  //       await api.delete(`/products/${id}`);
  //       onDeleteProduct(id);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handleDeleteUser = async (id: string) => {
    await api.delete(`/admin/users/${id}`);
  };

  const handleViewUser = (id: string) => {
    navigate(`/user-info/${id}`);
  };

  return (
    <div className="flex justify-center mt-4">
      <div
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        <Table
          sx={{
            width: 850,
            borderRight: "1px solid lightgray",
            borderLeft: "1px solid lightgray",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow className="bg-gray-200" style={{ color: "white" }}>
              <TableCell align="center">S/N.</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">View</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers?.map((row: ResponseUser, index: number) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  {row.isAdmin ? "Admin" : "User"}
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => handleViewUser(row._id)}
                    className="bg-lime-500 p-1 rounded-sm"
                  >
                    View
                  </button>
                </TableCell>
                <TableCell align="center">
                  <button className="bg-lime-900 text-cyan-200 p-1 rounded-sm">
                    Edit
                  </button>
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => handleDeleteUser(row?._id)}
                    className="bg-red-400 p-1 rounded-sm"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={users?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;
