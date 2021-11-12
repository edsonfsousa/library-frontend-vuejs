<template>
    <div class="app">
        <!-- <router-view></router-view> -->

        <div class="container">
            <v-dialog v-model="dialog2" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        {{ nomeCerto }}
                    </v-card-title>

                    <v-card-text>
                        <v-form class="px-3" ref="form">
                            <v-text-field
                                label="Nome da Editora"
                                v-model="editora.nomeEditora"
                                :rules="[rules.required, rules.maxEditora, rules.min]"
                                :counter="80"
                                append-icon="mdi-bookshelf"
                            ></v-text-field>
                            <v-text-field
                                label="Cidade da Editora"
                                v-model="editora.cidade"
                                :rules="[rules.required, rules.max, rules.min]"
                                :counter="50"
                                append-icon="mdi-map-marker"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="error" text @click="dialog2 = false"> Fechar </v-btn>
                        <v-btn color="primary" text @click="salvar"> Salvar </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <div class="d-flex flex-column align-center">
                <tbody>
                    <v-card elevation="3" style="border: 1px solid #1d87b5">
                        <v-card-title>
                            Editoras
                            <v-divider class="mx-4" inset vertical></v-divider
                            ><v-btn
                                class="ma-2"
                                dark
                                color="blue"
                                rounded
                                @click="
                                    (dialog2 = true),
                                        (nomeCerto = 'Cadastrar Editora'),
                                        editoraLimpar(),
                                        this.$refs.form.resetValidation()
                                "
                                >Nova
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
                            :items="editoras"
                            :items-per-page="5"
                            :search="search"
                            class="elevation-1"
                            loading="items"
                            loading-text="Carregando dados... Aguarde!"
                        >
                            <!-- eslint-disable-next-line -->
                            <template v-slot:item.acoes="{ item }">
                                <v-tooltip top color="#0061A3">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="primary"
                                            v-bind="attrs"
                                            v-on="on"
                                            text
                                            small
                                            rounded
                                            @click="showEdit(item)"
                                        >
                                            <v-icon dark> mdi-pencil </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar</span>
                                </v-tooltip>
                                <v-tooltip top color="red">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="error"
                                            v-bind="attrs"
                                            v-on="on"
                                            text
                                            small
                                            rounded
                                            @click="remover(item)"
                                        >
                                            <v-icon dark> mdi-delete </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Remover</span>
                                </v-tooltip>
                            </template>
                        </v-data-table>
                    </v-card>
                    <div class="align-self-start">
                        <v-btn class="ma-2" color="blue" dark @click="irParaInicio">
                            <v-icon dark left> mdi-arrow-left </v-icon>Voltar
                        </v-btn>
                    </div>
                </tbody>
            </div>
        </div>
    </div>
</template>
<script>
import Editora from '../../../services/editoras';
import Swal from 'sweetalert2';

export default {
    name: 'app',
    data() {
        return {
            editora: {
                codEditora: '',
                nomeEditora: '',
                cidade: ''
            },
            editoras: [],
            errors: [],
            search: '',
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    value: 'codEditora',
                    class: 'blue accent-2, white--text'
                },
                {
                    text: 'NOME',
                    value: 'nomeEditora',
                    class: 'blue accent-2, white--text'
                },
                {
                    text: 'CIDADE',
                    value: 'cidade',
                    class: 'blue accent-2, white--text'
                },
                {
                    text: 'AÇÕES',
                    value: 'acoes',
                    class: 'blue accent, white--text',
                    sortable: false
                }
            ],
            icons: ['mdi-edit', 'mdi-delete'],
            nomeCerto: '',
            dialog2: false,
            notifications: false,
            sound: true,
            widgets: false,
            rules: {
                required: (value) => !!value || 'Este campo é obrigatório.',
                max: (value) => value.length <= 50 || 'Máximo de 50 caracteres.',
                maxEditora: (value) => value.length <= 80 || 'Máximo de 80 caracteres.',
                min: (value) => value.length >= 3 || 'Mínimo de 3 caracteres.'
            }
        };
    },
    mounted() {
        this.listar();
    },
    computed: {
        shouldDisableSaveButtomComputed() {
            return this.editora.nomeEditora.trim().length == 0 || this.editora.cidade.trim().length == 0;
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
        listar() {
            Editora.listar().then((resposta) => {
                console.log('editoras', resposta.data);
                this.editoras = resposta.data;
            });
        },

        salvar() {
            if (this.$refs.form.validate()) {
                if (!this.editora.id) {
                    Editora.salvar(this.editora).then((resposta) => {
                        this.editora = {};
                        console.log(resposta.data);
                        Swal.fire('', 'Salvo com sucesso!', 'success');
                        this.listar();
                        this.dialog2 = false;
                        this.deuErro = false;
                    });
                } else {
                    Editora.alterar(this.editora).then((resposta) => {
                        this.editora = {};
                        console.log(resposta.data);
                        Swal.fire('', 'Alterado com sucesso!', 'success');
                        this.listar();
                        this.dialog2 = false;
                        this.deuErro = false;
                    });
                }
            }
        },
        showEdit(editora) {
            this.nomeCerto = 'Editar Editora';
            this.dialog2 = true;
            this.editora = { ...editora };
        },
        editoraLimpar() {
            this.editora = {
                codEditora: '',
                nomeEditora: '',
                cidade: ''
            };
        },

        editar(editora) {
            this.editora = editora;
        },
        remover(editora) {
            console.log(editora);
            Swal.fire({
                title: 'Você quer realmente apagar?',
                showDenyButton: true,
                confirmButtonText: 'Apagar',
                denyButtonText: 'Não apagar'
            }).then((resposta) => {
                if (resposta.isConfirmed) {
                    Editora.apagar(editora)
                        .then((resposta) => {
                            console.log(resposta.data);
                            Swal.fire('Apagado com sucesso!', '', 'success');
                            this.listar();
                        })
                        .catch((error) => {
                            Swal.fire('', 'Editora com livros cadastrados, não poder ser apagada!', 'error');
                            this.listar();
                            console.log(error.data);
                            this.dialog2 = false;
                            this.errors = {};
                        });
                } else if (resposta.isDenied) {
                    Swal.fire('Não apagado!', '', 'info');
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
#tabela {
    margin-top: 10px;
}
#plus {
    position: absolute;
    right: 16%;
    top: 20px;
}
input:hover {
    border-color: #000407aa;
}
th:hover {
    border-color: #000407;
}
#veri:hover {
    color: #e92121;
}
input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
}

.dirty {
    border-color: #5a5;
    background: #efe;
}

.dirty:focus {
    outline-color: #8e8;
}

.error {
    border-color: red;
    background: #fdd;
}

.error:focus {
    outline-color: #f99;
}
</style>
