import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



const ChartBar = ({intervalos, frecuencia_absoluta}) => {
  let data = [];

  for(let i=0; i<intervalos.length; i++){
    let intervalo = intervalos[i];
    let fi = frecuencia_absoluta[i];
    data.push({
      name: `de ${intervalo[0]} até ${intervalo[1]}`,
      valor: fi
    })
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
      <Legend />
      <Bar dataKey="valor" fill="#905010" barSize={48} aria-setsize={48} />
    </BarChart>
  );
};

export default ChartBar;