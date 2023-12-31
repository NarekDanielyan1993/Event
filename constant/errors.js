// MONGO ERRORS

export const MONGO_ERRORS = {
    DUPLICATE: {
        msg: 'User with this mail already exist.',
        status: 401,
    },
    CONNECTION: {
        msg: 'Could not connect to the database',
        status: 409,
    },
};

export const AUTH_ERROR_TYPES = {
    NOT_FOUND: {
        msg: 'User not found',
        status: 404
    }
}

// DEFAULT ERRORS

export const COMMON_ERROR_TYPES = {
    NOT_FOUND: {
        msg: 'Sorry, the requested resource could not be found.',
        status: 404,
        name: 'NotFoundError',
        title: 'Not Found Error',
    },
    FORBIDDEN: {
        msg: 'You are not authorized to access this resource.',
        status: 401,
        name: 'ForbiddenError',
        title: 'Forbidden Error',
    },
    UNAUTHORIZED: {
        msg: 'You are not authorized to perform this action.',
        status: 403,
        name: 'UnauthorizedError',
        title: 'Unauthorized Error',
    },
    VALIDATION_ERROR: {
        msg: 'Oops! There was an error with your request. Please check your input.',
        status: 400,
        name: 'ValidationError',
        title: 'Validation Error',
    },
    INTERNAL_SERVER_ERROR: {
        msg: 'Oops! Something went wrong. Please try again later.',
        status: 500,
        name: 'InternalServerError',
        title: 'Internal Server Error',
    },
    FILE_ERROR: {
        msg: 'An unexpected error occurred during file upload. Please try again later.',
        status: 500,
        name: 'MulterError',
        title: 'File Upload Error',
    },
    MONGO_ERROR: {
        msg: 'Oops! Something went wrong with the database. Please try again later.',
        status: 500,
        name: 'MongoServerError',
        title: 'Internal Server Error',
    },
};

export const FILE_ERROR_TYPES = {
    FILE_READ: {
        status: 500,
        msg: 'Error occurred while reading the file.',
    },
    LIMIT_FILE_SIZE: {
        msg: 'File size exceeds the limit',
        status: 400,
        name: 'LIMIT_FILE_SIZE',
    },
    LIMIT_UNEXPECTED_FILE: {
        msg: 'Unexpected file field',
        status: 400,
        name: 'LIMIT_UNEXPECTED_FILE',
    },
    NO_FILE_FIELD: {
        msg: 'No file uploaded',
        status: 400,
        name: 'NO_FILE_FIELD',
    },
    NO_FILE_FOUND: {
        msg: 'No file found',
        status: 400,
        name: 'NO_FILE_FOUND',
    },
    DELETE_FILE: {
        msg: 'Failed to delete file',
        status: 500,
        name: 'DELETE_FILE',
    },
    INVALID_FILE_TYPE: {
        msg: 'Invalid file type',
        status: 400,
        name: 'INVALID_FILE_TYPE',
    },
    DEFAULT: {
        msg: 'File upload error',
        status: 400,
        name: 'DEFAULT',
    },
};

export const DEFAULT_VALIDATION_ERRORS = {
    'any.required': 'Is a required field',
    'string.base': "Should be a type of 'text'",
    'string.empty': 'Is a required field',
    'string.min': 'Minimum length is required',
    'string.email': 'Invalid email address',
    'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
};

// SECTION ERRORS

// COMMENTS

export const COMMENT_ERRORS = {
    ADD_COMMENT: 'Failed to add comment',
    EDIT_COMMENT: 'Failed to edit comment',
    DELETE_COMMENT: 'Failed to delete comment',
};
