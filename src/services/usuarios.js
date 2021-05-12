import { http } from './config';

export default {
    listar: () => {
        return http.get('/usuarios/buscartodos');
    },
    salvar: (usuario) => {
        return http.post('/usuarios/inserir', usuario);
    },
    alterar: (usuario) => {
        return http.put('/usuarios/alterar', usuario);
    },
    apagar: (usuario) => {
        return http.delete('/usuarios/deletar', { data: usuario });
    }
};
