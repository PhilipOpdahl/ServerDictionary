import express from 'express'
import  Joke from "./joke.mjs"
import Dictionary from "./Dictionary/DictionaryModule.mjs"

const server = express();
const port = (process.env.PORT || 8080);
const en_joke = new Joke(Dictionary.en.joke);
const no_joke = new Joke(Dictionary.no.joke);


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