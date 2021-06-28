<template>
    <div id="livrar">
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
                                label="Nome do livro"
                                v-model="livro.nomeLivro"
                                :rules="[rules.required, rules.max, rules.min]"
                                :counter="120"
                                append-icon="mdi-book-open-page-variant"
                            ></v-text-field>
                            <v-text-field
                                label="Nome do autor"
                                v-model="livro.autor"
                                :rules="[rules.required, rules.maxAutor, rules.min]"
                                :counter="35"
                                append-icon="mdi-account-box-multiple"
                            ></v-text-field>
                            <v-text-field
                                label="Quantidade"
                                type="number"
                                v-model="livro.quant"
                                :rules="[rules.required, rules.minNumber]"
                                append-icon="mdi-numeric"
                            ></v-text-field>
                            <v-select
                                v-model="livro.editora.codEditora"
                                :items="editoras"
                                :item-text="'nomeEditora'"
                                :item-value="'codEditora'"
                                :rules="[(v) => !!v || 'Editora é obrigatório']"
                                label="Editora do livro"
                                menu-props="auto"
                                append-icon="mdi-bookshelf"
                                required
                            ></v-select>

                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="livro.lancamento"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="livro.lancamento"
                                        label="Lançamento"
                                        append-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[(v) => !!v || 'Lançamento é obrigatório']"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="livro.lancamento" no-title scrollable>
                                    <v-spacer></v-spacer>

                                    <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>

                                    <v-btn text color="primary" @click="$refs.menu.save(livro.lancamento)"> OK </v-btn>
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
                        Livros
                        <v-divider class="mx-4" inset vertical></v-divider
                        ><v-btn
                            class="ma-2"
                            dark
                            color="blue"
                            rounded
                            @click="
                                (dialog2 = true),
                                    (nomeCerto = 'Cadastrar Livro'),
                                    livroLimpar(),
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
                        :items="livros"
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
                        <!-- eslint-disable-next-line -->
                        <template v-slot:item.quant="{ item }">
                            <v-chip :color="getColor(item.quant)" dark>
                                {{ item.quant }}
                            </v-chip>
                        </template>
                        <!-- eslint-disable-next-line -->
                        <template v-slot:item.quantalugado="{ item }">
                            <v-chip :color="getColor(item.quantalugado)" dark>
                                {{ item.quantalugado }}
                            </v-chip>
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
import Livro from '../../../services/livros';
import Editora from '../../../services/editoras';
import Swal from 'sweetalert2';

export default {
    name: 'livrar',
    data() {
        return {
            livro: {
                id: '',
                nomeLivro: '',
                autor: '',
                quant: '',
                lancamento: '',
                quantalugado: '',
                editora: {
                    codEditora: ''
                }
            },
            livros: [],
            editora: {
                codEditora: '',
                nomeEditora: '',
                cidade: ''
            },
            editoras: [],
            errors: [],
            search: '',
            headers: [
                { text: 'ID', value: 'id', class: 'blue accent-2, white--text' },
                { text: 'NOME', value: 'nomeLivro', class: 'blue accent-2, white--text' },
                { text: 'AUTOR', value: 'autor', class: 'blue accent-2, white--text' },
                { text: 'EDITORA', value: 'nomeEditora', class: 'blue accent-2, white--text' },
                { text: 'LANÇAMENTO', value: 'lancamento', class: 'blue accent-2, white--text' },
                { text: 'QUANTIDADE', value: 'quant', class: 'blue accent-2, white--text' },
                { text: 'AÇÕES', value: 'acoes', class: 'blue accent, white--text', sortable: false }
            ],
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            nomeCerto: '',
            dialog2: false,
            notifications: false,
            sound: true,
            widgets: false,
            rules: {
                required: (value) => !!value || 'Este campo é obrigatório.',
                max: (value) => value.length <= 120 || 'Máximo de 120 caracteres.',
                maxAutor: (value) => value.length <= 35 || 'Máximo de 35 caracteres.',
                min: (value) => value.length >= 3 || 'Mínimo de 3 caracteres.',
                minNumber: (value) => value >= 1 || 'No mínimo 1 é necessário.'
            },
            picker: new Date().toISOString().substr(0, 10)
        };
    },
    mounted() {
        this.listar();
    },
    computed: {
        shouldDisableSaveButtomComputed() {
            return (
                this.livro.nomeLivro.trim().length == 0 ||
                this.livro.autor.trim().length == 0 ||
                this.livro.quant.trim().length == 0 ||
                this.livro.lancamento == 0
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
        getColor(quant) {
            if (quant < 5) return 'red';
            else if (quant < 10) return 'orange';
            else return 'green';
        },
        listar() {
            Livro.listar().then((resposta) => {
                console.log('livros', resposta.data);
                this.livros = resposta.data;
            }),
                Editora.listar().then((resposta) => {
                    console.log('editoras', resposta.data);
                    this.editoras = resposta.data;
                });
        },

        salvar() {
            if (this.$refs.form.validate()) {
                console.log(this.livro);
                if (!this.livro.id) {
                    Livro.salvar(this.livro).then((resposta) => {
                        // this.livro = {};
                        this.livro = this.getLivroDefault();
                        console.log(resposta.data);
                        Swal.fire('', 'Salvo com sucesso!', 'success');
                        this.listar();
                        this.dialog2 = false;
                        this.errors = {};
                    });
                } else {
                    Livro.alterar(this.livro).then((resposta) => {
                        // this.livro = {};
                        this.livro = this.getLivroDefault();
                        console.log(resposta.data);
                        Swal.fire('', 'Alterado com sucesso!', 'success');
                        this.listar();
                        this.dialog2 = false;
                        this.errors = {};
                    });
                }
            }
        },
        showEdit(livro) {
            this.getLivroDefault();
            this.nomeCerto = 'Editar Livro';
            this.dialog2 = true;
            this.livro.id = livro.id;
            this.livro.nomeLivro = livro.nomeLivro;
            this.livro.autor = livro.autor;
            this.livro.quant = livro.quant;
            this.livro.editora.codEditora = livro.codEditora;
            this.livro.lancamento = livro.lancamento;
            this.livro.quantalugado = livro.quantalugado;
        },
        getLivroDefault() {
            return {
                id: '',
                nomeLivro: '',
                autor: '',
                quant: '',
                lancamento: '',
                editora: {
                    codEditora: ''
                }
            };
        },
        livroLimpar() {
            this.livro = {
                id: '',
                nomeLivro: '',
                autor: '',
                quant: '',
                lancamento: '',
                editora: {
                    codEditora: ''
                }
            };
        },

        editar(livro) {
            this.livro = {
                id: livro.id,
                nomeLivro: livro.nomeLivro,
                autor: livro.autor,
                quant: livro.quant,
                lancamento: livro.lancamento,
                editora: {
                    codEditora: livro.codEditora
                }
            };
        },
        remover(livro) {
            Swal.fire({
                title: 'Você quer realmente apagar?',
                showDenyButton: true,
                confirmButtonText: 'Apagar',
                denyButtonText: 'Não apagar'
            }).then((resposta) => {
                if (resposta.isConfirmed) {
                    Livro.apagar(livro)
                        .then((resposta) => {
                            console.log(resposta.data);
                            Swal.fire('Apagado com sucesso!', '', 'success');
                            this.listar();
                        })
                        .catch((error) => {
                            Swal.fire('', 'Livro alugado, não pode ser apagado!', 'error');
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
select:hover {
    border-color: #2392f0;
}
th:hover {
    border-color: #000407;
}
</style>
