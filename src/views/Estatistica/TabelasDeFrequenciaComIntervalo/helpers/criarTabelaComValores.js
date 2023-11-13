import GeradorDeTabelasComIntervalo from  '../../../../classes/GeradorDeTabelaComIntervalo';
import criarTabela from './criarTabela';

function criarTabelaComValores(texto, [setMessage, linhasValor, setLinhasValor, selectInput, mudarValor, setInput, setTabelaBody, setProcesso, t]){
    let tdf = new GeradorDeTabelasComIntervalo(texto);
    tdf = tdf.formatar();
    let { intervalos, fi } = tdf;
    criarTabela(intervalos.length, setMessage, linhasValor, setLinhasValor, selectInput, mudarValor, setInput, setTabelaBody, setProcesso, t, intervalos, fi)
}

export default criarTabelaComValores;