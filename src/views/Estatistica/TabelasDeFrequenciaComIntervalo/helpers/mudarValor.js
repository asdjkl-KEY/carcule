function mudarValor(e, linhasValor, setLinhasValor, setInput){
    let key = e.target.id;
    let value = +e.target.value;
    let linha = +key.split('-')[1];
    let coluna = key.split("-")[0];
    switch(coluna){
        case 'classe':
            linhasValor[linha][0] = value;
            break;
        case 'intervalomenor':
            linhasValor[linha][1][0] = value;
            break;
        case 'intervalormaior':
            linhasValor[linha][1][1] = value;
            break;
        case 'fi':
            linhasValor[linha][2] = value;
            break;
        default:
            break;
    }
    setLinhasValor(linhasValor);
    setInput(key);
}

export default mudarValor;