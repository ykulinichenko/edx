const router = require('express').Router();
const commentsManager = require('../data/comments-manager');

const urlPrefix = '/:postId/comments';

router.get(urlPrefix, (request, response) => {
  const comments = commentsManager.getAll(request.params.postId);
  response.status(200).send(comments);
});

router.get(`${urlPrefix}/:id`, (request, response) => {
  const comment = commentsManager.get(request.params.postId, request.params.id);
  response.status(200).send(comment);
});

router.post(urlPrefix, (request, response) => {
  const newComment = commentsManager.create(request.params.postId, request.body);
  response.status(201).send(newComment);
});

router.put(`${urlPrefix}/:id`, (request, response) => {
  const comment = commentsManager.update(request.params.postId, request.params.id, request.body);
  response.status(200).send(comment);
});

router.delete(`${urlPrefix}/:id`, (request, response) => {
  const comment = commentsManager.delete(request.params.postId, request.params.id);
  response.status(204).end();
});

module.exports = router;