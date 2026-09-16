import pool from "../db/connection.js";
import { criarErro } from "../utils/error.js";

const adicionarTransacao = async (req, res, next) => {
    try {
        const { descricao, valor, tipo, data, categoria_id } = req.body;

        if (typeof descricao !== "string") {
           throw criarErro("O valor inserido deve ser um texto", 400);
        }

        if (typeof valor !== "number") {
            throw criarErro("O valor inserido deve ser um número", 400)
        }

        if (valor <= 0) {
            throw criarErro("O valor deve ser maior que zero", 400);
        }

        if (typeof tipo !== "string" || (tipo !== "entrada" && tipo !== "saida")) {
            throw criarErro("O tipo deve ser 'entrada' ou 'saída'", 400);
        }

        if (typeof data !== "string") {
            throw criarErro("A data deve ser um texto", 400);
        }

        if (typeof categoria_id !== "number") {
            throw criarErro("categoria_id deve ser um número", 400);
        }

        const resultado = await pool.query(
            "INSERT INTO transacoes (descricao, valor, tipo, data, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [descricao, valor, tipo, data, categoria_id]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        next(error);
    }
};

const listarTransacoes = async (req, res, next) => {
    try {
        const resultado = await pool.query("SELECT * FROM transacoes");

        res.json(resultado.rows);
    } catch (error) {
        next(error);
    }
};

const buscarTransacaoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query("SELECT * FROM transacoes WHERE id = $1", [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Transação não encontrada" });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        next(error);
    }
};

const atualizarTransacao = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { descricao, valor, tipo, categoria_id, data } = req.body;
        
        if (descricao !== undefined && typeof descricao !== "string") {
            throw criarErro("A descrição deve ser um texto", 400);
        }
        
        if (valor !== undefined && typeof valor !== "number") {
            throw criarErro("O valor deve ser um número", 400);
        }

        if (tipo !== undefined && typeof tipo !== "string") {
            throw criarErro("O valor deve ser um texto", 400);
        }
        
        if (categoria_id !== undefined && typeof categoria_id !== "number") {
            throw criarErro("O valor deve ser um número", 400);
        }

        if (data !== undefined && typeof data !== "string") {
            throw criarErro("O valor deve ser um texto", 400);
        }

        const resultado = await pool.query(
        `UPDATE transacoes 
         SET descricao = COALESCE($1, descricao),
         valor = COALESCE($2, valor),
         tipo = COALESCE($3, tipo),
         categoria_id = COALESCE($4, categoria_id),
         data = COALESCE($5, data)
         WHERE id = $6
         RETURNING *`,
        [descricao, valor, tipo, categoria_id, data, id]
);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Transação não encontrada" });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deletarTransacao = async (req, res, next) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM transacoes WHERE id = $1 RETURNING *",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Transação não encontrada" });
        }

        res.json({ message: "Transação deletada com sucesso", transacao: resultado.rows[0] });
    } catch (error) {
        next(error);
    }
};

export { adicionarTransacao, listarTransacoes, buscarTransacaoPorId, atualizarTransacao, deletarTransacao };