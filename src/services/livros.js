import { http } from './config';

export default {
    listar: () => {
        return http.get('/livros/buscartodos');
    },
    salvar: (livro) => {
        return http.post('/livros/inserir', livro);
    },
    alterar: (livro) => {
        return http.put('/livros/alterar', livro);
    },
    apagar: (livro) => {
        return http.delete('/livros/deletar', { data: livro });
    },
    listardisp: () => {
        return http.get('/livros/buscardisp');
    }
};
