"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var app = express_1.default();
var port = 3000;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(function (error, request, response, next) {
    if (error instanceof AppError_1.default) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(port, function () {
    return console.log('\n\nServer started at http://localhost:' + port);
});
