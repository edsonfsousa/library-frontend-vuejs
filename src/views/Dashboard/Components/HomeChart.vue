<template>
    <div class="chart-container">
        <Panel header="Livros Mais Alugados">
            <line-chart
                style="position: relative; height: 50vh"
                v-if="loaded"
                :chartdata="chartdata"
                :options="options"
            />
        </Panel>
    </div>
</template>

<script>
import LineChart from './Chart.vue';
import LivroService from '../../../service/LivroService';
const axios = require('axios');
export default {
    name: 'LineChartContainer',
    components: { LineChart },
    data: () => ({
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scaleFontColor: '#FFFFFF',
            legend: {
                labels: {
                    fontColor: 'white',
                    fontSize: 12
                }
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            display: true,
                            fontColor: 'white',
                            callback: function (value) {
                                if (value % 1 === 0) {
                                    return value;
                                }
                            }
                        }
                    }
                ],
                xAxes: [
                    {
                        ticks: {
                            fontColor: 'white'
                        }
                    }
                ]
            }
        },
        livros: null,
        loaded: false,
        chartdata: {}
    }),

    livroService: null,
    created() {
        this.livroService = new LivroService();
    },
    async mounted() {
        this.livroService.getAll().then((data) => {
            this.livros = data.data;
        });
        this.loaded = false;

        try {
            const { data } = await axios.get('https://livraria-restapi.herokuapp.com/livros/mais-alugados');
            this.chartdata = data;
            this.loaded = true;
            this.fillData();
        } catch (e) {
            console.error(e);
        }
    },

    methods: {
        fillData() {
            this.chartdata = {
                labels: ['Quantidade Total Alugada'],
                datasets: [
                    {
                        label: this.chartdata[0].nome,
                        data: [this.chartdata[0].qtdAlugada],
                        backgroundColor: '#883696',
                        borderColor: '#ffffff',
                        borderWidth: 2
                    },
                    {
                        label: this.chartdata[1].nome,
                        data: [this.chartdata[1].qtdAlugada],
                        backgroundColor: '#d24dff',
                        borderColor: '#ffffff',
                        borderWidth: 2
                    },
                    {
                        label: this.chartdata[2].nome,
                        data: [this.chartdata[2].qtdAlugada],
                        backgroundColor: '#a366ff',
                        borderColor: '#ffffff',
                        borderWidth: 2
                    }
                ]
            };
        }
    }
};
</script>

<style>
.cards {
    display: flex;
    justify-content: space-between;
}
.card-container {
    width: 49%;
}
.charts {
    display: flex;
    justify-content: space-between;
}
.chart-container {
    width: 49%;
}

@media screen and (max-width: 50em) {
    .chart-container {
        width: 100%;
    }
    .cards {
        display: inline;
    }
    .charts {
        display: inline;
    }

    .card-container {
        width: 100%;
    }
}
</style>
