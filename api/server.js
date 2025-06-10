const express = require('express');
const User = require('./users/model');
const server = express();

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ 
                message: 'Error fetching users',
                err: err.message,
                stack: err.stack,
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({ 
                message: 'Error fetching user',
                err: err.message,
                stack: err.stack,
            })
        })
})




server.use('', (req, res) => {
    res.status(404).json({ message: 'not found' });
})

module.exports = server; 
