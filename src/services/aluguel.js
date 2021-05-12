import { http } from './config';

export default {
    listar: () => {
        return http.get('/alugueis/buscartodos');
    },
    salvar: (aluguel) => {
        return http.post('/alugueis/inserir', aluguel);
    },
    alterar: (aluguel) => {
        return http.put('/alugueis/alterar', aluguel);
    },
    // devolvendo: (aluguel) => {
    //     return http.put('/alugueis/devolvendo', aluguel);
    // },
    apagar: (aluguel) => {
        return http.delete('/alugueis/deletar', { data: aluguel });
    }
};
