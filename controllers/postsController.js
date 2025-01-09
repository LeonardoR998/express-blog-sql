const connection = require("../db/conn");

const posts = require("../data/postsData");

// ! INDEX ///

// Funzione per ottenere tutti i post
const getAllPosts = (req, res) => {
  const sql = "SELECT * FROM `posts`";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
};

// ! SHOW ///

// Funzione per ottenere un singolo post
const getPostById = (req, res) => {
  const sql = "SELECT * FROM `posts` WHERE `id` = ?";
  const postId = parseInt(req.params.id);

  connection.query(sql, [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(results[0]);
  });
};

// ! CREATE ///

// Funzione per aggiungere un nuovo post
const addPost = (req, res) => {
  // Estraggo i dati del post dal corpo della richiesta (req.body)
  const { title, content, image, tags } = req.body;

  // Controllo se tutti i campi necessari sono stati forniti nella richiesta
  if (!title || !content || !image || !tags) {
    // Se qualche campo è mancante, restituisco un errore 400
    return res.status(400).send("Dati insufficienti per creare un post.");
  }

  // Creo un nuovo oggetto post con i dati ricevuti
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    image,
    tags,
  };

  // Aggiungo il nuovo post all'array dei post
  posts.push(newPost);

  // Restituisco il nuovo post
  res.status(201).json(newPost);
};

// ! DELETE///

// Funzione per eliminare un post
const deletePost = (req, res) => {
  const sql = "DELETE FROM `posts` WHERE `id` = ?";
  const id = parseInt(req.params.id);

  connection.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Errore interno al server." });
    }

    res.sendStatus(204);
  });
};

// ! UPDATE ///

// Funzione per aggiornare un post
const updatePost = (req, res) => {
  // Trovo il post che corrisponde all'ID
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  // Se il post non viene trovato, restituisco un errore 404
  if (!post) return res.status(404).send("Post non trovato");

  // Aggiorno solo i campi che sono stati forniti nel corpo della richiesta
  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.image) post.image = req.body.image;
  if (req.body.tags) post.tags = req.body.tags;

  // Restituisco il post
  res.json(post);
};

// Esporto le funzioni
module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  deletePost,
  updatePost,
};
