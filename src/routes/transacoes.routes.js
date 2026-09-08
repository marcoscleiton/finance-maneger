import { Router } from "express";
import { adicionarTransacao } from "../controllers/transacoes.controllers.js";

const router = Router();

router.post("/", adicionarTransacao);

export default router;
