import express from "express";
import logger from "./src/utils/logger";
import transacoesRoutes from "./src/routes/transacoes.router.js";
const app = express();

app.use(express.json());
app.use(logger);
app.use(transacoesRoutes);

app.get("/", (req, res) => {
    res.json({
        massage: "API funcionando"
    });
});

const PORT = 3002

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});