// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express()

server.use(express.json())

module.exports = server; // EXPORT YOUR SERVER instead of {}
