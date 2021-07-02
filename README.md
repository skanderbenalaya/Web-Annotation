# Web-Annotation
 
### Requirements
- [Node.js](https://nodejs.org/en/) (v14.16+)
- [NPM](https://www.npmjs.com/) (v7.10+)
- [MongoDB](https://mongodb.com/) (v4.4.4+)

### Configuration

You can find configurable options, like the port the server is running on, in `/server/.env`.
For example:

```
JWT_SECRET = your_jwt_secret
REFRESH_TOKEN_SECRET = your_refresh_token_secret
SESSION_EXPIRY = 60 * 15
REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 30
MONGO_DB_CONNECTION_STRING = mongodb://127.0.0.1:27017/YourDbName
COOKIE_SECRET = your_cookie_secret
WHITELISTED_DOMAINS = http://localhost:3001 //client adress
PORT = 3000 //server port
```

### Install JavaScript dependencies
Once the required components are installed, run the following command:

```
> npm install
```

## Bulk question insertion

Make sure the server and database are configured and running.
To insert a list of questions use the following api path :
`localhost:3000/api/question/multi`
with a body as follows :
```
[
    {
        "question": "Question 1"
    },
    {
        "question": "Question 2"
    },
    {
        "question": "Question 3"
    },
    {
        "question": "Question 4"
    }
]
```


## How to start both client and server

Inside root directory execute one of the following commands:

### Linux-Windows users

    `npm run start`

### Mac users

    `npm run start-mac`

## How to start client only

### Linux-Windows users

    `npm run dev`

### Mac users

    `npm run dev-mac`

## How to start server only

`cd` into the server directory and execute the following command:

### prod

    `npm run start`

### dev

    `npm run server`
