// import TabelaDeDistribuicaoComIntervalo from './TabelaDeDistribuicaoComIntervalo.js';
function contar(valor, array){
    return  (array.filter(v => v === valor)).length;
}

class GeradorDeTabelaComIntervalo {
    constructor(lista) {
        lista = this.avaliarValores(lista);
        this.lista = lista.sort((a, b) => a - b);
        this.n = this.lista.length;
        this.calcular_nk();
        this.calcular_amplitude_total();
        this.calcular_intervalo_de_classe();
        this.formatar();
    }
    avaliarValores(texto){
        // let reg_number_only = /[0-9]*$/;
        let lista = texto.split(' ');
        lista.forEach((valor, index) => {
            if(isNaN(Number(valor.trim()))){
                return [false, "A lista contem valores não numéricos."]
            } else {
                if(valor.includes(",")){
                    valor = valor.replace(",", ".");
                }
                lista[index] = Number(valor);
            }
        })
        return lista;
    }
    calcular_nk(){
        let n = this.n;
        let nk = 1+(3,3*(Math.log10(n)));
        this.nk = Math.ceil(nk);
    }
    calcular_amplitude_total(){
        let max = Math.max(...this.lista);
        let min = Math.min(...this.lista);
        // at = Amplitude total
        this.at = max - min;
    }
    calcular_intervalo_de_classe(){
        let at = this.at;
        let nk = this.nk;
        let h = at/nk;
        this.h = Math.ceil(h);
    }
    formatar(){
        let classes = [];
        let intervalos = [];
        let fi = [];
        let min = Math.min(...this.lista);
        for(let i=1; i<this.nk+1; i++){
            classes.push(i);
            intervalos.push([min, min+this.h]);
            min += this.h;
            fi.push(0)
        }
        let lista = this.lista;
        let c = 0;
        while(lista.length > 0){
            let valor = lista[c];
            let vezes = contar(valor, lista);
            lista = lista.filter(v => v !== valor)
            intervalos.forEach((intervalo, index) => {
                if(valor >= intervalo[0] && valor < intervalo[1]){
                    fi[index] += vezes;
                }
            })
        }
        let dados = {
            intervalos,
            fi,
            classes
        }
        return dados;
    }
}

export default GeradorDeTabelaComIntervalo;