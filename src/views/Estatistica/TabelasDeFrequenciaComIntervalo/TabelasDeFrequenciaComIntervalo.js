import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from '../../../configs/lang';
import { Theme } from '../../../configs/settings';
import './TabelasDeFrequenciaComIntervalo.css';

//componentes
import FormInputGroup from '../../../components/FormInputGroup/FormInputGroup';
import Button from '../../../components/Button/Button';
import Alert from '../../../components/Alert/Alert';
import BooleanInput from '../../../components/BooleanInput/BooleanInput';
import Loading from '../../../components/Loading/Loading';

import TabelaDeDistribuicaoComIntervalo from '../../../classes/TabelaDeDistribuicaoComIntervalo';

const TabelasDeFrequenciaComIntervalo = () => {
    let [processo, setProcesso] = useState('informacao');
    let [linhas, setLinhas] = useState(0);
    let [linhasValor, setLinhasValor] = useState([]);
    let [message, setMessage] = useState(null)
    let [tabelaBody, setTabelaBody] = useState([])
    let [informacoes, setInformacoes] = useState([])
    let [infos, setInfos] = useState([])
    let [input, setInput] = useState(null);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' && input){
                e.preventDefault();
                let id = input.split('-');
                let [coluna, linha] = [id[0], +id[1]]
                let nexts = {
                    classe: 'intervalomenor',
                    intervalomenor: 'intervalormaior',
                    intervalormaior: 'fi',
                    fi: 'classe'
                }
                if(linha+1 < linhas){
                    document.getElementById(`${coluna}-${linha+1}`).focus();
                } else {
                    document.getElementById(`${nexts[coluna]}-0`).focus();
                }
            }
        })
        return (() => {
            document.removeEventListener('keydown', (e)=>{});
        })
    }, [input, setInput, linhas])

    function selectInput(e){
        document.getElementById(e.target.id).select();
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

    function mudarValor(e){
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

    function criarTabela(){
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
                linesValue.push([i, [0, 0], 0])
            }
            linhasValor = linesValue;
            setLinhasValor(linhasValor);
            linesValue = linesValue.map((e, i) => {
                return <tr>
                    <td key={`classe-${i}`}><input onFocus={selectInput} id={`classe-${i}`} onChange={mudarValor} type='number' defaultValue={linhasValor[i][0]}/></td>
                    <td key={`intervalomenor-${i}`}><input onFocus={selectInput} id={`intervalomenor-${i}`} onChange={mudarValor} type='number' defaultValue={linhasValor[i][1][0]}/></td>
                    <td key={`intervalormaior-${i}`}><input onFocus={selectInput} id={`intervalormaior-${i}`} onChange={mudarValor} type='number' defaultValue={linhasValor[i][1][1]}/></td>
                    <td key={`fi-${i}`}><input onFocus={selectInput} id={`fi-${i}`} onChange={mudarValor} type='number' defaultValue={linhasValor[i][2]}/></td>
                </tr>
            });
            setTabelaBody(linesValue);
            setProcesso('tabela')
        }
    }

    function carcularTabela(){
        setProcesso('calculando')
        let classes = linhasValor.map(e => e[0]);
        let intervalo = linhasValor.map(e => e[1]);
        let fi = linhasValor.map(e => e[2]);
        let tdf = new TabelaDeDistribuicaoComIntervalo({classes, intervalo, fi}).formatar();
        let inf = []
        for(let i=0; i<tdf.lines; i++){
            inf.push((<tr>
                <td><input value={tdf.tabela.classes[i]} readOnly={true}/></td>
                <td><input value={(tdf.tabela.intervalo[i][0].toFixed(4)+'').replace(".", ',')} readOnly={true}/></td>
                <td><input value={(tdf.tabela.intervalo[i][1].toFixed(4)+'').replace(".", ',')} readOnly={true}/></td>
                <td><input value={(tdf.tabela.xi[i].toFixed(4)+'').replace(".", ',')} readOnly={true}/></td>
                <td><input value={(tdf.tabela.fi[i].toFixed(4)+'').replace(".", ',')} readOnly={true}/></td>
                <td><input value={(tdf.tabela.Fi[i].toFixed(4)+'').replace(".", ',')} readOnly={true}/></td>
                <td><input value={(tdf.tabela.fri[i].toFixed(4)+'').replace(".", ',')} readOnly={true}/></td>
                <td><input value={(tdf.tabela.FRi[i].toFixed(4)+'').replace(".", ',')} readOnly={true}/></td>
            </tr>))
        }
        setInformacoes(inf);
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
                        <span>{t(`tdf.opcoes.${opcao[1]}`)}:</span> <b>{`${typeof tdf[opcao[1]]==='number'?(tdf[opcao[1]].toFixed(4)+'').replace(".", ','):tdf[opcao[1]]}`}</b>
                    </div>
                } else {
                    return null;
                }
            })).filter(opcao => opcao!==null)
            setInfos(opc)
        setTimeout(() => {
            setProcesso('resultado')
        }, 1000)
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
            setLinhasValor([]);
            setTabelaBody([]);
            setLinhas(0);
        }
    }

    return(
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
            {processo === 'informacao' && 
            <div className={'tdf-informacao'}>
                {message && <Alert message={message.content} type={message.type} />}
                <FormInputGroup
                    label={t('tdf.informacao.linhas')}
                    inputStyle={Theme}
                    type='number'
                    value={''}
                    onChange={(e) => setLinhas(parseInt(e.target.value))}
                    labelOrient={'center'}
                />
                <Button
                    color={'blue'}
                    orient={'center'}
                    size='large'
                    text={t('tdf.informacao.botao')}
                    onClick={criarTabela}
                />
            </div>
            }
            {processo === 'calculando' && <Loading message={t('loading.carculando')}/>}
            {
                processo === 'tabela' && 
                <div className='tdf-tabela'>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>{t('tdf.tabela.classe')}</th>
                                <th colSpan={2}>{t('tdf.tabela.intervalo')}</th>
                                <th>{t('tdf.tabela.fi')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabelaBody}
                        </tbody>
                    </table>
                    <div className='tdf-options'>
                        {opcoes}
                    </div>
                    <Button
                        color={'blue'}
                        text={t('tdf.informacao.carcular')}
                        orient={'center'}
                        size={'large'}
                        onClick={carcularTabela}
                    />
                </div>
            }
            {processo==='resultado' &&
            <div className='tdf-resultado com-intervalo'>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>{t('tdf.tabela.classe')}</th>
                            <th colSpan={2}>{t('tdf.tabela.intervalo')}</th>
                            <th>{t('tdf.tabela.xi')}</th>
                            <th>{t('tdf.tabela.fi')}</th>
                            <th>{t('tdf.tabela.Fi')}</th>
                            <th>{t('tdf.tabela.fri')}</th>
                            <th>{t('tdf.tabela.FRi')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {informacoes}
                    </tbody>
                </table>
                {infos.length > 0 && <div className='tdf-resultado-informacoes'>{infos}</div>}
            </div>
            }
        </div>
    )
}

export default TabelasDeFrequenciaComIntervalo;