import {
  Table, TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  Paper,  TablePagination,  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPage, fetchProducts } from "../../features/products/productsSlice";
import { useEffect } from "react";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { data, total, page, limit, loading, error, search, category, rating } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page, limit, search, category, rating }));
  }, [dispatch, page, search, category, rating, limit]);

  const handleChangePage = (_, newPage) => {
    dispatch(setPage(newPage + 1));
  };

  return (
    <Paper sx={{ mt: 4 }}>
      {loading && <CircularProgress sx={{ m: 2 }} />}
      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Discount %</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.product_id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.discount_percentage}</TableCell>
                <TableCell>{product.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={limit}
        rowsPerPageOptions={[10]}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default ProductsTable;