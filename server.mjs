import express from 'express';
import userRoute from './routes/users.mjs';
import movies from './public/js/Images.mjs';

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));
server.use(express.json());
server.use('/users', userRoute);

server.get('/movies', (req, res) => {
  res.json({ movies });
});

server.delete('/watchlist/:imdbID', (req, res) => {
  const imdbID = req.params.imdbID;
  res.json({ imdbID });
});

server.listen(server.get('port'), function () {
  console.log('server running', server.get('port'));
});