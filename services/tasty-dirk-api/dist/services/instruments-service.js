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
var lodash_1 = __importDefault(require("lodash"));
var InstrumentsService = /** @class */ (function () {
    function InstrumentsService(httpClient) {
        this.httpClient = httpClient;
    }
    //Instruments: Allows an API client to fetch data about instruments.
    InstrumentsService.prototype.getCryptocurrencies = function (symbols) {
        if (symbols === void 0) { symbols = []; }
        return __awaiter(this, void 0, void 0, function () {
            var queryParams, cryptocurrencies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = { symbol: symbols };
                        return [4 /*yield*/, this.httpClient.getData("/instruments/cryptocurrencies", {}, queryParams)];
                    case 1:
                        cryptocurrencies = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(cryptocurrencies)];
                }
            });
        });
    };
    InstrumentsService.prototype.getSingleCryptocurrency = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var encodedSymbol, singleCryptocurrency;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encodedSymbol = encodeURIComponent(symbol);
                        return [4 /*yield*/, this.httpClient.getData("/instruments/cryptocurrencies/".concat(encodedSymbol), {}, {})];
                    case 1:
                        singleCryptocurrency = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(singleCryptocurrency)];
                }
            });
        });
    };
    InstrumentsService.prototype.getActiveEquities = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var activeEquities;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/equities/active", {}, queryParams)];
                    case 1:
                        activeEquities = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(activeEquities)];
                }
            });
        });
    };
    InstrumentsService.prototype.getEquityDefinitions = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var equityDefinitions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/equities", {}, queryParams)];
                    case 1:
                        equityDefinitions = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(equityDefinitions)];
                }
            });
        });
    };
    InstrumentsService.prototype.getSingleEquity = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var singleEquity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/equities/".concat(symbol), {}, {})];
                    case 1:
                        singleEquity = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(singleEquity)];
                }
            });
        });
    };
    InstrumentsService.prototype.getEquityOptions = function (symbols, active, withExpired) {
        if (active === void 0) { active = true; }
        if (withExpired === void 0) { withExpired = false; }
        return __awaiter(this, void 0, void 0, function () {
            var queryParams, equityOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (lodash_1.default.isEmpty(symbols)) {
                            throw new Error('Symbols are required for InstrumentService.getEquityOptions');
                        }
                        queryParams = { symbols: symbols, active: active, withExpired: withExpired };
                        return [4 /*yield*/, this.httpClient.getData("/instruments/equity-options", {}, queryParams)];
                    case 1:
                        equityOptions = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(equityOptions)];
                }
            });
        });
    };
    InstrumentsService.prototype.getSingleEquityOption = function (symbol, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var singleOption;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/equity-options/".concat(symbol), {}, queryParams)];
                    case 1:
                        singleOption = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(singleOption)];
                }
            });
        });
    };
    InstrumentsService.prototype.getFutures = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var futures;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/futures", {}, queryParams)];
                    case 1:
                        futures = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(futures)];
                }
            });
        });
    };
    InstrumentsService.prototype.getSingleFuture = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var singleFuture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/futures/".concat(symbol), {}, {})];
                    case 1:
                        singleFuture = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(singleFuture)];
                }
            });
        });
    };
    InstrumentsService.prototype.getFutureOptionsProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var futureOptionsProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/future-option-products", {}, {})];
                    case 1:
                        futureOptionsProducts = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(futureOptionsProducts)];
                }
            });
        });
    };
    InstrumentsService.prototype.getSingleFutureOptionProduct = function (exchange, rootSymbol) {
        return __awaiter(this, void 0, void 0, function () {
            var singleFutureOptionProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/future-option-products/".concat(exchange, "/").concat(rootSymbol), {}, {})];
                    case 1:
                        singleFutureOptionProduct = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(singleFutureOptionProduct)];
                }
            });
        });
    };
    InstrumentsService.prototype.getFutureOptions = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var futureOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/future-options", {}, queryParams)];
                    case 1:
                        futureOptions = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(futureOptions)];
                }
            });
        });
    };
    InstrumentsService.prototype.getSingleFutureOption = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var singleFutureOption;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/future-options/".concat(symbol), {}, {})];
                    case 1:
                        singleFutureOption = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(singleFutureOption)];
                }
            });
        });
    };
    InstrumentsService.prototype.getFuturesProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var futuresProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/future-products", {}, {})];
                    case 1:
                        futuresProducts = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(futuresProducts)];
                }
            });
        });
    };
    InstrumentsService.prototype.getSingleFutureProduct = function (exchange, code) {
        return __awaiter(this, void 0, void 0, function () {
            var singleFutureProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/future-products/".concat(exchange, "/").concat(code), {}, {})];
                    case 1:
                        singleFutureProduct = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(singleFutureProduct)];
                }
            });
        });
    };
    InstrumentsService.prototype.getQuantityDecimalPrecisions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var quantityDecimalPrecisions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/quantity-decimal-precisions", {}, {})];
                    case 1:
                        quantityDecimalPrecisions = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(quantityDecimalPrecisions)];
                }
            });
        });
    };
    InstrumentsService.prototype.getWarrants = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var warrants;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/warrants", {}, queryParams)];
                    case 1:
                        warrants = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(warrants)];
                }
            });
        });
    };
    InstrumentsService.prototype.getSingleWarrant = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var singleWarrant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/instruments/warrants/".concat(symbol), {}, {})];
                    case 1:
                        singleWarrant = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(singleWarrant)];
                }
            });
        });
    };
    //Futures-option-chains: Allows an API client to fetch futures option chains.
    InstrumentsService.prototype.getNestedFutureOptionChains = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var nestedFutureOptionChains;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/futures-option-chains/".concat(symbol, "/nested"), {}, {})];
                    case 1:
                        nestedFutureOptionChains = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(nestedFutureOptionChains)];
                }
            });
        });
    };
    InstrumentsService.prototype.getFutureOptionChain = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var futureOptionChain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/futures-option-chains/".concat(symbol), {}, {})];
                    case 1:
                        futureOptionChain = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(futureOptionChain)];
                }
            });
        });
    };
    //Option-chains: Allows an API client to fetch futures option chains.
    InstrumentsService.prototype.getNestedOptionChain = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var nestedOptionChain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/option-chains/".concat(symbol, "/nested"), {}, {})];
                    case 1:
                        nestedOptionChain = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(nestedOptionChain)];
                }
            });
        });
    };
    InstrumentsService.prototype.getCompactOptionChain = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var compactOptionChain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/option-chains/".concat(symbol, "/compact"), {}, {})];
                    case 1:
                        compactOptionChain = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(compactOptionChain)];
                }
            });
        });
    };
    InstrumentsService.prototype.getOptionChain = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var optionChain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/option-chains/".concat(symbol), {}, {})];
                    case 1:
                        optionChain = (_a.sent());
                        return [2 /*return*/, (0, response_util_1.default)(optionChain)];
                }
            });
        });
    };
    return InstrumentsService;
}());
exports.default = InstrumentsService;
