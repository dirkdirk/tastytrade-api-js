"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dasherize = exports.recursiveDasherizeKeys = exports.JsonBuilder = void 0;
var lodash_1 = __importDefault(require("lodash"));
var JsonBuilder = /** @class */ (function () {
    function JsonBuilder(json) {
        if (json === void 0) { json = {}; }
        this.json = json;
    }
    JsonBuilder.prototype.add = function (key, value, serializeEmpty) {
        if (serializeEmpty === void 0) { serializeEmpty = false; }
        if ((lodash_1.default.isNil(value) || value === '') && !serializeEmpty) {
            return this;
        }
        this.json[key] = value;
        return this;
    };
    return JsonBuilder;
}());
exports.JsonBuilder = JsonBuilder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function recursiveDasherizeKeys(body) {
    var dasherized = lodash_1.default.mapKeys(body, function (_value, key) { return dasherize(key); });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dasherized = lodash_1.default.mapValues(dasherized, function (value) {
        if (lodash_1.default.isPlainObject(value)) {
            return recursiveDasherizeKeys(value);
        }
        return value;
    });
    return dasherized;
}
exports.recursiveDasherizeKeys = recursiveDasherizeKeys;
function dasherize(target) {
    // prettier-ignore
    return target
        .replace(/([A-Z])/g, function (_match, p1, _offset, _whole) { return "-".concat(p1.toLowerCase()); })
        .replace(/\s/g, '-');
}
exports.dasherize = dasherize;
