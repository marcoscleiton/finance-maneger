import express from "express";
import logger from "./src/utils/logger.js";
import transacoesRoutes from "./src/routes/transacoes.routes.js";
const app = express();

app.use(express.json());
app.use(logger);
app.use("/transacoes", transacoesRoutes);

app.get("/", (req, res) => {
    res.json({
        massage: "API funcionando"
    });
});

const PORT = 3002

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});