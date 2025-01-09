const express = require("express");
const app = express();

// Importo il router delle rotte dei post
const postsRouter = require("./routers/posts");

// Utilizzo il middleware
app.use(express.json());

// Imposto il routing con il router dei post
app.use("/", postsRouter);

// Middleware per gestire rotte non registrate
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint non trovato" });
});
// Middleware per la gestione dell'errore
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Errore del server. Riprova più tardi." });
});

// Imposto la porta
const port = 3000;

// Avvio il server sulla porta specificata
app.listen(port, () => {
  console.log(`Server in esecuzione sulla porta ${port}`);
});
