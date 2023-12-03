import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CurveChartAssimetric = ({ media, mediana, moda}) => {

  media = (Number(media).toFixed(2) + '').replace(".", ",");
  mediana = (Number(mediana).toFixed(2) + '').replace(".", ",");
  moda = (Number(moda).toFixed(2) + '').replace(".", ",");

  let nMedia = Number(media.replace(",", "."));
  let nMediana = Number(mediana.replace(",", "."));
  let nModa = Number(moda.replace(",", "."));
  
  let simetrica = false;
  if(media === mediana && mediana === moda) simetrica = true;

  let nome = '';
  if(simetrica === true){
    nome = "Simétrica"
  } else if(nMedia >= nMediana && nMediana >= nModa){
    nome = "Assimétrica Positiva"
  } else if(nMedia <= nMediana && nMediana <= nModa){
    nome = "Assimétrica Negativa"
  } else if(nMedia >= nMediana && nMediana <= nModa){
    nome = "Assimétrica Negativa"
  } else {
    nome = "Assimétrica"
  }
  let min = Math.min(nMedia, nMediana, nModa);

  const data = [
    {
      name: "-3",
      valor: 0,
    },
    {
      name: "-2",
      valor: min*0.35,
    },
    {
      name: "Média",
      valor: nMedia,
    },
    {
      name: "Mediana",
      valor: nMediana,
    },
    {
      name: "Moda",
      valor: nModa,
    },
    {
      name: "+2",
      valor: min*0.35,
    },
    {
      name: "+3",
      valor: 0,
    },
  ];

  const MinhaLegenda = () => {
    return (
      <div>
        <h3>{nome}</h3>
        <h4>Media: {media}</h4>
        <h4>Mediana: {mediana}</h4>
        <h4>Moda: {moda}</h4>
      </div>
    )
  }
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend content={<MinhaLegenda/>}/>
      <Line type="monotone" dataKey="valor" stroke="#9090fa" />
    </LineChart>
  );
};

export default CurveChartAssimetric;
