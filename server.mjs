import express from 'express';
import userRoute from './routes/users.mjs';

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));
server.use(express.json());
server.use('/users', userRoute);

const movies = [
    {
      Title: 'Star Wars: The Force Awakens',
      Poster: '/images/Poster1.jpg',
      imdbID: 'tt001',
    },
    {
      Title: '1917',
      Poster: '/images/Poster2.jpg',
      imdbID: 'tt002',
    },
    {
      Title: 'Joker',
      Poster: '/images/Poster3.jpg',
      imdbID: 'tt003',
    },
    {
      Title: 'Annette',
      Poster: '/images/Poster4.jpg',
      imdbID: 'tt004',
    },
    {
      Title: 'Pulp Fiction',
      Poster: '/images/Poster5.jpg',
      imdbID: 'tt005',
    },
    {
      Title: 'Jurassic Park',
      Poster: '/images/Poster6.jpeg',
      imdbID: 'tt006',
    },
    {
      Title: 'Hard Candy',
      Poster: '/images/Poster7.jpg',
      imdbID: 'tt007',
    },
    {
      Title: 'Matrix',
      Poster: '/images/Poster8.jpeg',
      imdbID: 'tt008',
    },
  ];

  server.get('/movies', (req, res) => {
    res.json({ movies });
  });

server.listen(server.get('port'), function () {
  console.log('server running', server.get('port'));
});