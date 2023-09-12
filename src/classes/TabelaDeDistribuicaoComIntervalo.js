import { t } from '../configs/lang';

class TabelaDeDistribuicaoComIntervalo {
    constructor({classes, intervalo, fi }){
        this.cabecalhos = ["classe","intervalo","xi","fi","Fi","fri","FRi"]
        this.classes = classes
        this.lines = classes.length
        this.intervalo = intervalo
        this.fi = fi
        this.#calcularxi();
        this.#calcularFi();
        this.#calcularfri();
        this.#calcularFRi();
        this.#calcularModaBruta();
        this.#calcularMediana();
        this.#calcularMedia();
        this.#calcularDesvioMedio();
        this.#calcularVariancia();
        this.#calcularDesvioPadrao();
        this.#calcularCoeficienteDeVariacao();
    }
    #calcularxi(){
        this.xi = [];
        this.intervalo.forEach(e => {
            this.xi.push((e[0]+e[1])/2)
        });
    }
    #calcularFi(){
        this.Fi = [];
        let soma = 0;
        this.fi.forEach(e => {
            soma += e;
            this.Fi.push(soma);
        })
    }
    #calcularfri(){
        let total = this.fi.reduce((a,b) => a+b);
        this.fri = [];
        this.fi.forEach(e => {
            this.fri.push(e/total);
        })
    }
    #calcularFRi(){
        this.FRi = [];
        let soma = 0;
        this.fri.forEach(e => {
            soma += e;
            this.FRi.push(soma);
        })
    }
    #calcularModaBruta(){
        let maior = Math.max(...this.fi);
        let moda = [];
        this.fi.forEach((e, i) => {
            if(e === maior){
                moda.push(`${this.xi[i]}`)
            }
        });
        this.moda = moda.join(', ');
    }
    #calcularMediana(){
        let mediana = 0;
        let total = this.fi.reduce((a,b) => a+b);
        let pos = (total+1)/2;
        let m_Fi = this.Fi.find(e => e >= pos);
        let fant = this.Fi[this.Fi.indexOf(m_Fi)-1];
        let inter = this.intervalo[this.Fi.indexOf(m_Fi)];
        let minor = inter[0];
        let fmediana = this.fi[this.Fi.indexOf(m_Fi)];
        let h = inter[1]-inter[0];
        mediana = minor + ((pos-fant)/fmediana)*h;
        this.mediana = mediana;
    }
    #calcularMedia(){
        let soma = 0;
        this.fi.forEach((e, i) => {
            soma += e*this.xi[i];
        });
        let total = this.fi.reduce((a,b) => a+b);
        this.media = soma/total;
    }
    #calcularDesvioMedio(){
        let soma = 0;
        this.fi.forEach((e, i) => {
            soma += e*Math.abs(this.xi[i]-this.media);
        });
        let total = this.fi.reduce((a,b) => a+b);
        this.desvio_medio = soma/total;
    }
    #calcularVariancia(){
        let soma = 0;
        this.fi.forEach((e, i) => {
            soma += e*Math.pow(this.xi[i]-this.media, 2);
        });
        let total = this.fi.reduce((a,b) => a+b);
        this.variancia = soma/total;
    }
    #calcularDesvioPadrao(){
        this.desvio_padrao = Math.pow(this.variancia, 0.5);
    }
    #calcularCoeficienteDeVariacao(){
        this.coeficiente_de_variacao = (this.desvio_padrao/this.media)*100;
    }
    formatar(){
        let dados = {
            lines: this.lines,
            tabela: {
                cabecalhos: this.cabecalhos,
                classes: this.classes,
                intervalo: this.intervalo,
                xi: this.xi,
                fi: this.fi,
                Fi: this.Fi,
                fri: this.fri,
                FRi: this.FRi
            },
            media: this.media,
            mediana: this.mediana,
            moda: this.moda,
            desvio_medio: this.desvio_medio,
            variancia: this.variancia,
            desvio_padrao: this.desvio_padrao,
            coeficiente_de_variacao: this.coeficiente_de_variacao,
            representacao: this.coeficiente_de_variacao <= 30 ? t('tdf.opcoes.represent.bom'):t('tdf.opcoes.represent.ruim')
        }
        return dados;
    }
}

export default TabelaDeDistribuicaoComIntervalo;