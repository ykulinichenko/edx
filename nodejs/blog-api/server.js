const express = require('express');
const app = express();

const postsRoute = require('./routes/posts');
const commentsRoute = require('./routes/comments');

const NotFoundError = require('./errors/not-found-error');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/posts', postsRoute);
app.use('/posts', commentsRoute);

app.use('*', (req, res, next) => {
  throw new NotFoundError('URL was not found');
})

app.use((err, req, res, next) => {
  res.status(err.code || 500).end(err.message);
})

app.listen(3030, () => {
  console.log('Server was started and is listening at port 3030');
});