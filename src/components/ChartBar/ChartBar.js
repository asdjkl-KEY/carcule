import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

const ChartBar = ({ intervalos, frecuencia_absoluta }) => {
  let data = [];

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  for (let i = 0; i < intervalos.length; i++) {
    let intervalo = intervalos[i];
    let fi = frecuencia_absoluta[i];
    data.push({
      name: `de ${intervalo[0]} até ${intervalo[1]}`,
      valor: fi,
      color: generateRandomColor(), 
    });
  }

  const CustomLegend = () => {
    return (
      <div>
        <h4>Legenda</h4>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {data.map((e, i) => (
          <div key={i}>
            <span style={{ color: e.color, marginLeft: 16, marginTop: 16 }}>{e.name}</span>
          </div>
        ))}
        </div>
      </div>
    );
  }

  return (
    <BarChart
      width={720}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend content={<CustomLegend />} />
      <Bar dataKey="valor" barSize={48} aria-setsize={48}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default ChartBar;
