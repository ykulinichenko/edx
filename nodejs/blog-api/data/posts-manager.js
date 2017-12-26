const validator = require('../validators/post-validator');
const selector = require('../selectors/post-selector');
const NotFoundError = require('../errors/not-found-error');

const storage = require('./storage');
const data = storage.getData();

class PostsManager {
  getAll() {
    return Object.keys(data)
      .map(x => data[x])
      .map(x => selector.select(x));
  }

  get(id) {
    const key = id.toString();

    storage.checkPostExists(key);

    return selector.select(data[key]);
  }

  create(post) {
    validator.validateCreate(post);

    const ids = Object.keys(data).map(x => +x);
    const newId = Math.max(...ids, 0) + 1;
    data[newId.toString()] = post;
    post.id = newId;
    post.comments = {};
    return selector.select(post);
  }

  update(id, post) {
    validator.validateUpdate(put);

    const key = id.toString();

    storage.checkPostExists(key);

    post.id = id;
    data[key] = Object.assign(data[key], post);
    return selector.select(post);
  }

  delete(id) {
    const key = id.toString();
    
    storage.checkPostExists(key);

    delete data[key];
  }
}

module.exports = new PostsManager();