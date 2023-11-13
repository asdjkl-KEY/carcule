const portuguese = {
    translation: {
        appname: 'Carcule',
        proximamente: 'Em breve...',
        //MENÚ
        menu: {
            matrizes: 'Matrizes',
            estatistica: 'Estatística',
            configuracoes: 'Configurações',
        },
        estatistica: {
            conteudos: {
                tabelasdefrequencia: 'Tabelas de Frequência sem intervalo',
                tabelascomintervalo: 'Tabelas de Frequência com intervalo',
                dicionariodeformulas: 'Dicionário de Fórmulas',
            },
            escolhaoconteudo: 'Escolha o conteúdo'
        },
        tdf: {
            title: 'Tabelas de Frequência',
            informacao: {
                linhas: 'Digite a quantidade de linhas da tabela',
                botao: 'Criar Tabela',
                botao2: 'Informar valores',
                botao3: 'Criar Tabela',
                erro: {
                    linhaszero: 'O número de linhas deve ser maior que zero e menor ou igual a 20'
                },
                carcular: 'Calcular',
                label: 'Digite os valores separados por espaços',
                tabeladeformulas: 'Tabela de Fórmulas',
            },
            separatrizes: {
                quartil: 'Quartil',
                percentil: 'Percentil',
                decil: 'Decil'
            },
            opcoes: {
                media: 'Média aritmética',
                desvio_medio: 'Desvio médio',
                variancia: 'Variância amostral',
                desvio_padrao: 'Desvio padrão',
                moda: 'Moda',
                mediana: 'Mediana',
                coeficiente_de_variacao: 'Coeficiente de variação',
                representacao: 'Representação',
                represent: {
                    titulo: 'Representação',
                    bom: 'Homogênea',
                    ruim: 'Heterogênea'
                }
            },
            tabela: {
                classe: 'Classe',
                intervalo: 'Intervalo',
                xi: 'xi',
                fi: 'fi',
                Fi: 'Fi',
                fri: 'fri',
                FRi: 'FRi',
                total: 'Total',
                xivsfi: 'xi*fi',
                somaparadesviomedio: '|xi - X̅| * fi',
                somaparavariancia: '(xi - X̅)² * fi',
                posicao: 'Posição',
                linf: 'Limite inferior',
                fant: 'FANT',
                fmediana: 'Fmediana',
                fquartil: 'Fquartil',
                fpercentil: 'Fpercentil',
                fdecil: 'Fdecil',
                h: 'h',
                fonte: 'Fonte:'
            }
        },
        loading: {
            carculando: 'Calculando...'
        },
        configuracoes: {
            title: 'Configurações',
        }
    }
}

export default portuguese;