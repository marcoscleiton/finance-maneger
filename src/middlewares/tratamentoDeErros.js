import logger from "../utils/logger.js";

function tratamentoDeErro(erro, req, res, next) {
    logger(erro);
    
    const status = erro.status || 500;
    const mensagem = status === 500 ? "Erro ao tentar acessar o servidor" : erro.message;

    res.status(status).json({ erro: mensagem });
}

export default tratamentoDeErro;