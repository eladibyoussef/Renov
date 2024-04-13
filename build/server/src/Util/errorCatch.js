"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const catchError = (error) => {
    let message;
    if (error instanceof Error) {
        message = error.message;
    }
    else if (error && typeof error === 'object' && 'message' in error) {
        message = String(error.message);
    }
    else if (typeof error === "string") {
        message = error;
    }
    else {
        message = "Somthing went wrong";
    }
    console.log('catched error', message);
    return message;
};
exports.catchError = catchError;
