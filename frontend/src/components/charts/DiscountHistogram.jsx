import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const DiscountHistogram = ({ data }) => (
  <BarChart width={500} height={300} data={data}>
    <XAxis dataKey="discount_bucket" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="product_count" fill="#4caf50" />
  </BarChart>
);

export default DiscountHistogram;