<template>
    <div id="app">
        <!-- <router-view></router-view> -->

        <div class="container">
            <v-dialog v-model="dialog2" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        {{ nomeCerto }}
                    </v-card-title>
                    <v-card-text>
                        <v-form class="px-3" ref="form">
                            <!-- <v-text-field label="Nome do livro" v-model="livro.nomeLivro" :rules="[rules.required]" append-icon="mdi-book"></v-text-field> -->
                            <!-- <v-text-field label="Nome do usuario" v-model="aluguel.usuario.id" :rules="[rules.required]" append-icon="mdi-book-account"></v-text-field> -->
                            <v-select
                                v-if="!edit"
                                v-model="aluguel.livro.id"
                                :items="livrosDisp"
                                :item-text="'nomeLivro'"
                                :item-value="'id'"
                                :rules="[(v) => !!v || 'Livro é obrigatório']"
                                label="Livro"
                                menu-props="auto"
                                append-icon="mdi-book-open-page-variant"
                                required
                            ></v-select>

                            <v-select
                                v-if="!edit"
                                v-model="aluguel.usuario.id"
                                :items="usuarios"
                                :item-text="'nome'"
                                :item-value="'id'"
                                :rules="[(v) => !!v || 'Usuario é obrigatório']"
                                label="Usuario"
                                menu-props="auto"
                                append-icon="mdi-account"
                                required
                            ></v-select>

                            <v-menu
                                v-if="!edit"
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="aluguel.dataAluguel"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="aluguel.dataAluguel"
                                        label="Data de aluguel"
                                        append-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[(v) => !!v || 'Data de Aluguel é obrigatório']"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="aluguel.dataAluguel" no-title scrollable>
                                    <v-spacer></v-spacer>

                                    <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>

                                    <v-btn text color="primary" @click="$refs.menu.save(aluguel.dataAluguel)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-menu
                                v-if="!edit"
                                ref="menu2"
                                v-model="menu2"
                                :close-on-content-click="false"
                                :return-value.sync="aluguel.dataPrevisao"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="aluguel.dataPrevisao"
                                        label="Previsão de devolução"
                                        append-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[(v) => !!v || 'Previsão é obrigatório']"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="aluguel.dataPrevisao" no-title scrollable>
                                    <v-spacer></v-spacer>

                                    <v-btn text color="primary" @click="menu2 = false"> Cancel </v-btn>

                                    <v-btn text color="primary" @click="$refs.menu2.save(aluguel.dataPrevisao)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                            <v-menu
                                v-if="edit"
                                ref="menu2"
                                v-model="menu2"
                                :close-on-content-click="false"
                                :return-value.sync="aluguel.dataDevolucao"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="aluguel.dataDevolucao"
                                        label="Data de devolução"
                                        append-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[(v) => !!v || 'Devolução é obrigatório']"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="aluguel.dataDevolucao" no-title scrollable>
                                    <v-spacer></v-spacer>

                                    <v-btn text color="primary" @click="menu2 = false"> Cancel </v-btn>

                                    <v-btn text color="primary" @click="$refs.menu2.save(aluguel.dataDevolucao)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="error" text @click="dialog2 = false"> Fechar </v-btn>
                        <v-btn color="primary" text @click="salvar"> Salvar </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <tbody>
                <v-card>
                    <v-card-title>
                        Alugueis
                        <v-divider class="mx-4" inset vertical></v-divider
                        ><v-btn
                            class="ma-2"
                            dark
                            color="blue"
                            rounded
                            @click="
                                (dialog2 = true),
                                    (edit = false),
                                    (nomeCerto = 'Cadastrar Aluguel'),
                                    aluguelLimpar(),
                                    this.$refs.form.resetValidation()
                            "
                            >Novo
                            <v-icon dark> mdi-plus </v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>

                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Pesquisa"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="aluguels"
                        :items-per-page="5"
                        :search="search"
                        class="elevation-1"
                        loading="items"
                        loading-text="Carregando dados... Aguarde!"
                    >
                        <!-- eslint-disable-next-line -->
                        <template v-slot:item.acoes="{ item }">
                            <v-btn
                                v-if="!item.dataDevolucao"
                                color=" yellow darken-4"
                                text
                                small
                                rounded
                                @click="showEdit(item)"
                            >
                                <v-icon dark> mdi-book-check </v-icon>
                            </v-btn>
                            <v-btn v-if="item.dataDevolucao" color="error" text small rounded @click="remover(item)">
                                <v-icon dark> mdi-delete </v-icon>
                            </v-btn>
                        </template>
                        <!-- eslint-disable-next-line -->
                        <template v-slot:item.dataDevolucao="{ item }">
                            {{
                                item.dataDevolucao
                                    ? item.dataDevolucao > item.dataPrevisao
                                        ? `${item.dataDevolucao} (Com atraso)`
                                        : `${item.dataDevolucao} (No prazo)`
                                    : 'Não devolvido'
                            }}
                        </template>
                    </v-data-table>
                </v-card>
            </tbody>
            <v-btn class="ma-2" color="blue" dark @click="irParaInicio">
                <v-icon dark left> mdi-arrow-left </v-icon>Voltar
            </v-btn>
        </div>
    </div>
