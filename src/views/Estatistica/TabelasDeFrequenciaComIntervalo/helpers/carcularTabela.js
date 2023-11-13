import TabelaDeDistribuicaoComIntervalo from "../../../../classes/TabelaDeDistribuicaoComIntervalo";
function carcularTabela(setProcesso, linhasValor, setInformacoes, [media, desvio_medio, variancia, desvio_padrao, moda, mediana, coeficiente_de_variacao, representacao], setInfos, t, setFooter, setTabela_mediana, setTabelaSeparatrizes, fonte, set_coeficiente_de_curtose, set_barchart_data){
    setProcesso('calculando')
    let classes = linhasValor.map(e => e[0]);
    let intervalo = linhasValor.map(e => e[1]);
    let fi = linhasValor.map(e => e[2]);
    let tdf = new TabelaDeDistribuicaoComIntervalo({classes, intervalo, fi}).formatar();
    setTabelaSeparatrizes({
        quartil: tdf.separatrizes.quartil,
        percentil: tdf.separatrizes.percentil,
        decil: tdf.separatrizes.decil
    })
    let inf = [];
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
            <td><input value={(tdf.xi_vs_fi[i].toFixed(4)+'').replace(".", ",")??0} readOnly={true}/></td>
            <td><input value={(tdf.vs_desvio_medio[i].toFixed(4)+'').replace('.',',')??0} readOnly={true}/></td>
            <td><input value={(tdf.soma_para_variancia[i].toFixed(4)+'').replace('.',',')??0} readOnly={true}/></td>
        </tr>))
    }


    // Coeficiente de curtose
    let cdc = tdf.coeficiente_de_curtose;
    let coeficiente_de_curtose = (cdc.q[1]-cdc.q[0])/(cdc.p[1]-cdc.p[0]);
    let curva = "";
    if(coeficiente_de_curtose > 0.263){
        curva = "leptocurtica";
    }
    if(coeficiente_de_curtose < 0.263){
        curva = "platicurtica";
    }
    if(coeficiente_de_curtose === 0.263){
        curva = "mesocurtica";
    }
    set_coeficiente_de_curtose({
        curva,
        valor: coeficiente_de_curtose.toFixed(3)
    });
    ////////////////////////////////////////////////////////

    // Grafico de barras, com intervalos y fi
    let barchart = {
        intervalos: tdf.tabela.intervalo,
        fi: tdf.tabela.fi
    }
    set_barchart_data(barchart);
    ////////////////////////////////////////////

    setFooter((<thead>
        <tr>
            <th>{t('tdf.tabela.total')}</th>
            <th colSpan={3}></th>
            <th>{tdf.total_fi}</th>
            <th></th>
            <th>{tdf.total_fri}</th>
            <th></th>
            <th>{tdf.total_soma_xi_vs_fi}</th>
            <th>{tdf.soma_desvio_medio}</th>
            <th>{tdf.total_para_variancia}</th>
        </tr>
        <tr>
            <th>{t('tdf.tabela.fonte')}</th>
            <th colSpan={10}>{fonte}</th>
        </tr>
    </thead>))

    setTabela_mediana([
        <tr>
            <td>{t('tdf.tabela.posicao')}</td>
            <td>{(tdf.info_mediana.posicao.toFixed(4)+'').replace(".", ",")}</td>
        </tr>,
        <tr>
            <td>{t('tdf.tabela.linf')}</td>
            <td>{(tdf.info_mediana.linf.toFixed(4)+'').replace(".", ",")}</td>
        </tr>,
        <tr>
            <td>{t('tdf.tabela.fant')}</td>
            <td>{(tdf.info_mediana.fant.toFixed(4)+'').replace(".", ",")}</td>
        </tr>,
        <tr>
            <td>{t('tdf.tabela.fmediana')}</td>
            <td>{(tdf.info_mediana.fmediana.toFixed(4)+'').replace(".", ",")}</td>
        </tr>,
        <tr>
            <td>{t('tdf.tabela.h')}</td>
            <td>{(tdf.info_mediana.h.toFixed(4)+'').replace(".", ",")}</td>
        </tr>
    ])

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

export default carcularTabela;