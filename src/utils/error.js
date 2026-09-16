const criarError = (mensagem, status) => {
    const erro = new Error(mensagem);
    erro.status = status;
    return erro;
}