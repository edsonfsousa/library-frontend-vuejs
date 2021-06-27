<template>
    <v-app class="pagina">
        <div class="viewPagina">
            <Cards></Cards>
        </div>
        <div>
            <Graphs></Graphs>
        </div>
    </v-app>
</template>
<script>
import Livro from '../../services/livros';
import Graphs from './Components/Graphs';
import Cards from './Components/Cards';
export default {
    data: () => ({}),
    components: {
        Cards,
        Graphs
    },
    mounted() {
        this.listar();
    },
    methods: {
        listar() {
            Livro.listar().then((resposta) => {
                console.log('livros', resposta.data);
                this.livros = resposta.data;
            });
        }
    }
};
</script>
