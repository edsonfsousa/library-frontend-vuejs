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
                                label="Nome do Usuario"
                                v-model="usuario.nome"
                                :rules="[rules.required, rules.max, rules.min]"
                                :counter="35"
                                append-icon="mdi-account"
                            ></v-text-field>
                            <v-text-field
                                label="Cidade do Usuario"
                                v-model="usuario.cidade"
                                :rules="[rules.required, rules.max, rules.min]"
                                :counter="35"
                                append-icon="mdi-city"
                            ></v-text-field>
                            <v-text-field
                                label="Endereço do Usuario"
                                v-model="usuario.endereco"
                                :rules="[rules.required, rules.max, rules.min]"
                                :counter="35"
                                append-icon="mdi-home-city"
                            ></v-text-field>
                            <v-text-field
                                label="Email do Usuario"
                                v-model="usuario.email"
                                :rules="[rules.required, rules.email]"
                                append-icon="mdi-email"
                            ></v-text-field>
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
                        Usuários
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-btn
                            class="ma-2"
                            dark
                            color="blue"
                            rounded
                            @click="
                                (dialog2 = true),
                                    (nomeCerto = 'Cadastrar Usuário'),
                                    usuarioLimpar(),
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
                        :items="usuarios"
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
            </tbody>

            <v-btn class="ma-2" color="blue" dark @click="irParaInicio">
                <v-icon dark left> mdi-arrow-left </v-icon>Voltar
            </v-btn>
        </div>
    </div>
</template>

<script>
import Usuario from '../../../services/usuarios';
import Swal from 'sweetalert2';

export default {
    name: 'app',
    data() {
        return {
            usuario: {
                id: '',
                nome: '',
                cidade: '',
                endereco: '',
                email: ''
            },
            usuarios: [],
            errors: [],
            search: '',
            headers: [
                { text: 'ID', value: 'id', class: 'blue accent-2, white--text' },
                { text: 'NOME', value: 'nome', class: 'blue accent-2, white--text' },
                { text: 'CIDADE', value: 'cidade', class: 'blue accent-2, white--text' },
                { text: 'ENDEREÇO', value: 'endereco', class: 'blue accent-2, white--text' },
                { text: 'EMAIL', value: 'email', class: 'blue accent-2, white--text' },
                { text: 'AÇÕES', value: 'acoes', class: 'blue accent, white--text', sortable: false }
            ],
            nomeCerto: '',
            dialog2: false,
            notifications: false,
            sound: true,
            widgets: false,
            rules: {
                required: (value) => !!value || 'Este campo é obrigatório.',
                max: (value) => value.length <= 35 || 'Máximo de 35 caracteres.',
                min: (value) => value.length >= 3 || 'Mínimo de 3 caracteres.',
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'E-mail inválido';
                }
            }
        };
    },
    mounted() {
        this.listar();
    },

    computed: {
        shouldDisableSaveButtomComputed() {
            return (
                this.usuario.nome.trim().length == 0 ||
                this.usuario.cidade.trim().length == 0 ||
                this.usuario.email.trim().length == 0 ||
                this.usuario.endereco.trim().length == 0
            );
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
            Usuario.listar().then((resposta) => {
                console.log('usuarios', resposta.data);
                this.usuarios = resposta.data;
            });
        },

        salvar() {
            if (this.$refs.form.validate()) {
                if (!this.usuario.id) {
                    Usuario.salvar(this.usuario).then((resposta) => {
                        this.usuario = {};
                        console.log(resposta.data);
                        Swal.fire('', 'Salvo com sucesso!', 'success');
                        this.listar();
                        this.dialog2 = false;
                    });
                } else {
                    Usuario.alterar(this.usuario).then((resposta) => {
                        this.usuario = {};
                        console.log(resposta.data);
                        Swal.fire('', 'Alterado com sucesso!', 'success');
                        this.listar();
                        this.dialog2 = false;
                    });
                }
            }
        },
        showEdit(usuario) {
            this.nomeCerto = 'Editar Usuário';
            this.dialog2 = true;
            this.usuario = { ...usuario };
        },
        usuarioLimpar() {
            this.usuario = {
                id: '',
                nome: '',
                cidade: '',
                endereco: '',
                email: ''
            };
        },

        editar(usuario) {
            this.usuario = usuario;
        },
        remover(usuario) {
            console.log(usuario);
            Swal.fire({
                title: 'Você quer realmente apagar?',
                showDenyButton: true,
                confirmButtonText: 'Apagar',
                denyButtonText: 'Não apagar'
            }).then((resposta) => {
                if (resposta.isConfirmed) {
                    Usuario.apagar(usuario)
                        .then((resposta) => {
                            console.log(resposta.data);
                            Swal.fire('Apagado com sucesso!', '', 'success');
                            this.listar();
                        })
                        .catch((error) => {
                            Swal.fire('', 'Usuário com livros alugados, não pode ser apagado!', 'error');
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
[sucesso] {
    color: #fff;
    background-color: #47af55;
}
[sucesso]:hover {
    background-color: #47af55aa;
}
input:hover {
    border-color: #000407aa;
}
th:hover {
    border-color: #000407;
}
</style>
