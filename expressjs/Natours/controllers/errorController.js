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

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
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
};
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
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
        sendErrorProd(error, res);
    }
};
