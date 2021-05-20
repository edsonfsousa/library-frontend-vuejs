<template>
    <v-footer padless>
        <v-card flat tile class="white--text text-center flex">
            <v-card-text>
                <v-tooltip top color="blue">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-for="icon in icons"
                            :key="icon"
                            class="mx-4 blue--text"
                            icon
                            href="https://github.com/edsonfsousa"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon size="26px">
                                {{ icon }}
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>GitHub</span>
                </v-tooltip>
            </v-card-text>
            <v-divider class="blue"></v-divider>

            <v-card-text class="blue--text">
                {{ new Date().getFullYear() }} — <strong>WDA Livraria</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        links: ['home', 'livro', 'editora', 'aluguel'],
        icons: ['mdi-github'],
        fav: true,
        menu: false,
        message: false,
        hints: true
    })
};
</script>

<style></style>
