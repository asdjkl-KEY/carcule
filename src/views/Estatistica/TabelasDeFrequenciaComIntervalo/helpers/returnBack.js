function returnBack(processo, setProcesso, setLinhasValor, setTabelaBody, setLinhas){
    let backs = {
        informacao: 'informacao',
        tabela: 'informacao',
        calculando: 'tabela',
        resultado: 'tabela',
        informacao2: 'informacao'
    }
    setProcesso(backs[processo]);
    if(processo==='tabela'){
        setLinhasValor([]);
        setTabelaBody([]);
        setLinhas(0);
    }
}

export default returnBack;