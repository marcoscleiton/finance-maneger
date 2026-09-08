import pool from "../db/connection.js";

const adicionarTransacao = async (req, res, next) => {
    try {
        const { descricao, valor, tipo, data, categoria } = req.body;

        const resultado = await pool.query(
            "INSERT INTO transacoes (descricao, valor, tipo, data, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [descricao, valor, tipo, data, categoria]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        next(error);
    }
};

export { adicionarTransacao };