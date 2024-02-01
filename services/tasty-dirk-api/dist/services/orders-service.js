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
var OrderService = /** @class */ (function () {
    function OrderService(httpClient) {
        this.httpClient = httpClient;
    }
    //Orders: Allows an API client to view, filter, create, cancel and replace orders.
    OrderService.prototype.postReconfirmOrder = function (accountNumber, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var reconfirmOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.postData("/accounts/".concat(accountNumber, "/orders/").concat(orderId, "/reconfirm"), {}, {})];
                    case 1:
                        reconfirmOrder = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(reconfirmOrder)];
                }
            });
        });
    };
    OrderService.prototype.replacementOrderDryRun = function (accountNumber, orderId, replacementOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var replacementOrderDryRun;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.postData("/accounts/".concat(accountNumber, "/orders/").concat(orderId, "/dry-run"), replacementOrder, {})];
                    case 1:
                        replacementOrderDryRun = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(replacementOrderDryRun)];
                }
            });
        });
    };
    OrderService.prototype.getOrder = function (accountNumber, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/accounts/".concat(accountNumber, "/orders/").concat(orderId), {}, {})];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(order)];
                }
            });
        });
    };
    OrderService.prototype.cancelOrder = function (accountNumber, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.deleteData("/accounts/".concat(accountNumber, "/orders/").concat(orderId), {})];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(order)];
                }
            });
        });
    };
    OrderService.prototype.replaceOrder = function (accountNumber, orderId, replacementOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.putData("/accounts/".concat(accountNumber, "/orders/").concat(orderId), replacementOrder, {})];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(order)];
                }
            });
        });
    };
    OrderService.prototype.editOrder = function (accountNumber, orderId, order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.patchData("/accounts/".concat(accountNumber, "/orders/").concat(orderId), order, {})];
                    case 1:
                        orderResponse = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(orderResponse)];
                }
            });
        });
    };
    OrderService.prototype.getLiveOrders = function (accountNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var liveOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/accounts/".concat(accountNumber, "/orders/live"), {}, {})];
                    case 1:
                        liveOrders = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(liveOrders)];
                }
            });
        });
    };
    OrderService.prototype.getOrders = function (accountNumber, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/accounts/".concat(accountNumber, "/orders"), {}, queryParams)];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(orders)];
                }
            });
        });
    };
    OrderService.prototype.createOrder = function (accountNumber, order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.postData("/accounts/".concat(accountNumber, "/orders"), order, {})];
                    case 1:
                        orderResponse = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(orderResponse)];
                }
            });
        });
    };
    OrderService.prototype.postOrderDryRun = function (accountNumber, order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderDryRun;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.postData("/accounts/".concat(accountNumber, "/orders/dry-run"), order, {})];
                    case 1:
                        orderDryRun = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(orderDryRun)];
                }
            });
        });
    };
    OrderService.prototype.getLiveOrdersForCustomer = function (customerId) {
        return __awaiter(this, void 0, void 0, function () {
            var liveOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/customers/".concat(customerId, "/orders/live"), {}, {})];
                    case 1:
                        liveOrders = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(liveOrders)];
                }
            });
        });
    };
    OrderService.prototype.getCustomerOrders = function (customerId, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var customerOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.getData("/customers/".concat(customerId, "/orders"), {}, queryParams)];
                    case 1:
                        customerOrders = _a.sent();
                        return [2 /*return*/, (0, response_util_1.default)(customerOrders)];
                }
            });
        });
    };
    return OrderService;
}());
exports.default = OrderService;
