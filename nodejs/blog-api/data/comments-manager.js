const validator = require('../validators/comment-validator');
const NotFoundError = require('../errors/not-found-error');

const storage = require('./storage');
const data = storage.getData();

class CommentsManager {
  getAll(postId) {
    const postKey = postId.toString();
    
    storage.checkPostExists(postKey);
    
    const post = data[postKey];

    return Object.keys(post.comments).map(x => post.comments[x]);
  }

  get(postId, commentId) {
    const postKey = postId.toString();
    const commentKey = commentId.toString();

    storage.checkCommentExists(postKey, commentKey);

    return data[postKey][commentKey];
  }

  create(postId, comment) {
    validator.validateCreate(comment);

    const postKey = postId.toString();

    storage.checkPostExists(postKey);

    const post = data[postKey];
    const ids = Object.keys(post.comments).map(x => +x);
    const newId = Math.max(...ids, 0) + 1;
    post.comments[newId.toString()] = comment;
    comment.id = newId;
    return comment;
  }

  update(postId, commentId, comment) {
    validator.validateUpdate(comment);

    const postKey = postId.toString();
    const commentKey = commentId.toString();
    
    storage.checkCommentExists(postKey, commentKey);

    const post = data[postKey];
    comment.id = commentId;
    post.comments[commentKey] = comment;
    return comment;
  }

  delete(postId, commentId) {
    const postKey = postId.toString();
    const commentKey = commentId.toString();
    
    storage.checkCommentExists(postKey, commentKey);

    const post = data[postKey];
    delete post.comments[commentKey];
  }
}

module.exports = new CommentsManager();