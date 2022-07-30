const bcrypt = require("bcryptjs");

const Users = [
    {
        name:"admin",
        email:"admin@gmail.com",
        password:bcrypt.hashSync("123",10),
        mobile:"9421000000",
        isAdmin:true
    }
]

module.exports = Users;