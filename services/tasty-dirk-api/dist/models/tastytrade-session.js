"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var TastytradeSession = /** @class */ (function () {
    function TastytradeSession() {
        this.authToken = null;
    }
    Object.defineProperty(TastytradeSession.prototype, "isValid", {
        get: function () {
            return !lodash_1.default.isNil(this.authToken);
        },
        enumerable: false,
        configurable: true
    });
    TastytradeSession.prototype.clear = function () {
        this.authToken = null;
    };
    return TastytradeSession;
}());
exports.default = TastytradeSession;
