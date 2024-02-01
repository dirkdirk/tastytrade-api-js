"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_util_1 = __importDefault(require("../utils/response-util"));
var SessionService = /** @class */ (function () {
    function SessionService(httpClient) {
        this.httpClient = httpClient;
    }
    // Sessions: Allows an API client to interact with their session, or create a new one.
    SessionService.prototype.login = function (usernameOrEmail, password, rememberMe) {
        if (rememberMe === void 0) { rememberMe = false; }
        return __awaiter(this, void 0, void 0, function () {
            var params, sessionResponse, sessionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { login: usernameOrEmail, password: password, rememberMe: rememberMe };
                        return [4 /*yield*/, this.httpClient.postData('/sessions', params, {})];
                    case 1:
                        sessionResponse = _a.sent();
                        sessionData = (0, response_util_1.default)(sessionResponse);
                        this.httpClient.session.authToken = sessionData["session-token"];
                        return [2 /*return*/, sessionData];
                }
            });
        });
    };
    SessionService.prototype.loginWithRememberToken = function (usernameOrEmail, rememberToken, rememberMe) {
        if (rememberMe === void 0) { rememberMe = false; }
        return __awaiter(this, void 0, void 0, function () {
            var params, sessionData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = { login: usernameOrEmail, rememberToken: rememberToken, rememberMe: rememberMe };
                        _a = response_util_1.default;
                        return [4 /*yield*/, this.httpClient.postData('/sessions', params, {})];
                    case 1:
                        sessionData = _a.apply(void 0, [_b.sent()]);
                        this.httpClient.session.authToken = sessionData["session-token"];
                        return [2 /*return*/, sessionData];
                }
            });
        });
    };
    SessionService.prototype.validate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.postData('/sessions/validate', {}, {})];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(response)];
                }
            });
        });
    };
    SessionService.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.deleteData('/sessions', {})];
                    case 1:
                        response = _a.sent();
                        this.httpClient.session.clear();
                        return [2 /*return*/, (0, response_util_1.default)(response)];
                }
            });
        });
    };
    return SessionService;
}());
exports.default = SessionService;
