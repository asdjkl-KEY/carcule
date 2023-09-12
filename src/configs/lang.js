import en from '../translations/en.js';
import es from '../translations/es.js';
import pt from '../translations/pt.js';

const CurrentLang = localStorage.getItem('default_language') || 'en';

const resources = {
    en,es,pt
}

export const t = (text)=>{
    let translate = resources[CurrentLang].translation;
    let txt = text.split(".");
    for(let tx of txt){
        translate = translate[tx];
    }
    return translate;
}