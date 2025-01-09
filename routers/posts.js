// Importo il modulo express e creo un nuovo router
const express = require("express");
const router = express.Router();

// Importo il controller che gestisce la logica delle rotte
const postsController = require("../controllers/postsController");

// Rotta per ottenere tutti i post
router.get("/posts", postsController.getAllPosts);

// Rotta per ottenere un singolo post
router.get("/posts/:id", postsController.getPostById);

// Rotta per eliminare un post
router.delete("/posts/:id", postsController.deletePost);

// Rotta per aggiungere un nuovo post
router.post("/posts", postsController.addPost);

// Rotta per aggiornare un post
router.put("/posts/:id", postsController.updatePost);

module.exports = router;
