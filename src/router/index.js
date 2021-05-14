import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Testes" */ '../components/Home.vue')
    },
    {
        path: '/usuario',
        name: 'Usuario',
        component: () => import(/* webpackChunkName: "Testes" */ '../views/Usuario/UsuarioView.vue')
    },
    {
        path: '/editora',
        name: 'Editora',
        component: () => import(/* webpackChunkName: "Testes" */ '../views/Editora/EditoraView.vue')
    },
    {
        path: '/livro',
        name: 'Livro',
        component: () => import(/* webpackChunkName: "Testes" */ '../views/Livro/LivroView.vue')
    },
    {
        path: '/aluguel',
        name: 'Aluguel',
        component: () => import(/* webpackChunkName: "Testes" */ '../views/Aluguel/AluguelView.vue')
    },
    {
        path: '/estoque',
        name: 'Testes',
        component: () => import(/* webpackChunkName: "Testes" */ '../components/Testes.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/DashboardView.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
