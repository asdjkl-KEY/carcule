import React, { useState, useEffect } from 'react';
import { Theme } from '../../../configs/settings';
import { t } from '../../../configs/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import symbols from '../../../symbols';
import TabelaDeDistribuicao from '../../../classes/TabelaDeDistribuicao';
import './TabelasDeFrequencia.css'

//componentes
import FormInputGroup from '../../../components/FormInputGroup/FormInputGroup';
import Button from '../../../components/Button/Button';
import Alert from '../../../components/Alert/Alert';
import Loading from '../../../components/Loading/Loading';
import BooleanInput from '../../../components/BooleanInput/BooleanInput';

let tabelaSemIntervalo = [
    ["xi", "fi"]
]

const TabelasDeFrequencia = () => {
    let [currentInput, setCurrentInput] = useState(0);
    function selectInput(e){
        document.getElementById(e.target.id).select();
    }

    let [erro, setErro] = useState(null);
    /**
     * @var {linhas} Número de linhas da tabela
    */
    let [linhas, setLinhas] = useState(0);
    let [linhasValor, setLinhasValor] = useState([]);
    let [tabela, setTabela] = useState([]);
    let [informacoes, setInformacoes] = useState([])

    /**
     * @var {media} Média aritmética da tabela
     * @var {desvio_medio} Desvio médio da tabela
     * @var {variancia} Variância amostral da tabela
     * @var {desvio_padrao} Desvio padrão amostral da tabela
     * @var {moda} Moda da tabela
     * @var {mediana} Mediana da tabela
     * @var {coeficiente_de_variacao} Coeficiente de variação da tabela
     */
    let [media, setMedia] = useState(true);
    let [desvio_medio, setDesvioMedio] = useState(true);
    let [variancia, setVariancia] = useState(true);
    let [desvio_padrao, setDesvioPadrao] = useState(true);
    let [moda, setModa] = useState(true);
    let [mediana, setMediana] = useState(true);
    let [coeficiente_de_variacao, setCoeficienteDeVariacao] = useState(true);
    let [representacao, setRepresentacao] = useState(true);

    let opcoes = [[media,'media'],[desvio_medio,'desvio_medio'],[variancia,'variancia'],[desvio_padrao,'desvio_padrao'],[moda,'moda'],[mediana,'mediana'],[coeficiente_de_variacao,'coeficiente_de_variacao'],[representacao, 'representacao']].map(opcao => {
        return <div className='tdf-opcao'>
            <span>{t(`tdf.opcoes.${opcao[1]}`)}</span>
            <BooleanInput dft={true} key={opcao[1]} value={opcao[0]} func={(e) => {let key = `${opcao[1]}`; mudarBooleano(key, e);}} />
        </div>
    })
    /**
     * @var {processo} Processo da aplicação (informacao, tabela, calculando, resultado)
     */
    let [processo, setProcesso] = useState('informacao');
    useEffect(() => {
        function handleEnterPress(e){
            if(e.key==='Enter'){
                e.preventDefault();
                if(currentInput!==0){
                    let element = document.getElementById(currentInput);
                    element.focus();
                } 
            } else if(e.key === 'Backspace' && e.ctrlKey){
                let backs = {
                    informacao: 'informacao',
                    tabela: 'informacao',
                    calculando: 'tabela',
                    resultado: 'tabela'
                }
                setProcesso(backs[processo]);
                if(processo==='tabela'){
                    tabelaSemIntervalo = [
                        ["xi", "fi"]
                    ]
                    setLinhasValor([]);
                    setLinhas(0);
                }
            }
        }
        document.addEventListener('keydown', handleEnterPress);
    }, [currentInput, processo, linhasValor, setProcesso, setLinhas])

    /**
     * @var {tdf} Tabela de distribuição de frequência
     */
    let [tdf, setTdf] = useState([]);

    function criarLinhas(){
        if(linhas>0 && linhas < 21){
            for(let i=0; i<linhas; i++){
                linhasValor.push(
                    <tr className='tdf-tabela-linha'>
                        <td>
                            <input id={`xi-${i}`} onFocus={selectInput} onChange={atualizarTabela} key={i} className='tdf-tabela-xi' type='number' defaultValue={0}/>
                        </td>
                        <td>
                            <input id={`fi-${i}`} onFocus={selectInput} onChange={atualizarTabela} key={i} className='tdf-tabela-fi' type='number' defaultValue={0}/>
                        </td>
                    </tr>
                )
                tabelaSemIntervalo.push([0,0])
            }
            setLinhasValor(linhasValor);
            setProcesso('tabela')
        } else {
            setErro({
                type: 'danger',
                text: t('tdf.informacao.erro.linhaszero')
            })
            setTimeout(() => {
                setErro(null)
            }, 5000)
        }
    }
    function atualizarLinhas(e){
        setLinhas(parseInt(e.target.value===''?0:e.target.value));
    }
    function atualizarTabela(e){
        let id = e.target.id.split('-');
        let valor = parseInt(e.target.value===''?0:e.target.value);
        let xi = id[0];
        let i = parseInt(id[1])
        let tabela = tabelaSemIntervalo
        tabela[i+1][xi==='xi'?0:1] = valor;
        setTabela(tabela);
        if(parseInt(e.target.value)<0){
            e.target.value = 0;
        }
        let spl = e.target.id.split("-");
        if(Number(spl[1])>=linhas-1){
            if(spl[0]==='xi'){
                spl[0] = 'fi'
                spl[1] = 0
            } else {
                spl[0] = 'xi'
                spl[1] = 0
            }
        } else {
            spl[1] = parseInt(spl[1])+1
        }
        spl = spl.join('-')
        setCurrentInput(spl)
    }

    /**
     * @function carcularTabela Calcula a tabela de distribuição de frequência
     */
    function carcularTabela(){
        setTdf((new TabelaDeDistribuicao(tabelaSemIntervalo[0], tabelaSemIntervalo.slice(1))).formatar())
        setProcesso('calculando')
        setTimeout(() => {
            let opc = [
                [media, 'media'],
                [desvio_medio, 'desvio_medio'],
                [variancia, 'variancia'],
                [desvio_padrao, 'desvio_padrao'],
                [moda, 'moda'],
                [mediana, 'mediana'],
                [coeficiente_de_variacao, 'coeficiente_de_variacao'],
                [representacao, 'representacao']
            ]
            opc = (opc.map(opcao => {
                if(opcao[0]){
                    return <div className='tdf-resultado-informacao'>
                        <span>{t(`tdf.opcoes.${opcao[1]}`)}:</span> <b>{`${(typeof (new TabelaDeDistribuicao(tabelaSemIntervalo[0], tabelaSemIntervalo.slice(1))).formatar()[opcao[1]]==='string' ?(new TabelaDeDistribuicao(tabelaSemIntervalo[0], tabelaSemIntervalo.slice(1))).formatar()[opcao[1]]: ((new TabelaDeDistribuicao(tabelaSemIntervalo[0], tabelaSemIntervalo.slice(1))).formatar()[opcao[1]]+'').replace(".",','))}`}</b>
                    </div>
                } else {
                    return null;
                }
            })).filter(opcao => opcao!==null)
            setInformacoes(opc)
            setProcesso('resultado')
        }, 1000)
    }
    function mudarBooleano(key, e){
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
    function returnBack(){
        let backs = {
            informacao: 'informacao',
            tabela: 'informacao',
            calculando: 'tabela',
            resultado: 'tabela'
        }
        setProcesso(backs[processo]);
        if(processo==='tabela'){
            tabelaSemIntervalo = [
                ["xi", "fi"]
            ]
            setLinhasValor([]);
            setLinhas(0);
        }
    }

    return (
        <div className={`tdf-container theme-${Theme}`}>
            {processo!=='informacao' && 
            <div id='return-back'>
                <Button
                   text={<FontAwesomeIcon icon='arrow-left'/>}
                   color={'green'}
                   orient={'left'}
                   onClick={returnBack}
                />
            </div>
            }
            <div id='tabela-de-formulas' title={t('tdf.informacao.tabeladeformulas')}>
                <Button
                    color={'red'}
                    orient={'right'}
                    size={'normal'}
                    text={<FontAwesomeIcon icon={'book'} />}
                />
            </div>
            {processo==='informacao' && 
            <div className={`tdf-informacao`}>
                {erro!==null && <Alert type={erro.type} message={erro.text} />}
                <FormInputGroup 
                    inputStyle={Theme}
                    label={t('tdf.informacao.linhas')}
                    type={'number'}
                    onChange={atualizarLinhas}
                />
                <Button
                    color={'blue'}
                    onClick={criarLinhas}
                    orient={'center'}
                    size={'large'}
                    text={t('tdf.informacao.botao')}
                />
            </div>
            }
            {processo==='calculando' && <Loading/>}
            {processo==='tabela' &&
            <div className={`tdf-tabela`}>
               <table border={1}>
                    <thead>
                        <tr>
                            <th>xi</th>
                            <th>fi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhasValor}
                    </tbody>
               </table>
               <div id='tdf-options'>
                {opcoes}
               </div>
               <Button
                    color={'blue'}
                    orient={'center'}
                    size='large'
                    text={t('tdf.informacao.carcular')}
                    onClick={carcularTabela}
               />
            </div>
            }
            {processo==='resultado' &&
            <div className='tdf-resultado'>
                <table border={1}>
                    <thead>
                        {tdf.tabela[0].map((e, i) => {
                            return <th key={i}>{e}</th>
                        })}
                    </thead>
                    <tbody>
                        {tdf.tabela.slice(1).map((e, i) => {
                            return <tr key={i}>
                                {e.map((v, i) => {
                                    return <td key={i}><input value={(Number(v).toFixed(7)+'').replace('.', ',')} readOnly={true}/></td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
                {informacoes.length > 0 && <div className='tdf-resultado-informacoes'>{informacoes}</div>}
            </div>
            }
        </div>
    )
}

export default TabelasDeFrequencia;