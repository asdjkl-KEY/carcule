import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CurveChart = ({valor, curva}) => {
  /*
    leptocurtica: 
      -3: 0
      -2: x0.13
      -1: x0.39
      0: Valor
      +1: x0.39
      +2: x0.13
      +3: 0

    mesocurtica:
      -3: 0
      -2: 0.130
      -1: 0.225
      0: 0.263
      +1: 0.225
      +2: 0.130
      +3: 0

    platicurtica:
      -3: 0
      -2: x0.37
      -1: x0.70
      0: Valor
      +1: x0.70
      +2: x0.37
      +3: 0
  */

      const CustomLegend = (props) => {
        const { payload } = props;
        return (
          <ul>
            {payload.map((entry, index) => (
              <li key={`item-${index}`} style={{ color: entry.color }}>
                {entry.value}
                {entry.value === 'Leptocúrtica' && curva === 'leptocurtica' ? ' <====== ' : null}
                {entry.value === 'Mesocúrtica' && curva === 'mesocurtica' ? ' <====== ' : null}
                {entry.value === 'Platicúrtica' && curva === 'platicurtica' ? ' <====== ' : null}
              </li>
            ))}
          </ul>
        );
      };


  const data = [
    { 
      name: '-3',
      Mesocúrtica: 0,
      Leptocúrtica: 0,
      Platicúrtica: 0
    },
    { 
      name: '-2',
      Mesocúrtica: 0.130,
      Leptocúrtica: curva === 'leptocurtica'? (valor*0.13): 0.05,
      Platicúrtica: curva === 'platicurtica'? (valor*0.37):0.055 
    },
    { 
      name: '-1',
      Mesocúrtica: 0.225,
      Leptocúrtica: curva === 'leptocurtica'? (valor*0.39):0.150,
      Platicúrtica: curva === 'platicurtica'? (valor*0.70):0.105
    },
    { 
      name: '0',
      Mesocúrtica: 0.263,
      Leptocúrtica: curva === 'leptocurtica'? valor : 0.385,
      Platicúrtica: curva === 'platicurtica'? valor : 0.150.toFixed(3)
    },
    { 
      name: '+1',
      Mesocúrtica: 0.225 ,
      Leptocúrtica: curva === 'leptocurtica'? (valor*0.39):0.150,
      Platicúrtica: curva === 'platicurtica'? (valor*0.70):0.105
    },
    { 
      name: '+2',
      Mesocúrtica: 0.130 ,
      Leptocúrtica: curva === 'leptocurtica'? (valor*0.13): 0.05,
      Platicúrtica: curva === 'platicurtica'? (valor*0.37):0.055 
    },
    { 
      name: '+3',
      Mesocúrtica: 0 ,
      Leptocúrtica: 0,
      Platicúrtica: 0
    },
  ];
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend  content={ <CustomLegend/> }/>
      <Line type="monotone" dataKey="Leptocúrtica" stroke="#fa5040" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Mesocúrtica" stroke="#9090fa" />
      <Line type="monotone" dataKey="Platicúrtica" stroke="#90fa90" />
    </LineChart>
  );
};

export default CurveChart;
