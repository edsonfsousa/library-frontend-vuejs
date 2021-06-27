<script>
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,

    props: {
        chartdata: {
            type: Object,
            default: null
        },
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
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options);
    }
};
</script>

<style></style>
