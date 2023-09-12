import { t } from "../configs/lang";

class TabelaDeDistribuicao {
    /** 
    * @param {identificadores} Array de identificadores das colunas
    * @param {datos_de_linhas} Array com os dados de cada linha
    * 
    * @var {tabela} Array com os dados da tabela
    * @var {media} Média da tabela
    * @var {desvio_medio} Desvio médio da tabela
    * @var {variancia} Variância da tabela
    * @var {desvio_padrao} Desvio padrão da tabela
    * @var {moda} Moda da tabela
    * @var {mediana} Mediana da tabela
    * @var {coeficiente_de_variacao} Coeficiente de variação da tabela
    */
    constructor(identificadores, datos_de_linhas){
        this.tabela = [
            identificadores,
        ].concat(datos_de_linhas)
        if(identificadores.length > datos_de_linhas[0].length){
            let diferenca = identificadores.length - datos_de_linhas[0].length;
            let linha = [];
            for(let i = 0; i < diferenca; i++){
                linha[i] = 0;
            }
            for(let i in this.tabela.slice(1)){
                this.tabela[i+1] = this.tabela[i+1].concat(linha);
            }
        }
            try {
              this.calcularFi();
            } catch (error) {
              console.error("Error en la función calcularFi: " + error.message);
            }
          
            try {
              this.calcularfri();
            } catch (error) {
              console.error("Error en la función calcularfri: " + error.message);
            }
          
            try {
              this.calcularFRi();
            } catch (error) {
              console.error("Error en la función calcularFRi: " + error.message);
            }
          
            try {
              this.calcularMedia();
            } catch (error) {
              console.error("Error en la función calcularMedia: " + error.message);
            }
          
            try {
              this.calcularDesvioMedio();
            } catch (error) {
              console.error("Error en la función calcularDesvioMedio: " + error.message);
            }
          
            try {
              this.calcularVariancia();
            } catch (error) {
              console.error("Error en la función calcularVariancia: " + error.message);
            }
          
            try {
              this.calcularModa();
            } catch (error) {
              console.error("Error en la función calcularModa: " + error.message);
            }
          
            try {
              this.calcularMediana();
            } catch (error) {
              console.error("Error en la función calcularMediana: " + error.message);
            }
          
            try {
              this.calcularCoeficienteDeVariacao();
            } catch (error) {
              console.error("Error en la función calcularCoeficienteDeVariacao: " + error.message);
            }
    }
    coluna(identificador){
        let identificadores = this.tabela[0];
        let Coluna = [];
        let tabela = this.tabela.slice(1);
        identificadores.forEach((e, i) => {
            if(e===identificador){
                for(let j in tabela){
                    Coluna.push(tabela[j][i]);
                }
            }
        })
        return Coluna;
    }
    linha(numero){
        return this.tabela[numero];
    }
    colocarColuna(identificador, coluna){
        let identificadores = this.tabela[0];
        if(!identificadores.includes(identificador)){
            this.tabela[0].push(identificador);
        }
        let i = identificadores.indexOf(identificador);
        let tabela = this.tabela.slice(1);
        for(let j in tabela){
            tabela[j][i] = coluna[j];
        }
    }
    colocarLinha(numero, linha){
        this.tabela[numero] = linha;
    }
    somarColuna(identificador){
        if(Array.isArray(identificador)){
            let soma = 0;
            for(let i in identificador){
                soma += this.somarColuna(identificador[i]);
            }
            return soma;
        }
        let coluna = this.coluna(identificador);
        let soma = 0;
        for(let i in coluna){
            soma += coluna[i];
        }
        return soma;
    }
    calcularFi(){
        let fi = this.coluna("fi");
        let Fi = [];
        for(let i=0; i<fi.length; i++){
            if(i===0){
                Fi.push(fi[i]);
            } else {
                Fi.push(fi[i] + Fi[i-1]);
            }
        }
        this.colocarColuna("Fi", Fi);
    }
    calcularfri(){
        let fi = this.coluna("fi");
        let fri = [];
        for(let i in fi){
            fri.push(fi[i]/this.somarColuna("fi"));
        }
        this.colocarColuna("fri", fri);
    }
    calcularFRi(){
        let Fi = this.coluna("Fi");
        let FRi = [];
        for(let i in Fi){
            FRi.push(Fi[i]/this.somarColuna("fi"));
        }
        this.colocarColuna("FRi", FRi);
    }
    calcularMedia(){
        let xi = this.coluna("xi");
        let fi = this.coluna("fi");
        let xi_fi = [];
        for(let i = 0; i < xi.length; i++){
            xi_fi.push(xi[i]*fi[i]);
        }
        let soma = xi_fi.reduce((a, b) => a + b, 0);
        let media = soma/(this.somarColuna("fi"));
        this.media = media.toFixed(2);
    }
    calcularDesvioMedio(){
        let xi = this.coluna("xi");
        let media = this.media;
        let fi = this.coluna("fi");
        let total = this.somarColuna("fi");
        let xi_media = [];
        for(let i in xi){
            xi_media.push(Math.abs(xi[i] - media));
        }
        let xi_media_fi = [];
        for(let i in xi_media){
            xi_media_fi.push(xi_media[i]*fi[i]);
        }
        let soma = xi_media_fi.reduce((a, b) => a + b, 0);
        let desvio_medio = soma/total;
        this.desvio_medio = desvio_medio.toFixed(2);
    }
    calcularVariancia(){
        let xi = this.coluna('xi');
        let media = this.media;
        let fi = this.coluna('fi');
        let total = this.somarColuna('fi')-1;
        let xi_media = [];
        for(let i in xi){
            xi_media.push((xi[i] - media)**2);
        }
        let xi_media_fi = [];
        for(let i in xi_media){
            xi_media_fi.push(xi_media[i]*fi[i]);
        }
        let soma = xi_media_fi.reduce((a, b) => a + b, 0);
        let variancia = soma/total;
        this.variancia = variancia.toFixed(4);
        this.desvio_padrao = (variancia**(1/2)).toFixed(4)
    }
    calcularModa(){
        let fi = this.coluna('fi');
        let xi = this.coluna('xi');
        let maior = Math.max(...fi);
        let moda = []; 
        for(let i in fi){
            if(fi[i]===maior){
                moda.push(xi[i]);
            }
        }
        if(moda.length===1){
            this.moda = moda[0];
        } else {
            moda = moda.join(", ");
            this.moda = moda;
        }
    }
    calcularMediana(){
        let n = this.somarColuna("fi");
        let mediana = 0
        let Fi = this.coluna("Fi");
        let xi = this.coluna("xi");
        if(n%2===0){
            let pos = (n+1)/2;
            let Fi_pos = Fi.find(e => e >= pos);
            let pos_Fi_pos = Fi.indexOf(Fi_pos);
            let xi_pos = xi[pos_Fi_pos];
            let xi_pos_anterior = xi[pos_Fi_pos-1];
            mediana = (xi_pos + xi_pos_anterior)/2;
        } else {
            let pos = (n+1)/2;
            let Fi_pos = Fi.find(e => e >= pos);
            let pos_Fi_pos = Fi.indexOf(Fi_pos);
            mediana = xi[pos_Fi_pos];
        }
        this.mediana = mediana
    }
    calcularCoeficienteDeVariacao(){
        let media = this.media;
        let desvio_padrao = this.desvio_padrao;
        let coeficiente_de_variacao = (desvio_padrao/media)*100;
        this.coeficiente_de_variacao = coeficiente_de_variacao.toFixed(4);
    }
    update(){
        this.calcularFi();
        this.calcularfri();
        this.calcularFRi();
        this.calcularMedia();
        this.calcularDesvioMedio();
        this.calcularVariancia();
        this.calcularModa();
        this.calcularMediana();
        this.calcularCoeficienteDeVariacao();
    }
    formatar(){
        let tabela = this.tabela;
        let dados = {
            tabela: tabela,
            media: this.media,
            desvio_medio: this.desvio_medio,
            variancia: this.variancia,
            desvio_padrao: this.desvio_padrao,
            moda: this.moda,
            mediana: this.mediana,
            coeficiente_de_variacao: this.coeficiente_de_variacao
        }
        if(dados.coeficiente_de_variacao<=30){
            dados.representacao = t('tdf.opcoes.represent.bom')
        } else {
            dados.representacao = t('tdf.opcoes.represent.ruim')
        }
        return dados;
    }
}

export default TabelaDeDistribuicao;