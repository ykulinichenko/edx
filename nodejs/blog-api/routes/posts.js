const router = require('express').Router();
const postsManager = require('../data/posts-manager');

router.get('/', (request, response) => {
  const posts = postsManager.getAll();
  response.status(200).send(posts);
});

router.get('/:id', (request, response) => {
  const post = postsManager.get(request.params.id);
  response.status(200).send(post);
});

router.post('/', (request, response) => {
  const newPost = postsManager.create(request.body);
  response.status(201).send(newPost);
});

router.put('/:id', (request, response) => {
  const post = postsManager.update(request.params.id, request.body);
  response.status(200).send(post);
});

router.delete('/:id', (request, response) => {
  const post = postsManager.delete(request.params.id);
  response.status(204).end();
});

module.exports = router;