import logger from "../utils/logger.js";

function tratamentoDeErro(erro, req, res, next) {
    logger(erro);
    res.status(500).json({ erro: "Erro ao tentar acessar o servidor" });
}

export default tratamentoDeErro;