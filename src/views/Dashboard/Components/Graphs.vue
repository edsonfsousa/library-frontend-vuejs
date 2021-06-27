<template>
    <v-row class="d-flex justify-center mx-12">
        <v-col cols="12" sm="6">
            <v-card
                class=".d-inline-flex my-12"
                style="border: 1px solid #1d87b5"
                max-width="600"
                min-height="300"
                rounded="lg"
            >
                <v-card-text class="d-inline-flex">
                    <div>
                        VISÃO GERAL
                        <h3 class="my-3">Livros mais alugados:</h3>
                    </div>
                </v-card-text>

                <div class="mb-10" style="position: relative; width: 90%; margin: 0 auto">
                    <Chart style="height: 270px"></Chart>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import Chart from './Chart.vue';
export default {
    data: () => ({}),
    components: {
        Chart
    }
};
</script>

<style scoped></style>
