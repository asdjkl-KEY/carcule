const english = {
    translation: {
        appname: 'Carcule',
        proximamente: 'Coming soon...',
        // MENU
        menu: {
            matrizes: 'Matrices',
            estatistica: 'Statistics',
            configuracoes: 'Settings',
        },
        estatistica: {
            conteudos: {
                tabelasdefrequencia: 'Frequency Tables without Interval',
                tabelascomintervalo: 'Frequency Tables with Interval',
            },
            escolhaoconteudo: 'Choose the content'
        },
        tdf: {
            title: 'Frequency Tables',
            informacao: {
                linhas: 'Enter the number of rows for the table',
                botao: 'Create Table',
                erro: {
                    linhaszero: 'The number of rows must be greater than zero and less than or equal to 20'
                },
                carcular: 'Calculate',
            },
            opcoes: {
                media: 'Arithmetic Mean',
                desvio_medio: 'Mean Deviation',
                variancia: 'Sample Variance',
                desvio_padrao: 'Standard Deviation',
                moda: 'Mode',
                mediana: 'Median',
                coeficiente_de_variacao: 'Coefficient of Variation',
                representacao: 'Representation',
                represent: {
                    titulo: 'Representation',
                    bom: 'Homogeneous',
                    ruim: 'Heterogeneous'
                }
            },
            tabela: {
                classe: 'Class',
                intervalo: 'Interval',
                xi: 'xi',
                fi: 'fi',
                Fi: 'Fi',
                fri: 'fri',
                FRi: 'FRi',
            }
        },
        loading: {
            carculando: 'Calculating...'
        },
        configuracoes: {
            title: 'Settings',
        }
    }
}

export default english;
