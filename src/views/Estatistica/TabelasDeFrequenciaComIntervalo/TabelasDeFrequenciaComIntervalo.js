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
import TextAreaGroup from '../../../components/TextAreaGroup/TextAreaGroup';
import CurveChart from '../../../components/CurveChart/CurveChart';
import ChartBar from '../../../components/ChartBar/ChartBar';

//FUNÇÕES
import mudarBooleano from './helpers/mudarBooleano';
import mudarValor from './helpers/mudarValor';
import criarTabela from './helpers/criarTabela';
import carcularTabela from './helpers/carcularTabela';
import returnBack from './helpers/returnBack';
import criarTabelaComValores from './helpers/criarTabelaComValores';
import updateSeparatriz from './helpers/updateSeparatriz';

const TabelasDeFrequenciaComIntervalo = ({classes, intervalos, fi}) => {
    let [processo, setProcesso] = useState('informacao');
    let [linhas, setLinhas] = useState(0);
    let [linhasValor, setLinhasValor] = useState([]);
    let [message, setMessage] = useState(null)
    let [tabelaBody, setTabelaBody] = useState([])
    let [informacoes, setInformacoes] = useState([])
    let [infos, setInfos] = useState([])
    let [input, setInput] = useState(null);
    let [textoarea, setTextoarea] = useState('');
    let [footer, setFooter] = useState(<theaad></theaad>)
    let [tabela_mediana, setTabela_mediana] = useState([])
    let [tabelaSeparatrizes, setTabelaSeparatrizes] = useState(null);
    let  [quartil, setQuartil] = useState(0);
    let [percentil, setPercentil] = useState(0);
    let [decil, setDecil] = useState(0);
    let [fonte, setFonte] = useState("ISAI S.A. - 2023");
    let [coeficiente_de_curtose, set_coeficiente_de_curtose] = useState({valor: 0, curva: ''});
    let [barchart_data, set_barchart_data] = useState({intervalos: [], fi: []});
    

    if(classes && intervalos && fi){
        setLinhas(classes.lenght);
        criarTabela(linhas, setMessage, linhasValor, setLinhasValor, selectInput, mudarValor, setInput, setTabelaBody, setProcesso, t, intervalos, fi)
    }

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
            <BooleanInput dft={true} key={opcao[1]} value={opcao[0]} func={(e) => {let key = `${opcao[1]}`; mudarBooleano(key, e, [setMedia, setDesvioMedio,setVariancia,setDesvioPadrao,setModa,setMediana,setCoeficienteDeVariacao,setRepresentacao], media);}} />
        </div>
    })
    // Elemento JSX
    return(
        <div className={`tdf-container theme-${Theme}`}>
            {processo!=='informacao' && 
            <div id='return-back'>
                <Button
                   text={<FontAwesomeIcon icon='arrow-left'/>}
                   color={'blue'}
                   orient={'left'}
                   onClick={() => { returnBack(processo, setProcesso, setLinhasValor, setTabelaBody, setLinhas) }}
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
                    onClick={() => { criarTabela(linhas, setMessage, linhasValor, setLinhasValor, selectInput, mudarValor, setInput, setTabelaBody, setProcesso, t) }}
                />
                <Button
                    color={'green'}
                    orient={'center'}
                    size={'large'}
                    text={t('tdf.informacao.botao2')}
                    onClick={() => { setProcesso('informacao2') }}
                />
            </div>
            }
            {
                processo === 'informacao2' && 
                <div className={`tdf-informacao2`}>
                    <TextAreaGroup 
                        id={'informacao2'}
                        label={t('tdf.informacao.label')}
                        readOnly={false}
                        type={'expanded'}
                        func={(e) => { setTextoarea(e.target.value.trim()) }}
                        placeHolder={'1 2 3 4 5 6 7 8 9'}
                    />
                    <Button
                        color={'green'}
                        orient={'center'}
                        size={'large'}
                        text={t('tdf.informacao.botao3')}
                        onClick={(e) => { criarTabelaComValores(textoarea, [setMessage, linhasValor, setLinhasValor, selectInput, mudarValor, setInput, setTabelaBody, setProcesso, t]) }}
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
                        onClick={() => { carcularTabela(setProcesso, linhasValor, setInformacoes, [media, desvio_medio, variancia, desvio_padrao, moda, mediana, coeficiente_de_variacao, representacao], setInfos, t, setFooter, setTabela_mediana, setTabelaSeparatrizes, fonte, set_coeficiente_de_curtose, set_barchart_data)}}
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
                            <th>{t('tdf.tabela.xivsfi')}</th>
                            <th>{t('tdf.tabela.somaparadesviomedio')}</th>
                            <th>{t('tdf.tabela.somaparavariancia')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {informacoes}
                    </tbody>
                    {footer}
                </table>
                <table border={1}>
                    <thead>
                        <tr>
                            <th colSpan={2}>{t('tdf.opcoes.mediana')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabela_mediana}
                    </tbody>
                </table>
                <div className='separatrizes'>
                    <FormInputGroup
                        inputStyle={'light'}
                        label={t('tdf.separatrizes.quartil')}
                        labelOrient={'center'}
                        name={'quartil'}
                        type={'number'}
                        value={''}
                        onChange={(e) => { updateSeparatriz(e, setQuartil)}}
                        textAlign={'center'}
                    />
                    <FormInputGroup
                        inputStyle={'light'}
                        label={t('tdf.separatrizes.percentil')}
                        labelOrient={'center'}
                        name={'percentil'}
                        type={'number'}
                        value={''}
                        onChange={(e) => { updateSeparatriz(e, setPercentil)}}
                        textAlign={'center'}
                    />
                    <FormInputGroup
                        inputStyle={'light'}
                        label={t('tdf.separatrizes.decil')}
                        labelOrient={'center'}
                        name={'decil'}
                        type={'number'}
                        value={''}
                        onChange={(e) => { updateSeparatriz(e, setDecil)}}
                        textAlign={'center'}
                    />
                </div>
                <div className='separatrizes'>
                    <div>
                        { quartil>0 && quartil<4 &&
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th colSpan={2}>{t('tdf.separatrizes.quartil')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{t('tdf.tabela.posicao')}</td>
                                    <td>{tabelaSeparatrizes.quartil[quartil-1].posicao}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.fant')}</td>
                                    <td>{tabelaSeparatrizes.quartil[quartil-1].fant}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.linf')}</td>
                                    <td>{tabelaSeparatrizes.quartil[quartil-1].linf}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.fquartil')}</td>
                                    <td>{tabelaSeparatrizes.quartil[quartil-1].fquartil}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.h')}</td>
                                    <td>{tabelaSeparatrizes.quartil[quartil-1].h}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{tabelaSeparatrizes.quartil[quartil-1].q.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                    </div>
                    <div>
                        { percentil>0 && percentil<100 &&
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th colSpan={2}>{t('tdf.separatrizes.percentil')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{t('tdf.tabela.posicao')}</td>
                                    <td>{tabelaSeparatrizes.percentil[percentil-1].posicao}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.fant')}</td>
                                    <td>{tabelaSeparatrizes.percentil[percentil-1].fant}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.linf')}</td>
                                    <td>{tabelaSeparatrizes.percentil[percentil-1].linf}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.fpercentil')}</td>
                                    <td>{tabelaSeparatrizes.percentil[percentil-1].fpercentil}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.h')}</td>
                                    <td>{tabelaSeparatrizes.percentil[percentil-1].h}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{tabelaSeparatrizes.percentil[percentil-1].p.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                    </div>
                    <div>
                        { decil>0 && decil<10 &&
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th colSpan={2}>{t('tdf.separatrizes.decil')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{t('tdf.tabela.posicao')}</td>
                                    <td>{tabelaSeparatrizes.decil[decil-1].posicao}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.fant')}</td>
                                    <td>{tabelaSeparatrizes.decil[decil-1].fant}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.linf')}</td>
                                    <td>{tabelaSeparatrizes.decil[decil-1].linf}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.fdecil')}</td>
                                    <td>{tabelaSeparatrizes.decil[decil-1].fdecil}</td>
                                </tr>
                                <tr>
                                    <td>{t('tdf.tabela.h')}</td>
                                    <td>{tabelaSeparatrizes.decil[decil-1].h}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{tabelaSeparatrizes.decil[decil-1].d.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
                {infos.length > 0 && <div className='tdf-resultado-informacoes'>{infos}</div>}
                <div style={{display: 'flex'}}>
                    <CurveChart curva={coeficiente_de_curtose.curva} valor={coeficiente_de_curtose.valor} />
                    <ChartBar intervalos={barchart_data.intervalos} frecuencia_absoluta={barchart_data.fi} />
                </div>
            </div>
            }
        </div>
    )
}

export default TabelasDeFrequenciaComIntervalo;