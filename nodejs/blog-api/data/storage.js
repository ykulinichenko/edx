const NotFoundError = require('../errors/not-found-error');

const internalStorage = {};

class Storage {
  getData() {
    return internalStorage;
  }

  checkPostExists(id) {
    if (!internalStorage[id.toString()]) {
      throw new NotFoundError('Could not find the post');
    }
  }

  checkCommentExists(postId, commentId) {
    this.checkPostExists(postId);
    
    const post = internalStorage[postId.toString()]
    if (!post.comments[commentId.toString()]) {
      throw new NotFoundError('Could not find the comment');
    }
  }
}

module.exports = new Storage();