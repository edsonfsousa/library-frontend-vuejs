import { http } from './config';

export default {
    listar: () => {
        return http.get('/editoras/buscartodos');
    },
    salvar: (editora) => {
        return http.post('/editoras/inserir', editora);
    },
    alterar: (editora) => {
        return http.put('/editoras/alterar', editora);
    },
    apagar: (editora) => {
        return http.delete('/editoras/deletar', { data: editora });
    }
};
