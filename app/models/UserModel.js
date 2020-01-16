const connection = require("./DbConnection.js");

// constructor
const User = function(user) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
};

User.create = (newUser, result) => {
    connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.getAll = result => {
    connection.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.findById = (userId, result) => {
    connection.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    })
};

User.updateById = (id, user, result) => {
  connection.query(
      "UPDATE users SET email = ?, firstName = ?, lastName = ? WHERE id = ?",
      [user.email, user.firstName, user.lastName, id],
      (err, res) => {
          if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
          }
          if (res.affectedRows == 0) {
              result({ kind: "not_found" }, null);
              return;
          }
          console.log("updated user: ", { id: id, ...user });
          result(null, { id: id, ...user });
      });
};

User.remove = (id, result) => {
    connection.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: "not found"}, null);
            return;
        }
        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

module.exports = User;