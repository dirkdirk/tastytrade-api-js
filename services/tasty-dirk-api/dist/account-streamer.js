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
exports.AccountStreamer = exports.STREAMER_STATE = void 0;
var isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
var lodash_1 = __importDefault(require("lodash"));
var json_util_1 = require("./utils/json-util");
var constants_1 = require("./utils/constants");
var STREAMER_STATE;
(function (STREAMER_STATE) {
    STREAMER_STATE[STREAMER_STATE["Open"] = 0] = "Open";
    STREAMER_STATE[STREAMER_STATE["Closed"] = 1] = "Closed";
    STREAMER_STATE[STREAMER_STATE["Error"] = 2] = "Error";
})(STREAMER_STATE = exports.STREAMER_STATE || (exports.STREAMER_STATE = {}));
var MessageAction;
(function (MessageAction) {
    MessageAction["ACCOUNT_SUBSCRIBE"] = "account-subscribe";
    MessageAction["CONNECT"] = "connect";
    MessageAction["HEARTBEAT"] = "heartbeat";
    MessageAction["PUBLIC_WATCHLISTS_SUBSCRIBE"] = "public-watchlists-subscribe";
    MessageAction["QUOTE_ALERTS_SUBSCRIBE"] = "quote-alerts-subscribe";
    MessageAction["USER_MESSAGE_SUBSCRIBE"] = "user-message-subscribe";
})(MessageAction || (MessageAction = {}));
var HEARTBEAT_INTERVAL = 20000; // 20 seconds
var SOURCE = 'tastytrade-api-js-sdk';
var REQUEST_ID = 'request-id';
function removeElement(array, element) {
    var index = array.indexOf(element);
    if (index < 0) {
        return;
    }
    array.splice(index, 1);
}
var AccountStreamer = /** @class */ (function () {
    /**
     *
     * @param url Url of the account streamer service
     */
    function AccountStreamer(url, session) {
        var _this = this;
        this.url = url;
        this.session = session;
        this.websocket = null;
        this.startResolve = null;
        this.startReject = null;
        this.requestCounter = 0;
        this.queued = [];
        this.heartbeatTimerId = null;
        this.lastCloseEvent = null;
        this.lastErrorEvent = null;
        this._streamerState = STREAMER_STATE.Closed;
        this.streamerStateObservers = [];
        this.streamerMessageObservers = [];
        this.startPromise = null;
        this.requestPromises = new Map();
        this.logger = console;
        this.sendHeartbeat = function () {
            _this.clearHeartbeatTimerId();
            _this.send(new json_util_1.JsonBuilder({ action: MessageAction.HEARTBEAT }));
        };
        this.handleOpen = function (event) {
            if (_this.startResolve === null) {
                return;
            }
            _this.logger.info('AccountStreamer opened', event);
            _this.startResolve(true);
            _this.startResolve = _this.startReject = null;
            _this.streamerState = STREAMER_STATE.Open;
            _this.sendQueuedMessages();
            _this.scheduleHeartbeatTimer();
        };
        this.handleClose = function (event) {
            _this.logger.info('AccountStreamer closed', event);
            if (_this.websocket === null) {
                return;
            }
            _this.lastCloseEvent = event;
            _this.streamerState = STREAMER_STATE.Closed;
            _this.teardown();
        };
        this.handleError = function (event) {
            if (_this.websocket === null) {
                return;
            }
            _this.logger.warn('AccountStreamer error', event);
            _this.lastErrorEvent = event;
            _this.streamerState = STREAMER_STATE.Error;
            if (_this.startReject !== null) {
                _this.startReject(new Error('Failed to connect'));
                _this.startReject = _this.startResolve = null;
            }
            _this.teardown();
        };
        this.handleMessage = function (event) {
            var json = JSON.parse(event.data);
            if (json.results !== undefined) {
                var results = json.results;
                for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                    var result = results_1[_i];
                    _this.handleOneMessage(result);
                }
            }
            else {
                _this.handleOneMessage(json);
            }
        };
        this.handleOneMessage = function (json) {
            _this.logger.info(json);
            var action = json.action;
            _this.streamerMessageObservers.forEach(function (observer) { return observer(json); });
            if (action) {
                if (action === MessageAction.HEARTBEAT) {
                    // schedule next heartbeat
                    _this.scheduleHeartbeatTimer();
                }
                var promiseCallbacks = _this.requestPromises.get(json[REQUEST_ID]);
                if (promiseCallbacks) {
                    var resolve = promiseCallbacks[0], reject = promiseCallbacks[1];
                    var status_1 = json.status;
                    if (status_1 === 'ok') {
                        resolve(json.action);
                    }
                    else {
                        reject(json.message);
                    }
                }
                return;
            }
        };
    }
    Object.defineProperty(AccountStreamer.prototype, "streamerState", {
        get: function () {
            return this._streamerState;
        },
        set: function (streamerState) {
            this._streamerState = streamerState;
            this.streamerStateObservers.forEach(function (observer) {
                observer(streamerState);
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AccountStreamer.prototype, "authToken", {
        get: function () {
            return this.session.authToken;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds a custom callback that fires when the streamer state changes
     * @param observer
     * @returns
     */
    AccountStreamer.prototype.addStreamerStateObserver = function (observer) {
        var _this = this;
        this.streamerStateObservers.push(observer);
        return function () {
            removeElement(_this.streamerStateObservers, observer);
        };
    };
    Object.defineProperty(AccountStreamer.prototype, "isOpen", {
        get: function () {
            return this.streamerState === STREAMER_STATE.Open;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AccountStreamer.prototype, "isClosed", {
        get: function () {
            return this.streamerState === STREAMER_STATE.Closed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AccountStreamer.prototype, "isError", {
        get: function () {
            return this.streamerState === STREAMER_STATE.Error;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Entrypoint for beginning a websocket session
     * You must have a valid tastytrade authToken before calling this method
     * @returns Promise that resolves when the "opened" message is received (see handleOpen)
     */
    AccountStreamer.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var websocket;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.startPromise !== null) {
                    return [2 /*return*/, this.startPromise];
                }
                this.websocket = new isomorphic_ws_1.default(this.url, [], {
                    minVersion: constants_1.MinTlsVersion // TLS Config
                });
                websocket = this.websocket;
                this.lastCloseEvent = null;
                this.lastErrorEvent = null;
                websocket.addEventListener('open', this.handleOpen);
                websocket.addEventListener('close', this.handleClose);
                websocket.addEventListener('error', this.handleError);
                websocket.addEventListener('message', this.handleMessage);
                this.logger.info('AccountStreamer - starting');
                this.startPromise = new Promise(function (resolve, reject) {
                    _this.startResolve = resolve;
                    _this.startReject = reject;
                });
                return [2 /*return*/, this.startPromise];
            });
        });
    };
    AccountStreamer.prototype.stop = function () {
        this.teardown();
    };
    AccountStreamer.prototype.teardown = function () {
        var websocket = this.websocket;
        if (websocket === null) {
            return;
        }
        this.startPromise = null;
        this.cancelHeartbeatTimer();
        websocket.close();
        websocket.removeEventListener('open', this.handleOpen);
        websocket.removeEventListener('close', this.handleClose);
        websocket.removeEventListener('message', this.handleMessage);
        websocket.removeEventListener('error', this.handleError);
        this.websocket = null;
        this.logger.info('AccountStreamer - teardown');
        this.streamerState = STREAMER_STATE.Closed; // Manually update status for convenience
    };
    AccountStreamer.prototype.scheduleHeartbeatTimer = function () {
        if (this.isHeartbeatScheduled) {
            // Heartbeat already scheduled
            return;
        }
        this.logger.info('Scheduling heartbeat with interval: ', HEARTBEAT_INTERVAL);
        var scheduler = typeof window === 'undefined' ? setTimeout : window.setTimeout;
        this.heartbeatTimerId = scheduler(this.sendHeartbeat, HEARTBEAT_INTERVAL);
    };
    Object.defineProperty(AccountStreamer.prototype, "isHeartbeatScheduled", {
        get: function () {
            return !lodash_1.default.isNil(this.heartbeatTimerId);
        },
        enumerable: false,
        configurable: true
    });
    AccountStreamer.prototype.cancelHeartbeatTimer = function () {
        if (!this.isHeartbeatScheduled) {
            return; // Nothing to cancel
        }
        if (typeof window === 'undefined') {
            clearTimeout(this.heartbeatTimerId);
        }
        else {
            clearTimeout(this.heartbeatTimerId);
        }
        this.clearHeartbeatTimerId();
    };
    AccountStreamer.prototype.clearHeartbeatTimerId = function () {
        this.heartbeatTimerId = null;
    };
    /**
     * Send a message via websocket
     * @param json JsonBuilder
     * @param includeSessionToken Attaches session token to message if true
     * @returns
     */
    AccountStreamer.prototype.send = function (json, includeSessionToken) {
        if (includeSessionToken === void 0) { includeSessionToken = true; }
        this.requestCounter += 1;
        json.add(REQUEST_ID, this.requestCounter);
        json.add('source', SOURCE);
        if (includeSessionToken) {
            var sessionToken = this.authToken;
            if (!sessionToken) {
                throw new Error('sessionToken not set');
            }
            json.add('auth-token', sessionToken);
        }
        var message = JSON.stringify(json.json);
        var websocket = this.websocket;
        if (websocket === null) {
            // Queue up and send on open
            this.queued.push(message);
        }
        else {
            websocket.send(message);
        }
        return this.requestCounter;
    };
    /**
     * Used by other methods to send a specific `action` message
     * @param action
     * @param value
     * @returns
     */
    AccountStreamer.prototype.subscribeTo = function (action, value) {
        var json = new json_util_1.JsonBuilder();
        json.add('action', action);
        if (!lodash_1.default.isUndefined(value)) {
            json.add('value', value);
        }
        return this.send(json);
    };
    /**
     * Subscribes to all user-level messages for given user external id
     * @param userExternalId "external-id" from login response
     * @returns Promise that resolves when ack is received
     */
    AccountStreamer.prototype.subscribeToUser = function (userExternalId) {
        if (!userExternalId) {
            return;
        }
        this.subscribeTo(MessageAction.USER_MESSAGE_SUBSCRIBE, userExternalId);
    };
    /**
     * Subscribes to all account-level messages for given account numbers
     * @param accountNumbers List of account numbers to subscribe to
     * @returns Promise that resolves when an ack is received
     */
    AccountStreamer.prototype.subscribeToAccounts = function (accountNumbers) {
        return __awaiter(this, void 0, void 0, function () {
            var value, requestId;
            var _this = this;
            return __generator(this, function (_a) {
                if (accountNumbers.length === 0) {
                    return [2 /*return*/, Promise.reject('no account numbers')];
                }
                value = accountNumbers.length > 1 ? accountNumbers : accountNumbers[0];
                requestId = this.subscribeTo(MessageAction.CONNECT, value);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.requestPromises.set(requestId, [resolve, reject]);
                    })];
            });
        });
    };
    AccountStreamer.prototype.sendQueuedMessages = function () {
        var queued = this.queued;
        if (queued.length === 0 || this.websocket === null) {
            return;
        }
        var websocket = this.websocket;
        queued.forEach(function (msg) {
            websocket.send(msg);
        });
        this.queued = [];
    };
    AccountStreamer.prototype.addMessageObserver = function (observer) {
        var _this = this;
        this.streamerMessageObservers.push(observer);
        return function () {
            removeElement(_this.streamerMessageObservers, observer);
        };
    };
    return AccountStreamer;
}());
exports.AccountStreamer = AccountStreamer;
