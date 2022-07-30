const errorHandler = (err, req, res, next) => {
  //   const statusCode = res.statusCode === 200 ? 500 : statusCode;
  //   res.status(statusCode);
  //   res.json({
  //     message: err.message,
  //     stack: process.env.NODE_ENV === "Production" ? null : err.stack,
  //   });
  var _send = res.send;
  var sent = false;
  res.send = function (data) {
    if (sent) return;
    _send.bind(res)(data);
    sent = true;
  };
  next();
};

// app.use((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error';

//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message
//     });
//   });

module.exports = { errorHandler };
