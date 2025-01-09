const posts = require("../data/postsData");

// Funzione per ottenere tutti i post
const getAllPosts = (req, res) => {
  // Restituisco l'intero array dei post in formato JSON
  res.json(posts);
};

// Funzione per ottenere un singolo post
const getPostById = (req, res) => {
  // Cerco il post che corrisponde all'ID passato come parametro nella richiesta
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  // Se il post non viene trovato, restituisco un errore 404
  if (!post) return res.status(404).send("Post non trovato");

  // Se il post viene trovato, restituisco il post
  res.json(post);
};

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

// Funzione per eliminare un post
const deletePost = (req, res) => {
  // Trovo l'indice del post nell'array che corrisponde all'ID passato
  const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));

  // Se il post non viene trovato, restituisco un errore 404
  if (postIndex === -1) return res.status(404).send("Post non trovato");

  // Rimuovo il post trovato dall'array dei post
  posts.splice(postIndex, 1);

  // Rispondo con un codice di stato 204  per indicare che il post è stato eliminato con successo
  res.status(204).send();
};

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
