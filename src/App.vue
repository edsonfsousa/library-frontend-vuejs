<template>
    <v-app id="inspire">
        <Header></Header>

        <v-main class="blue lighten-3">
            <v-container>
                <v-row>
                    <v-col>
                        <v-sheet min-height="85vh" rounded="lg">
                            <router-view> </router-view>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
            <Footer></Footer>
        </v-main>
    </v-app>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
    components: {
        Header,
        Footer
    }
};
</script>
<style scoped>
#footerp {
    text-align: center;
}
#tabela {
    margin-top: 10px;
}
</style>
