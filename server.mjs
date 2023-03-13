import express from 'express';
import cors from 'cors';
import Joke from "./joke.mjs";
import Dictionary from "./Dictionary/DictionaryModule.mjs";

const server = express();
const port = (process.env.PORT || 8080);
const en_joke = new Joke(Dictionary.en.joke);
const no_joke = new Joke(Dictionary.no.joke);

server.use(cors());

server.get('/movies', (req, res) => {
  const { searchText } = req.query;
  const apiKey = process.env.OMDB_API_KEY;
  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=7f396f86`;
  http.get(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      const movies = JSON.parse(data).Search;
      res.json({ movies });
    });
  }).on('error', (error) => {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  });
});

server.set('port', port);
server.use(express.static('public'));

server.get('/joke/en', (req, res) => {
  const joke = en_joke.tellAJoke().toString();
  res.json({ joke });
});

server.get('/joke/no', (req, res) => {
  const joke = no_joke.tellAJoke().toString();
  res.json({ joke });
});

server.listen(server.get('port'), function () {
  console.log('server running', server.get('port'));
});
