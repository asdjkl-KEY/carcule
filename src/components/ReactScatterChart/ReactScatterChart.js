import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'A', 'Coeficiente de Curtosis': 10 },
  { name: 'B', 'Coeficiente de Curtosis': 15 },
  { name: 'C', 'Coeficiente de Curtosis': 20 },
  { name: 'D', 'Coeficiente de Curtosis': 25 },
];

const ReactScatterChart = (
  <ScatterChart
    width={400}
    height={400}
    margin={{
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }}
  >
    <CartesianGrid />
    <XAxis type="number" dataKey="x" name="Coeficiente de Curtosis" />
    <YAxis type="number" dataKey="y" name="Frecuencia" />
    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    <Scatter name="Coeficiente de Curtosis vs. Frecuencia" data={data} fill="#8884d8" />
  </ScatterChart>
);

export default ReactScatterChart;