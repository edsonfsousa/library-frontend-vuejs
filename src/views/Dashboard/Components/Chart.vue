<script>
import { Doughnut } from 'vue-chartjs';

// Chart.defaults.global.legend.labels.usePointStyle = true;

export default {
    extends: Doughnut,
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

            responsive: true,
            maintainAspectRatio: false,

            legend: {
                position: 'right'
            },
            scales: {}
        }
    }),

    mounted() {
        this.renderChart(this.chartdata, this.options);
    }
};
</script>

<style></style>