</template>

<script>
import Aluguel from '../../../services/aluguel';
import Swal from 'sweetalert2';
import Usuario from '../../../services/usuarios';
import Livro from '../../../services/livros';

export default {
    name: 'Aluguel',
    data() {
        return {
            livrosDisp: [],
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
            usuario: {
                id: '',
                nome: '',
                cidade: '',
                endereco: '',
                email: ''
            },
            livro: {
                id: '',
                nomeLivro: '',
                autor: '',
                quant: '',
                quantalugado: '',
                lancamento: '',
                editora: {
                    codEditora: ''
                }
            },
            usuarios: [],
            livros: [],
            aluguels: [],
            errors: [],
            search: '',
            headers: [
                { text: 'ID', value: 'id', class: 'blue accent-2, white--text' },
                { text: 'LIVRO ALUGADO', value: 'nomeLivro', class: 'blue accent-2, white--text' },
                { text: 'USUARIO QUE ALUGOU', value: 'nome', class: 'blue accent-2, white--text' },
                { text: 'DATA DO ALUGUEL', value: 'dataAluguel', class: 'blue accent-2, white--text' },
                { text: 'PREVISÃO DE DEVOLUÇÃO', value: 'dataPrevisao', class: 'blue accent-2, white--text' },
                { text: 'DATA DE DEVOLUÇÃO', value: 'dataDevolucao', class: 'blue accent-2, white--text' },
                { text: 'AÇÕES', value: 'acoes', class: 'blue accent, white--text', sortable: false }
            ],
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            menu3: false,
            nomeCerto: '',
            edit: false,
            dialog2: false,
            notifications: false,
            sound: true,
            widgets: false,
            rules: {
                required: (value) => !!value || 'Este campo é obrigatório.'
            },
            picker: new Date().toISOString().substr(0, 10)
        };
    },
    mounted() {
        this.listar();
    },
    computed: {
        shouldDisableSaveButtomComputed() {
            return this.aluguel.dataAluguel == 0 || this.aluguel.dataDevolução == 0;
        }
    },
    watch: {
        dialog2() {
            this.$refs.form.resetValidation();
        }
    },

    methods: {
        irParaInicio() {
            this.$router.push('/');
        },
        save(date) {
            this.$refs.menu.save(date);
        },
        listar() {
            Aluguel.listar().then((resposta) => {
                console.log('aluguels', resposta.data);
                this.aluguels = resposta.data;
            });
            Usuario.listar().then((resposta) => {
                console.log('usuarios', resposta.data);
                this.usuarios = resposta.data;
            });
            Livro.listar().then((resposta) => {
                console.log('livros', resposta.data);
                this.livros = resposta.data;
            });
            Livro.listardisp().then((resposta) => {
                console.log('livrosDisp', resposta.data);
                this.livrosDisp = resposta.data;
            });
        },
        getLivro(id) {
            Livro.listar().then((resposta) => {
                this.livros = resposta.data;
                let livro = this.livros.find((item) => {
                    return item.id == id;
                });
                console.log(livro);
                if (livro.quantalugado == livro.quant) {
                    console.log('Indisponível');
                    return true;
                } else {
                    console.log(livro);
                    console.log('Disponível');
                    return false;
                }
            });
        },

        salvar() {
            if (this.$refs.form.validate()) {
                if (!this.aluguel.id) {
                    if (this.aluguel.dataPrevisao < this.aluguel.dataAluguel) {
                        Swal.fire('', 'Previsão de Devolução menor que a data de Aluguel', 'error');
                        this.listar();
                        this.dialog2 = false;
                        this.errors = {};
                    } else
                        Aluguel.salvar(this.aluguel).then((resposta) => {
                            // this.aluguel = {};
                            this.aluguel = this.getAluguelDefault();
                            console.log(resposta.data);
                            Swal.fire('', 'Salvo com sucesso', 'success');
                            this.listar();
                            this.dialog2 = false;
                            this.errors = {};
                        });
                } else if (this.aluguel.dataDevolucao < this.aluguel.dataAluguel) {
                    Swal.fire('', 'Data de Devolução menor que a data de Aluguel', 'error');
                    this.listar();
                    this.dialog2 = false;
                    this.errors = {};
                } else {
                    Aluguel.alterar(this.aluguel).then((resposta) => {
                        // this.aluguel = {};
                        this.aluguel = this.getAluguelDefault();
                        console.log(resposta.data);
                        Swal.fire('', 'Alterado com sucesso', 'success');
                        this.listar();
                        this.dialog2 = false;
                    });
                }
            }
        },

        showEdit(aluguel) {
            this.getAluguelDefault();
            this.edit = true;
            this.nomeCerto = 'Devolver Aluguel';
            this.dialog2 = true;
            this.aluguel.id = aluguel.id;
            this.aluguel.livro.id = aluguel.livroId;
            this.aluguel.usuario.id = aluguel.usuarioId;
            this.aluguel.dataAluguel = aluguel.dataAluguel;
            this.aluguel.dataPrevisao = aluguel.dataPrevisao;

            console.log(this.aluguel);
        },
        getAluguelDefault() {
            return {
                id: '',
                livro: {
                    id: ''
                },
                usuario: {
                    id: ''
                },
                dataAluguel: '',
                dataPrevisao: ''
            };
        },
        aluguelLimpar() {
            this.aluguel = {
                id: '',
                livro: {
                    id: ''
                },
                usuario: {
                    id: ''
                },
                dataAluguel: '',
                dataPrevisao: ''
            };
        },

        editar(aluguel) {
            console.log(aluguel);
            this.aluguel = {
                id: aluguel.id,
                livro: {
                    id: aluguel.livroId
                },
                usuario: {
                    id: aluguel.usuarioId
                },
                dataAluguel: aluguel.dataAluguel,
                dataDevolução: aluguel.dataDevolução
            };
        },
        remover(aluguel) {
            console.log(aluguel);
            Swal.fire({
                title: 'Você quer realmente apagar?',
                showDenyButton: true,
                confirmButtonText: 'Apagar',
                denyButtonText: 'Não apagar'
            }).then((resposta) => {
                if (resposta.isConfirmed) {
                    Aluguel.apagar(aluguel).then((resposta) => {
                        console.log(resposta.data);
                        Swal.fire('Apagado com sucesso', '', 'success');
                        this.listar();
                    });
                } else if (resposta.isDenied) {
                    Swal.fire('Não apagado', '', 'info');
                }
            });
        }
    }
};
</script>

<style scoped>
#footerp {
    text-align: center;
}
#nao {
    color: #ff4a4a;
}
#sim {
    color: #1de9b6;
}
#salvador {
    margin-top: 27px;
}
#tabela {
    margin-top: 10px;
}
#plus {
    position: absolute;
    right: 16%;
    top: 20px;
}
select:hover {
    border-color: #2392f0;
}
th:hover {
    border-color: #000407;
}
input:hover {
    border-color: #000407aa;
}
</style>
