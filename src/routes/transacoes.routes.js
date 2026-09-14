import { Router } from "express";
import { adicionarTransacao, atualizarTransacao, buscarTransacaoPorId, deletarTransacao, listarTransacoes } from "../controllers/transacoes.controllers.js";

const router = Router();

router.get("/", listarTransacoes);
router.get("/:id", buscarTransacaoPorId);
router.post("/", adicionarTransacao);
router.put("/:id", atualizarTransacao);
router.delete("/:id", deletarTransacao);

export default router;
