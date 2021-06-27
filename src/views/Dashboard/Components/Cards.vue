<template>
    <div class="d-flex justify-center mx-2">
        <v-card
            class="justify-center my-7"
            shaped
            width="44%"
            style="border: 1px solid #1d87b5"
            min-height="130"
            rounded="lg"
        >
            <v-card-text class="d-flex justify-space-between mx-2">
                <div>
                    Último Livro alugado:
                    <h1 class="my-1">{{ ultimoAluguel[0].nomeLivro }}</h1>
                </div>

                <div class="">
                    <v-avatar class="mx-5 my-3" color="#03a5fc" size="3.500em" right>
                        <v-icon size="30px" color="white"> mdi-book </v-icon>
                    </v-avatar>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import Aluguel from '../../../services/aluguel';
export default {
    data: () => ({
        aluguel: {
            id: '',
            livro: {
                id: ''
            },
            usuario: {
                id: ''
            },
            dataAluguel: '',
            dataPrevisao: '',
            dataDevolucao: ''
        },
        ultimoAluguel: {},
        aluguels: []
    }),
    mounted() {
        this.listar();
    },
    methods: {
        listar() {
            Aluguel.listar().then((resposta) => {
                console.log('alugueis', resposta.data);
                this.aluguels = resposta.data;
                this.ultimoAluguel = this.aluguels.slice(-1);
            });
        }
    }
};
</script>
<style scoped></style>
