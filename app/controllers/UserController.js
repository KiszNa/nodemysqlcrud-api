const User = require("../models/UserModel.js");

exports.helloWorld = function(req, res) {
    res.send('node js api looks cool!');
};

// Create and Save a new User
exports.createUser = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else
            res.send(data);
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Retrieve a single User from the database.
exports.findOne = (req, res) => {
    console.log(req.params.userId);
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message : `Not found User with id ${req.params.userId}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }

        } else {
            res.send(data);
        }
    })
};

//Update User by userId
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    console.log(req.body);
    User.updateById(req.params.userId, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind = "not_found") {
                res.status(404).send({
                    message: `not found User with id ${req.params.userId}`
                });
            } else {
                res.status(500).send({
                    message: "Error updating User with id " + req.params.userId
                });
            }
        } else {
            res.send(data);
        }
    });
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind = "not_found") {
                res.status(404).send({
                   message: `Not found user with id ${req.params.userId}`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.userId
                });
            }
        } else {
            res.send({
                message: "User is deleted successfully"
            });
        }
    });
};
