function mudarBooleano(key, e, [setMedia, setDesvioMedio, setVariancia, setDesvioPadrao, setModa, setMediana, setCoeficienteDeVariacao, setRepresentacao], media){
    let value = e.target.checked;
    console.log(key)
    console.log(media)
    switch(key){
        case 'media':
            setMedia(value);
            break;
        case 'desvio_medio':
            setDesvioMedio(value);
            break;
        case 'variancia':
            setVariancia(value);
            break;
        case 'desvio_padrao':
            setDesvioPadrao(value);
            break;
        case 'moda':
            setModa(value);
            break;
        case 'mediana':
            setMediana(value);
            break;
        case 'coeficiente_de_variacao':
            setCoeficienteDeVariacao(value);
            break;
        case 'representacao':
            setRepresentacao(value);
            break;
        default:
            break;
    }
}
export default mudarBooleano;