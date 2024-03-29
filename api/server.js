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

// [GET]
server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The users information could not be retrieved'
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    Users.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: `user with ${id} does not exist`
                })
            } else {
                res.status(200).json(user)
            }
        })
})

// [DELETE]

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    Users.remove(id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The user could not be removed'})
        })
})

// [PUT]

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    if(!name || !bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user'})
    } else {
        Users.update(id, { name, bio })
            .then(updated => {
                if(!updated) {
                    res.status(404).json({ message: 'The user with the specified ID does not exist'})
                } else {
                    res.json(updated)
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'The user information could not be modified'
                })
            })
    }
})