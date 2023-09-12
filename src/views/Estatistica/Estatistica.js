import React from 'react';
import './Estatistica.css';
import { Theme } from '../../configs/settings';
import { t } from '../../configs/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components

const conteudos = [
    {
        id: 1,
        name: t('estatistica.conteudos.tabelasdefrequencia'),
        component: 'tabelas_de_frequencia'
    },
    {
        id: 2,
        name: t('estatistica.conteudos.tabelascomintervalo'),
        component: 'tabelas_com_intervalo'
    }
]

const Estatistica = () => {

    function selecionarConteudo(e){
        let component = e.target.id;
        console.log(component); // TODO: remover esse console.log
        localStorage.setItem('dashboard.menu', 'estatistica.'+component);
        localStorage.setItem('tdf.processo', 'informacao')
        window.location.reload();
    }
    return (
        <div className={`estatistica-container theme-${Theme??'light'}`}>
            <div id='estatistica-header'>
                <h1>{t('estatistica.escolhaoconteudo')}</h1>
            </div>
            <div id='estatistica-body'>
                {conteudos.map((conteudo, index) => {
                    return (
                        <div onClick={selecionarConteudo} key={index} id={conteudo.component} className={`animate estatistica-item theme-${Theme??'light'}`}>
                            <div className='estatistica-item-header'>
                                <h3>{conteudo.name}</h3>
                            </div>
                            <div className='estatistica-item-icon'>
                                <FontAwesomeIcon icon='book' />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Estatistica;