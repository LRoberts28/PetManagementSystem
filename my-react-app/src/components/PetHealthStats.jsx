import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PetHealthStats = ({ healthData }) => (
  <ResponsiveContainer width="500%" height={300}>
    <LineChart data={healthData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="weight" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);

export default PetHealthStats;
