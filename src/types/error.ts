type ErrorDetails = unknown;

export class AppError extends Error {
    constructor(
        public readonly errorCode: string,
        message: string,
        public readonly statusCode: number = 500,
        public readonly details?: ErrorDetails
    ) {
    super(message);

    this.name = 'AppError';
    Object.setPrototypeOf(this, new.target.prototype);
    }


    toJSON() {
        return {
        errorCode: this.errorCode,
        message: this.message,
        details: this.details,
        statusCode: this.statusCode
        };
    }
}
