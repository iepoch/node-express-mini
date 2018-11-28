// implement your API here
const express = require("express");

const db = require("./data/db");

const server = express();
const PORT = 4000;

server.get("/api/users", (request, response) => {
db.find()
    .then(users => {
    response.json(users);
    })
    .catch(err => {
        response
            .status(500)
            .json({ message: "failed to get users" });
    });
});

server.get("/api/users/:id", (request, response) => {
const { id } = request.params;
db.findById(id)
    .then(user => {
        if (user) {
            response.json(user);
        }
        else {
            response
                .status(404)
                .json({message: 'user does not exist'})
    }
    })
    .catch(err => {
        response
            .status(404)
            .json({ message: "failed to get users" })
    }
    );
});

server.listen(PORT, () => {
console.log(`server is up and running ${PORT}`);
});
