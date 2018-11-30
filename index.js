// implement your API here
const express = require("express");

const db = require("./data/db");

const server = express();
const PORT = 4000;

server.use(express.json())

server.get("/api/users", (req, res) => {
    server.disable('etag')
db.find()
    .then(users => {
    res.json(users);
    })
    .catch(err => {
        res
            .status(500)
            .json({ message: "failed to get users" });
    });
});

server.get("/api/users/:id", (req, res) => {
const { id } = req.params;
db.findById(id)
    .then(user => {
        if (user) {
            res.json(user);
        }
        else {
            res
                .status(404)
                .json({message: 'user does not exist'})
    }
    })
    .catch(err => {
        res
            .status(404)
            .json({ message: "failed to get users" })
    }
    );
});

server.post("/api/users", (req, res) => {
    const user = req.body;
    console.log('user in body', user)

    if (user.name && user.bio) {
    db.insert(user)
        .then(response => {

                db.findById(response.id).then(user => {

                    res.status(201).json(user)
                })
            })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get users" })
        })
} else {
        res.status(400).json({message: "missing name or bio"})
}
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
        .then(count => {
            if (count) {
                //something been deleted
                //send back user (this is a cheater way)
                res.json({
                    message: "Successfully Deleted"})
            } else {
                //If there is no id or already deleted
                res.status(404)
                    .json({message:"invalid id"})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to delete user" })
        })
})


server.put('/api/users/:id', (req, res) => {
    const user = req.body;
    const { id } = req.params;

    if (user.name && user.bio) {
        db.update(id, user)
            .then(count => {
                if (count) {
                    db.findById(id).then(user => {
                        res
                        .json(user)

                    })
                } else {
                    res.status(404)
                    .json({message:"invalid id"})
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: "failed to get users" })
            })
    }
    else {
        res.status(400)
            .json({message:"Missing your name or bio"})
    }

})


server.listen(PORT, () => {
console.log(`server is up and running ${PORT}`);
});
