import {
    COMMON_ERROR_TYPES,
    FILE_ERROR_TYPES,
    MONGO_ERRORS,
} from 'constant/errors';

export class HttpError extends Error {
    constructor(
        message = COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.msg,
        statusCode = COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.status,
        name = COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.name,
        title = COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.title,
        errors = []
    ) {
        super(message);
        this.status = statusCode;
        this.errors = errors;
        this.msg = message;
        this.name = name;
        this.title = title;
    }
}

export class ValidationError extends HttpError {
    constructor(message, status, err) {
        super(
            message || COMMON_ERROR_TYPES.VALIDATION_ERROR.msg,
            status || COMMON_ERROR_TYPES.VALIDATION_ERROR.status,
            COMMON_ERROR_TYPES.VALIDATION_ERROR.name,
            COMMON_ERROR_TYPES.VALIDATION_ERROR.title,
            err?.errors || []
        );
    }
}

class MongoNetworkError extends HttpError {
    constructor(message, status) {
        super(
            message || MONGO_ERRORS.CONNECTION.msg,
            status || MONGO_ERRORS.CONNECTION.status,
            COMMON_ERROR_TYPES.MONGO_ERROR.name,
            COMMON_ERROR_TYPES.MONGO_ERROR.title
        );
    }
}

class MongoDuplicateError extends HttpError {
    constructor(message, status) {
        super(
            message || MONGO_ERRORS.DUPLICATE.msg,
            status || MONGO_ERRORS.DUPLICATE.status,
            COMMON_ERROR_TYPES.MONGO_ERROR.name,
            COMMON_ERROR_TYPES.MONGO_ERROR.title
        );
    }
}

export class NotFoundError extends HttpError {
    constructor(message, status) {
        super(
            message || COMMON_ERROR_TYPES.NOT_FOUND.msg,
            status || COMMON_ERROR_TYPES.NOT_FOUND.status,
            COMMON_ERROR_TYPES.NOT_FOUND.name,
            COMMON_ERROR_TYPES.NOT_FOUND.title
        );
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message, status) {
        super(
            message || COMMON_ERROR_TYPES.UNAUTHORIZED.msg,
            status || COMMON_ERROR_TYPES.UNAUTHORIZED.status,
            COMMON_ERROR_TYPES.UNAUTHORIZED.name,
            COMMON_ERROR_TYPES.UNAUTHORIZED.title
        );
    }
}

export class ForbiddenError extends HttpError {
    constructor(message, status) {
        super(
            message || COMMON_ERROR_TYPES.FORBIDDEN.msg,
            status || COMMON_ERROR_TYPES.FORBIDDEN.status,
            COMMON_ERROR_TYPES.FORBIDDEN.name,
            COMMON_ERROR_TYPES.FORBIDDEN.title
        );
    }
}

export class InternalServerError extends Error {
    constructor(message, status) {
        super(
            message || COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.msg,
            status || COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.status,
            COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.name,
            COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.title
        );
    }
}

export class FileError extends HttpError {
    constructor(message, status) {
        super(
            message || COMMON_ERROR_TYPES.FILE_ERROR.msg,
            status || COMMON_ERROR_TYPES.FILE_ERROR.status,
            COMMON_ERROR_TYPES.FILE_ERROR.name,
            COMMON_ERROR_TYPES.FILE_ERROR.title
        );
    }
}

export class ErrorHandler {
    static handleError(error, message, status) {
        switch (error.name) {
            case COMMON_ERROR_TYPES.VALIDATION_ERROR.name: {
                return ErrorHandler.handleValidationError(
                    error,
                    message,
                    status
                );
            }
            case COMMON_ERROR_TYPES.NOT_FOUND.name: {
                return ErrorHandler.handleNotFound(error, message, status);
            }
            case COMMON_ERROR_TYPES.FORBIDDEN.name: {
                return ErrorHandler.handleForbidden(error, message, status);
            }
            case COMMON_ERROR_TYPES.UNAUTHORIZED.name: {
                return ErrorHandler.handleUnauthorized(error, message, status);
            }
            case COMMON_ERROR_TYPES.FILE_ERROR.name: {
                return ErrorHandler.handleMulterError(error, message, status);
            }
            case COMMON_ERROR_TYPES.MONGO_ERROR.name: {
                return ErrorHandler.handleMongoError(error, message);
            }
            default: {
                return ErrorHandler.handleInternalError(error, message, status);
            }
        }
    }

    static handleValidationError(err, message, status) {
        const error = new ValidationError(
            message || err.msg,
            status || err?.status,
            err
        );

        return error;
    }

    static handleNotFound(err, message, status) {
        const error = new NotFoundError(
            message || err?.msg,
            status || err?.status
        );

        return error;
    }

    static handleUnauthorized(err, message, status) {
        const error = new UnauthorizedError(
            message || err?.msg,
            status || err?.status
        );

        return error;
    }

    static handleForbidden(err, message, status) {
        const error = new ForbiddenError(
            message || err?.msg,
            status || err?.status
        );

        return error;
    }

    static handleInternalError(err, message, status) {
        const error = new InternalServerError(
            message || err?.msg,
            status || err?.status
        );

        return error;
    }

    static handleMongoError(err, msg) {
        if (err.code === 11000) {
            const error = new MongoDuplicateError(msg);

            return error;
        }
        if (err.name === MongoNetworkError.name) {
            const error = new MongoNetworkError(msg);

            return error;
        }
        const error = new HttpError(msg);

        return error;
    }

    static handleMulterError(err, message, status) {
        if (err.code === FILE_ERROR_TYPES.LIMIT_FILE_SIZE.name) {
            return new FileError(
                FILE_ERROR_TYPES.LIMIT_FILE_SIZE.msg,
                FILE_ERROR_TYPES.LIMIT_FILE_SIZE.status
            );
        }

        const fileError = new FileError(
            message || err?.msg,
            status || err?.status
        );

        return fileError;
    }
}

export const handleError = (error, res) => {
    const err = ErrorHandler.handleError(error);

    console.error('onError', err);
    res.status(
        err.status || COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.status
    ).json(err);
};

export const logError = (error, info) => {
    console.error('Error Logging: ', error);
    console.error('Error Info: ', info);
};
