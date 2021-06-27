<template>
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

                    <v-list class="d-flex">
                        <v-list-item>
                            <v-list-item-action>
                                <v-switch v-model="$vuetify.theme.dark" inset persistent-hint color="blue"></v-switch>
                            </v-list-item-action>
                            <v-list-item-title>Modo Escuro</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </v-container>
    </v-app-bar>
</template>

<script>
export default {
    data: () => ({
        links: ['home', 'livro', 'editora', 'aluguel'],
        fav: true,
        menu: false
    })
};
</script>

<style></style>
