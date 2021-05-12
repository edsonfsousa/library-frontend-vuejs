<template>
    <v-app class="pagina">
        <div class="viewPagina">
            <Livro></Livro>
        </div>
    </v-app>
</template>
<script>
import Livro from './components/Livro.vue';
export default {
    data: () => ({}),
    components: {
        Livro
    }
};
</script>
