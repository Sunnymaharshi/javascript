const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const message = `Duplicate field value: ${err.keyValue.name}. please use another value.`;
    return new AppError(message, 400);
};
const handleValidationDB = (err) => {
    const message = Object.values(err.errors)
        .map((el) => el.properties.message)
        .join('. ');
    return new AppError(message, 400);
};

const handleJWTError = () =>
    new AppError('Invalid token. please login again!', 401);

const handleJWTExpiredError = () =>
    new AppError('Your token has expired. please login again!', 401);

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }

    // B) RENDERED WEBSITE
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message,
    });
};
const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        // A) Operational, trusted error: send message to client
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        } else {
            //console.error('Error:', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong!',
            });
        }
    }
    // B) RENDERED WEBSITE
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
        console.log(err);
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message,
        });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: 'Please try again later.',
    });
};
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);
    else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        if (error.name === 'CastError' || error.kind === 'ObjectId') {
            error = handleCastErrorDB(error);
        } else if (error.code === 11000) {
            error = handleDuplicateFieldsDB(error);
        } else if (error._message && error._message.includes('validation')) {
            error = handleValidationDB(error);
        } else if (error.name === 'JsonWebTokenError') {
            error = handleJWTError(error);
        } else if (error.name === 'TokenExpiredError') {
            error = handleJWTExpiredError(error);
        }
        sendErrorProd(error, req, res);
    }
};
