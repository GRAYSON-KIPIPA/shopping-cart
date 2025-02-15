import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { CartItem, ResponseProduct } from "../modals/Modals";

import { useNavigate } from "react-router-dom";
import AxiosWithAuth from "../api";
import { getUserFromToken } from "../utils/auth";

interface ProductsTableProps {
  products: ResponseProduct[];
  onDeleteProduct: (id: string) => void;
  addToCart: (item: CartItem) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onDeleteProduct,
  addToCart,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const api = AxiosWithAuth();
  const user = getUserFromToken();

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
  const currentProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      onDeleteProduct(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewProduct = (id: string) => {
    navigate(`/product/${id}`);
  };
  const handleEditProduct = (id: string) => {
    navigate(`/edit-product/${id}`);
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
        <h1 className="text-center bg-red-900 text-gray-300 p-2 font-bold">
          PRODUCT TABLE
        </h1>
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
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">View</TableCell>
              {user?.isAdmin && <TableCell align="center">Edit</TableCell>}
              {user?.isAdmin && <TableCell align="center">Delete</TableCell>}
              <TableCell align="center">Cart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((row: ResponseProduct, index: number) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => handleViewProduct(row._id)}
                    className="bg-lime-500 p-1 rounded-sm"
                  >
                    View
                  </button>
                </TableCell>
                {user?.isAdmin && (
                  <TableCell align="center">
                    <button
                      onClick={() => handleEditProduct(row._id)}
                      className="bg-blue-500 p-1 rounded-sm"
                    >
                      Edit
                    </button>
                  </TableCell>
                )}

                {user?.isAdmin && (
                  <TableCell align="center">
                    <button
                      onClick={() => deleteProduct(row?._id)}
                      className="bg-red-400 p-1 rounded-sm"
                    >
                      Delete
                    </button>
                  </TableCell>
                )}
                <TableCell align="center">
                  <button
                    onClick={() =>
                      addToCart({
                        productId: row?._id,
                        name: row.name,
                        price: row.price,
                        quantity: 1,
                      })
                    }
                    className="bg-lime-900 text-cyan-200 p-1 rounded-sm"
                  >
                    addToCart
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
                  count={products.length}
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

export default ProductsTable;
