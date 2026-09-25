type ErrorDetails = unknown;

export class AppError extends Error {
    public readonly errorCode: string;
    public readonly statusCode: number;
    public readonly details: ErrorDetails;

    constructor(
        errorCode: string,
        message: string,
        statusCode: number = 500,
        details?: ErrorDetails
    ) {
    super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.details = details;

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
