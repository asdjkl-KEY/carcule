import { t } from '../configs/lang';

class TabelaDeDistribuicaoComIntervalo {
    constructor({classes, intervalo, fi }){
        this.cabecalhos = ["classe","intervalo","xi","fi","Fi","fri","FRi"]
        this.classes = classes
        this.lines = classes.length
        this.intervalo = intervalo
        this.fi = fi
        this.coeficiente_de_curtose = {
            p: [],
            q: []
        }
        this.#calcularxi();
        this.#calcularFi();
        this.#calcularfri();
        this.#calcularFRi();
        this.#calcularModaBruta();
        this.#calcularMediana();
        this.#calcularQuartil();
        this.#calcularPercentil();
        this.#calcularDecil();
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
        this.total_fri = total/total;
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
    separatrizes(i, separatriz){
        let posicao = (i, total) => (i*total)/separatriz;
        let total = this.fi.reduce((a,b) => a+b);
        let pos = posicao(i, total);
        let m_Fi = this.Fi.find(e => e >= pos)??0;
        let fant = this.Fi[this.Fi.indexOf(m_Fi)-1]??0;
        let inter = this.intervalo[this.Fi.indexOf(m_Fi)]??0;
        let minor = inter[0]??0;
        let fseparatriz = this.fi[this.Fi.indexOf(m_Fi)]??0;
        let h = inter[1]-inter[0]??0;
        let medida = minor + ((pos-fant)/fseparatriz)*h;
        return {
            medida,
            posicao: pos,
            fant,
            linf: minor,
            fseparatriz,
            h
        }
    }
    #calcularMediana(){
        let mediana = 0;
        // let total = this.fi.reduce((a,b) => a+b);
        // let pos = (total+1)/2;
        // let m_Fi = this.Fi.find(e => e >= pos);
        // let fant = this.Fi[this.Fi.indexOf(m_Fi)-1];
        // let inter = this.intervalo[this.Fi.indexOf(m_Fi)];
        // let minor = inter[0];
        // let fmediana = this.fi[this.Fi.indexOf(m_Fi)];
        // let h = inter[1]-inter[0];
        // mediana = minor + ((pos-fant)/fmediana)*h;
        let med = this.separatrizes(1, 2);
        mediana = med.medida;
        this.mediana = mediana;
        this.info_mediana = {
            posicao: med.posicao,
            linf: med.linf,
            fant: med.fant,
            fmediana: med.fseparatriz,
            h: med.h
        }
    }
    #calcularQuartil(){
        let quart = [];
        for(let i=1; i<5; i++){
            let sep = this.separatrizes(i, 4);
            quart.push({
                q: sep.medida,
                fant: sep.fant,
                linf: sep.linf,
                fquartil: sep.fseparatriz,
                h: sep.h,
                posicao: sep.posicao
            });
        }
        quart[quart.lenght-1] = {
            q: this.fi.reduce((a,b) => a+b),
        }
        this.quartil = quart;
        this.coeficiente_de_curtose.q = [quart[0].q, quart[2].q];
    }
    #calcularPercentil(){
        let percent = [];
        for(let i=1; i<101; i++){
            let perc = this.separatrizes(i, 100);
            percent.push({
                p: perc.medida,
                fant: perc.fant,
                linf: perc.linf,
                fpercentil: perc.fseparatriz,
                h: perc.h,
                posicao: perc.posicao
            });
        }
        this.percentil = percent;
        this.coeficiente_de_curtose.p = [percent[0].p, percent[89].p];
    }
    #calcularDecil(){
        let dec = [];
        for(let i=1; i<11; i++){
            let d = this.separatrizes(i, 10);
            dec.push({
                d: d.medida,
                fant: d.fant,
                linf: d.linf,
                fdecil: d.fseparatriz,
                h: d.h,
                posicao: d.posicao
            });
        }
        this.decil = dec;
    }
    #calcularMedia(){
        let soma = 0;
        let xi_vs_fi = [];
        this.fi.forEach((e, i) => {
            soma += e*this.xi[i];
            xi_vs_fi.push(e*this.xi[i]);
        });
        let total = this.fi.reduce((a,b) => a+b);
        this.total_fi = total;
        this.xi_vs_fi = xi_vs_fi;
        this.total_soma_xi_vs_fi = soma.toFixed(4);
        this.media = soma/total;
    }
    #calcularDesvioMedio(){
        let soma = 0;
        let vs_desvio_medio = [];
        this.fi.forEach((e, i) => {
            soma += e*Math.abs(this.xi[i]-this.media);
            vs_desvio_medio.push(e*Math.abs(this.xi[i]-this.media));
        });
        let total = this.fi.reduce((a,b) => a+b);
        this.desvio_medio = soma/total;
        this.soma_desvio_medio = soma.toFixed(4);
        this.vs_desvio_medio = vs_desvio_medio;
    }
    #calcularVariancia(){
        let soma = 0;
        let soma_para_variancia = [];
        this.fi.forEach((e, i) => {
            soma += e*Math.pow(this.xi[i]-this.media, 2);
            soma_para_variancia.push(e*Math.pow(this.xi[i]-this.media, 2));
        });
        let total = this.fi.reduce((a,b) => a+b);
        this.soma_para_variancia = soma_para_variancia;
        this.total_para_variancia = (soma_para_variancia.reduce((a,b) => a+b)).toFixed(4);
        this.variancia = soma/total;
    }
    #calcularDesvioPadrao(){
        this.desvio_padrao = Math.pow(this.variancia, 0.5);
    }
    #calcularCoeficienteDeVariacao(){
        this.coeficiente_de_variacao = (this.desvio_padrao/this.media)*100;
    }
    formatar(){
        let simetrica = false;
        if(this.media === this.mediana && this.mediana === this.moda){
            simetrica = true;
        };
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
            simetrica,
            media: this.media,
            mediana: this.mediana,
            moda: this.moda,
            desvio_medio: this.desvio_medio,
            variancia: this.variancia,
            desvio_padrao: this.desvio_padrao,
            coeficiente_de_variacao: this.coeficiente_de_variacao,
            representacao: this.coeficiente_de_variacao <= 30 ? t('tdf.opcoes.represent.bom'):t('tdf.opcoes.represent.ruim'),
            total_fi: this.total_fi,
            total_fri: this.total_fri,
            total_soma_xi_vs_fi: this.total_soma_xi_vs_fi,
            soma_desvio_medio: this.soma_desvio_medio,
            total_para_variancia: this.total_para_variancia,
            xi_vs_fi: this.xi_vs_fi,
            vs_desvio_medio: this.vs_desvio_medio,
            soma_para_variancia: this.soma_para_variancia,
            info_mediana: this.info_mediana,
            separatrizes: {
                quartil: this.quartil,
                percentil: this.percentil,
                decil: this.decil
            },
            coeficiente_de_curtose: this.coeficiente_de_curtose
        }
        return dados;
    }
}

export default TabelaDeDistribuicaoComIntervalo;