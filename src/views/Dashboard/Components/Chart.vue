<script>
import { Bar } from 'vue-chartjs';
const axios = require('axios');
export default {
    extends: Bar,
    data: () => ({
        chartdata: {
            labels: ['Usuários', 'Editoras', 'Livros', 'Alugueis'],
            datasets: [
                {
                    label: 'My First Dataset',
                    data: [50, 30, 50, 30],

                    backgroundColor: '#006CFF'
                }
            ]
        },
        options: {
            layout: {
                padding: {
                    left: 0
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
            },

            responsive: true,
            maintainAspectRatio: false,

            legend: {
                position: 'right'
            }
        }
    }),

    async mounted() {
        try {
            const { data } = await axios.get('https://api-spring-livraria.herokuapp.com/livros/buscartodos');
            this.chartdata = data;
            this.loaded = true;
            this.fillData();
            console.log(this.chartdata);
        } catch (e) {
            console.error(e);
        }
        this.renderChart(this.chartdata, this.options);
    },
    methods: {
        fillData() {
            this.chartdata = {
                labels: ['Quantidade Alugada'],
                datasets: [
                    {
                        label: this.chartdata[0].nomeLivro,
                        data: [this.chartdata[0].quantalugado],
                        backgroundColor: '#05a8ff',
                        borderColor: '#ffffff',
                        borderWidth: 2
                    },
                    {
                        label: this.chartdata[1].nomeLivro,
                        data: [this.chartdata[1].quantalugado],
                        backgroundColor: '#1375a8',
                        borderColor: '#ffffff',
                        borderWidth: 2
                    },
                    {
                        label: this.chartdata[2].nomeLivro,
                        data: [this.chartdata[2].quantalugado],
                        backgroundColor: '#004b73',
                        borderColor: '#ffffff',
                        borderWidth: 2
                    }
                ]
            };
        }
    }
};
</script>

<style></style>
