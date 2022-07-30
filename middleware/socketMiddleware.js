// let app = require('express')
// let io = require('socket.io')(server);

// // place this middleware before any other route definitions
// // makes io available as req.io in all request handlers
// const socketIo = ()=> {
//     app.use(function(req, res, next) {
//         req.io = io;
//         next();
//     });
// }


// module.exports = {socketIo};

// // then in any express route handler, you can use req.io.emit(...)