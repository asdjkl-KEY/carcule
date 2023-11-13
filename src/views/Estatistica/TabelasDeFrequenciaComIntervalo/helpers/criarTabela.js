function criarTabela(linhas, setMessage, linhasValor, setLinhasValor, selectInput, mudarValor, setInput, setTabelaBody, setProcesso, t, intervalos, fi){
    if(linhas <= 0 || linhas > 20 || !linhas){
        setMessage({
            content: t('tdf.informacao.erro.linhaszero'),
            type: 'danger'
        });
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    } else {
        let lines = +linhas;
        let linesValue = [];
        for(let i=0; i<lines; i++){
            linesValue.push([i+1, intervalos?intervalos[i]:[0,0], fi?fi[i]:0])
        }
        linhasValor = linesValue;
        setLinhasValor(linhasValor);
        linesValue = linesValue.map((e, i) => {
            return <tr>
                <td key={`classe-${i}`}><input onFocus={selectInput} id={`classe-${i}`} onChange={(e) => { mudarValor(e, linhasValor, setLinhasValor, setInput) }} type='number' defaultValue={linhasValor[i][0]}/></td>
                <td key={`intervalomenor-${i}`}><input onFocus={selectInput} id={`intervalomenor-${i}`} onChange={(e) => { mudarValor(e, linhasValor, setLinhasValor, setInput) }} type='number' defaultValue={linhasValor[i][1][0]}/></td>
                <td key={`intervalormaior-${i}`}><input onFocus={selectInput} id={`intervalormaior-${i}`} onChange={(e) => { mudarValor(e, linhasValor, setLinhasValor, setInput) }} type='number' defaultValue={linhasValor[i][1][1]}/></td>
                <td key={`fi-${i}`}><input onFocus={selectInput} id={`fi-${i}`} onChange={(e) => { mudarValor(e, linhasValor, setLinhasValor, setInput) }} type='number' defaultValue={linhasValor[i][2]}/></td>
            </tr>
        });
        setTabelaBody(linesValue);
        setProcesso('tabela')
    }
}

export default criarTabela;