"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractResponseData(httpResponse) {
    if (lodash_1.default.has(httpResponse, 'data.data.items')) {
        return lodash_1.default.get(httpResponse, 'data.data.items');
    }
    else if (lodash_1.default.has(httpResponse, 'data.data')) {
        return lodash_1.default.get(httpResponse, 'data.data');
    }
    else {
        return httpResponse;
    }
}
exports.default = extractResponseData;
// add login parser here
// create unit tests for login parser, extractreponsedata
