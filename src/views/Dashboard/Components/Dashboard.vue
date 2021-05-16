<script>
import { Doughnut } from 'vue-chartjs';

export default {
    extends: Doughnut,
    data: () => ({
        chartdata: {
            labels: ['Medicos', 'Pais', 'Redes sociais', 'outros'],
            datasets: [
                {
                    label: 'My First Dataset',
                    data: [50, 30, 50, 30],
                    backgroundColor: ['#91268E', '#009144', '#FF003C', '#006CFF'],
                    hoverOffset: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }),

    mounted() {
        this.renderChart(this.chartdata, this.options);
    }
};
</script>

<style></style>
