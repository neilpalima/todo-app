export class NotFoundError extends Error {
    public error_code: string;

    public status: number;

    constructor(message: string) {
        super(message);

        // So you can do typeof CustomError
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = this.constructor.name;
        this.error_code = 'NOT_FOUND_ERROR';
        this.status = 404;
    }
}
