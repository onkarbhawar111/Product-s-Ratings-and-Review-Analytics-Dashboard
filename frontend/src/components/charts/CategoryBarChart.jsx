import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CategoryBarChart = ({ data }) => (
  <BarChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="total_products" fill="#1976d2" />
  </BarChart>
);

export default CategoryBarChart;