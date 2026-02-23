import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../features/analytics/analyticsSlice";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import Filters from "../components/filters/Filters";
import ProductsTable from "../components/table/ProductsTable";
import CategoryBarChart from "../components/charts/CategoryBarChart";
import TopReviewedChart from "../components/charts/TopReviewedChart";
import DiscountHistogram from "../components/charts/DiscountHistogram";
import AvgRatingChart from "../components/charts/AvgRatingChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Review Analytics Dashboard
      </Typography>

      <Filters />

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CategoryBarChart data={data.categoryData || []} />
        </Grid>
        <Grid item xs={6}>
          <TopReviewedChart data={data.topProducts || []} />
        </Grid>
        <Grid item xs={6}>
          <DiscountHistogram data={data.discountData || []} />
        </Grid>
        <Grid item xs={6}>
          <AvgRatingChart data={data.avgRating || []} />
        </Grid>
      </Grid>

      <ProductsTable />
    </Container>
  );
};

export default Dashboard;