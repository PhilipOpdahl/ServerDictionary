# API Documentation

| Method       | Path           | Description   |
| :---         | :---           |  :---         |
| POST         | /users/login   | Logs in the user if the username and password match with what's inside the database    |
| POST         | /users/register | If a user doesn't already exist, a user will be registered      |
| GET          | /server/movies | This route retrieves a list of movies and sends it as a JSON response       |
| DELETE          | /server/watchlist | Deletes a movie placed in the watchlist      |
