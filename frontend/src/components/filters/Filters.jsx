import { Grid, TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setCategory,
  setRating,
  fetchProducts,
} from "../../features/products/productsSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const { search, category, rating, page, limit } = useSelector(
    (state) => state.products
  );

  const handleChange = (type, value) => {
    dispatch(type(value));
    dispatch(
      fetchProducts({
        page,
        limit,
        search,
        category,
        rating,
        [type.name.replace("set", "").toLowerCase()]: value,
      })
    );
  };

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="Search Product"
          value={search}
          onChange={(e) => handleChange(setSearch, e.target.value)}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          select
          fullWidth
          label="Category"
          value={category}
          onChange={(e) => handleChange(setCategory, e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Computers&Accessories">
            Computers&Accessories
          </MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={4}>
        <TextField
          select
          fullWidth
          label="Minimum Rating"
          value={rating}
          onChange={(e) => handleChange(setRating, e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="4">4+</MenuItem>
          <MenuItem value="3">3+</MenuItem>
          <MenuItem value="2">2+</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default Filters;