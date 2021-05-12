<template>
    <v-app class="pagina">
        <div class="viewPagina">
            <Usuario></Usuario>
        </div>
    </v-app>
</template>
<script>
import Usuario from './components/Usuario.vue';
export default {
    data: () => ({}),
    components: {
        Usuario
    }
};
</script>
