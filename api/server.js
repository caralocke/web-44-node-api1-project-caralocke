// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express()

server.use(express.json())

module.exports = server; // EXPORT YOUR SERVER instead of {}

// [POST]

server.post('/api/users', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user'})
    } else {
        const { name, bio } = req.body
        Users.insert({ name, bio })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'There was an error while saving the user to the database',
                })
            })
    }
})