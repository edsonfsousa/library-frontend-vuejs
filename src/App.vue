<template>
    <v-app id="inspire">
        <v-app-bar app color="dark">
            <v-container class="py-0 fill-height">
                <v-toolbar-title class="headline text-uppercase mr-16">
                    <span><b> WDA </b></span>
                    <span class="font-weight-ligt">Livraria</span>
                </v-toolbar-title>

                <v-btn active-class="blue lighten-2" text rounded to="/"
                    ><v-icon size="24px"> mdi-home </v-icon> Inicio
                </v-btn>
                <v-btn active-class="blue lighten-2" text rounded to="/usuario"
                    ><v-icon size="24px"> mdi-account-edit </v-icon> Usuário
                </v-btn>
                <v-btn active-class="blue lighten-2" text rounded to="/editora"
                    ><v-icon size="24px"> mdi-bookshelf </v-icon> Editora
                </v-btn>
                <v-btn active-class="blue lighten-2" text rounded to="/livro"
                    ><v-icon size="21px"> mdi-book-plus </v-icon> Livro
                </v-btn>
                <v-btn active-class="blue lighten-2" text rounded to="/aluguel"
                    ><v-icon size="21px"> mdi-book-account </v-icon> Aluguel
                </v-btn>

                <v-spacer></v-spacer>

                <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="100" offset-x>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn rounded color="blue lighten-1" dark v-bind="attrs" v-on="on"
                            ><v-icon size="25px"> mdi-theme-light-dark </v-icon></v-btn
                        >
                    </template>

                    <v-card>
                        <v-list>
                            <v-list-item>
                                <v-list-item-avatar>
                                    <img
                                        src="https://avatars.githubusercontent.com/u/65977099?s=400&u=b28bb3b3c3577e668cf1eac129868474e0ee3143&v=4"
                                    />
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Edson Fernandes</v-list-item-title>
                                    <v-list-item-subtitle>Fundador da Biblioteca</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                                        <v-icon>mdi-heart</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>

                        <v-divider></v-divider>

                        <v-list>
                            <v-list-item>
                                <v-list-item-action>
                                    <v-switch
                                        v-model="$vuetify.theme.dark"
                                        inset
                                        persistent-hint
                                        color="blue"
                                    ></v-switch>
                                </v-list-item-action>
                                <v-list-item-title>Modo Escuro</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </v-container>
        </v-app-bar>

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
        </v-main>
    </v-app>
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
<style scoped>
#footerp {
    text-align: center;
}
#tabela {
    margin-top: 10px;
}
</style>
