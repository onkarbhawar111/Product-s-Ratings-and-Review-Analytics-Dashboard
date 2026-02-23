import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const TopReviewedChart = ({ data }) => (
  <BarChart width={500} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="total_reviews" fill="#ff9800" />
  </BarChart>
);

export default TopReviewedChart;