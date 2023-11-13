function atualizarQuartil(e, setSeparatriz){
    let value = e.target.value;
    value = parseInt(value);
    if(value < 0 || value > 100){
      return;
    }
    setSeparatriz(value);
}

export default atualizarQuartil;