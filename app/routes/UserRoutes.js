module.exports = app => {
    const UserController = require("../controllers/UserController.js");

    app.get('/', UserController.helloWorld);

    // Create a new User
    app.post("/users", UserController.createUser);

    // Retrieve all Users
    app.get("/users", UserController.findAll);

    // Retrieve a single User with userId
    app.get("/users/:userId", UserController.findOne);

    // Update a User with userId
    app.put("/users/:userId", UserController.update);

    // Delete a User with userId
    app.delete("/users/:userId", UserController.delete);
};