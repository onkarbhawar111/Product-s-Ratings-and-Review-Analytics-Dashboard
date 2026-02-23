import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const AvgRatingChart = ({ data }) => (
  <BarChart width={500} height={300} data={data}>
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="avg_rating" fill="#9c27b0" />
  </BarChart>
);

export default AvgRatingChart;