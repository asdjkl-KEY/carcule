import React, { useState } from 'react';
import { Theme } from '../configs/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style/Dashboard.css'

import SideBarMenu from '../components/SideBarMenu/SideBarMenu';
import Toggle from '../components/Toggle/Toggle';
import Modal from '../components/Modal/Modal';


import TabelaDeFormulas from './TabelaDeFormulas'
//views
import Matrizes from '../views/Matrizes/Matrizes';
import Estatistica from '../views/Estatistica/Estatistica';
  //SubViews
    import TabelasDeFrequencia from '../views/Estatistica/TabelasDeFrequencia/TabelasDeFrequencia';
    import TabelasDeFrequenciaComIntervalo from '../views/Estatistica/TabelasDeFrequenciaComIntervalo/TabelasDeFrequenciaComIntervalo';
    import { t } from '../configs/lang';

const Dashboard = () => {
    if(!localStorage.getItem('dashboard.menu')) localStorage.setItem('dashboard.menu', 'main-window');
    let [menu, setMenu] = useState(localStorage.getItem('dashboard.menu'));
    let [menuOpen, setMenuOpen] = useState(false);

    function handleSet(e){
        setMenu(e.target.id);
        localStorage.setItem('dashboard.menu', e.target.id);
    }
    function toggleMenu(isopen){
        setMenuOpen(isopen);
    }
    const MenuItems = [
        {
            icon: 'table-cells',
            label: 'matrizes'
        },
        {
            icon: 'chart-simple',
            label: 'estatistica'
        },
        {
            icon: 'gears',
            label: 'configuracoes'
        }
    ];
    return (
        <div className={`container-grid animate container-theme-${Theme??'light'}`}>
            <Toggle func={toggleMenu}/>
            <SideBarMenu items={MenuItems} func={handleSet} open={menuOpen}/>
            <Modal content={<TabelaDeFormulas/>} modalId={'modal-tabela-de-formulas'} />
            {menu==='matrizes' && <Matrizes />}
            {menu==='estatistica' && <Estatistica />}
            {menu==='estatistica.tabelas_de_frequencia' && <TabelasDeFrequencia />}
            {menu==='estatistica.tabelas_com_intervalo' && <TabelasDeFrequenciaComIntervalo />}
            {menu==='estatistica.tabelas_com_intervalo' && <TabelasDeFrequenciaComIntervalo />}
            {menu==='main-window' && 
            <div id='main-window'>
                <FontAwesomeIcon icon={'calculator'} />
                <h1>
                    {t('appname')}
                </h1>
            </div>
            }
        </div>
    )
}

export default Dashboard;