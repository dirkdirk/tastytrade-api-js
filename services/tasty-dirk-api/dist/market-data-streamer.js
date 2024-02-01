"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleType = exports.MarketDataSubscriptionType = void 0;
var isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
var lodash_1 = __importDefault(require("lodash"));
var uuid_1 = require("uuid");
var constants_1 = require("./utils/constants");
var MarketDataSubscriptionType;
(function (MarketDataSubscriptionType) {
    MarketDataSubscriptionType["Candle"] = "Candle";
    MarketDataSubscriptionType["Quote"] = "Quote";
    MarketDataSubscriptionType["Trade"] = "Trade";
    MarketDataSubscriptionType["Summary"] = "Summary";
    MarketDataSubscriptionType["Profile"] = "Profile";
    MarketDataSubscriptionType["Greeks"] = "Greeks";
    MarketDataSubscriptionType["Underlying"] = "Underlying";
})(MarketDataSubscriptionType = exports.MarketDataSubscriptionType || (exports.MarketDataSubscriptionType = {}));
var CandleType;
(function (CandleType) {
    CandleType["Tick"] = "t";
    CandleType["Second"] = "s";
    CandleType["Minute"] = "m";
    CandleType["Hour"] = "h";
    CandleType["Day"] = "d";
    CandleType["Week"] = "w";
    CandleType["Month"] = "mo";
    CandleType["ThirdFriday"] = "o";
    CandleType["Year"] = "y";
    CandleType["Volume"] = "v";
    CandleType["Price"] = "p";
})(CandleType = exports.CandleType || (exports.CandleType = {}));
// List of all subscription types except for Candle
var AllSubscriptionTypes = Object.values(MarketDataSubscriptionType);
var KeepaliveInterval = 30000; // 30 seconds
var DefaultChannelId = 1;
var MarketDataStreamer = /** @class */ (function () {
    function MarketDataStreamer() {
        this.webSocket = null;
        this.token = '';
        this.keepaliveIntervalId = null;
        this.dataListeners = new Map();
        this.openChannels = new Set();
        this.subscriptionsQueue = new Map();
        this.authState = '';
        this.errorListeners = new Map();
        this.authStateListeners = new Map();
    }
    MarketDataStreamer.prototype.addDataListener = function (dataListener, channelId) {
        var _this = this;
        if (channelId === void 0) { channelId = null; }
        if (lodash_1.default.isNil(dataListener)) {
            return lodash_1.default.noop;
        }
        var guid = (0, uuid_1.v4)();
        this.dataListeners.set(guid, { listener: dataListener, channelId: channelId });
        return function () { return _this.dataListeners.delete(guid); };
    };
    MarketDataStreamer.prototype.addErrorListener = function (errorListener) {
        var _this = this;
        if (lodash_1.default.isNil(errorListener)) {
            return lodash_1.default.noop;
        }
        var guid = (0, uuid_1.v4)();
        this.errorListeners.set(guid, errorListener);
        return function () { return _this.errorListeners.delete(guid); };
    };
    MarketDataStreamer.prototype.addAuthStateChangeListener = function (authStateListener) {
        var _this = this;
        if (lodash_1.default.isNil(authStateListener)) {
            return lodash_1.default.noop;
        }
        var guid = (0, uuid_1.v4)();
        this.authStateListeners.set(guid, authStateListener);
        return function () { return _this.authStateListeners.delete(guid); };
    };
    MarketDataStreamer.prototype.connect = function (url, token) {
        if (this.isConnected) {
            throw new Error('MarketDataStreamer is attempting to connect when an existing websocket is already connected');
        }
        this.token = token;
        this.webSocket = new isomorphic_ws_1.default(url, [], {
            minVersion: constants_1.MinTlsVersion // TLS Config
        });
        this.webSocket.onopen = this.onOpen.bind(this);
        this.webSocket.onerror = this.onError.bind(this);
        this.webSocket.onmessage = this.handleMessageReceived.bind(this);
        this.webSocket.onclose = this.onClose.bind(this);
    };
    MarketDataStreamer.prototype.disconnect = function () {
        if (lodash_1.default.isNil(this.webSocket)) {
            return;
        }
        this.clearKeepalive();
        this.webSocket.onopen = null;
        this.webSocket.onerror = null;
        this.webSocket.onmessage = null;
        this.webSocket.onclose = null;
        this.webSocket.close();
        this.webSocket = null;
        this.openChannels.clear();
        this.subscriptionsQueue.clear();
        this.authState = '';
    };
    MarketDataStreamer.prototype.addSubscription = function (symbol, options) {
        var _this = this;
        if (options === void 0) { options = { subscriptionTypes: AllSubscriptionTypes, channelId: DefaultChannelId }; }
        var subscriptionTypes = options.subscriptionTypes;
        // Don't allow candle subscriptions in this method. Use addCandleSubscription instead
        subscriptionTypes = lodash_1.default.without(subscriptionTypes, MarketDataSubscriptionType.Candle);
        var isOpen = this.isChannelOpened(options.channelId);
        if (isOpen) {
            this.sendSubscriptionMessage(symbol, subscriptionTypes, options.channelId, 'add');
        }
        else {
            this.queueSubscription(symbol, { subscriptionTypes: subscriptionTypes, channelId: options.channelId });
        }
        return function () {
            _this.removeSubscription(symbol, options);
        };
    };
    /**
     * Adds a candle subscription (historical data)
     * @param streamerSymbol Get this from an instrument's streamer-symbol json response field
     * @param fromTime Epoch timestamp from where you want to start
     * @param options Period and Type are the grouping you want to apply to the candle data
     * For example, a period/type of 5/m means you want each candle to represent 5 minutes of data
     * From there, setting fromTime to 24 hours ago would give you 24 hours of data grouped in 5 minute intervals
     * @returns
     */
    MarketDataStreamer.prototype.addCandleSubscription = function (streamerSymbol, fromTime, options) {
        var _this = this;
        var _a;
        var subscriptionTypes = [MarketDataSubscriptionType.Candle];
        var channelId = (_a = options.channelId) !== null && _a !== void 0 ? _a : DefaultChannelId;
        // Example: AAPL{=5m} where each candle represents 5 minutes of data
        var candleSymbol = "".concat(streamerSymbol, "{=").concat(options.period).concat(options.type, "}");
        var isOpen = this.isChannelOpened(channelId);
        var subscriptionArgs = { fromTime: fromTime };
        if (isOpen) {
            this.sendSubscriptionMessage(candleSymbol, subscriptionTypes, channelId, 'add', subscriptionArgs);
        }
        else {
            this.queueSubscription(candleSymbol, { subscriptionTypes: subscriptionTypes, channelId: channelId, subscriptionArgs: subscriptionArgs });
        }
        return function () {
            _this.removeSubscription(candleSymbol, { subscriptionTypes: subscriptionTypes, channelId: channelId });
        };
    };
    MarketDataStreamer.prototype.removeSubscription = function (symbol, options) {
        if (options === void 0) { options = { subscriptionTypes: AllSubscriptionTypes, channelId: DefaultChannelId }; }
        var subscriptionTypes = options.subscriptionTypes, channelId = options.channelId;
        var isOpen = this.isChannelOpened(channelId);
        if (isOpen) {
            this.sendSubscriptionMessage(symbol, subscriptionTypes, channelId, 'remove');
        }
        else {
            this.dequeueSubscription(symbol, options);
        }
    };
    MarketDataStreamer.prototype.removeAllSubscriptions = function (channelId) {
        if (channelId === void 0) { channelId = DefaultChannelId; }
        var isOpen = this.isChannelOpened(channelId);
        if (isOpen) {
            this.sendMessage({ "type": "FEED_SUBSCRIPTION", "channel": channelId, reset: true });
        }
        else {
            this.subscriptionsQueue.set(channelId, []);
        }
    };
    MarketDataStreamer.prototype.openFeedChannel = function (channelId) {
        if (!this.isReadyToOpenChannels) {
            throw new Error("Unable to open channel ".concat(channelId, " due to DxLink authorization state: ").concat(this.authState));
        }
        if (this.isChannelOpened(channelId)) {
            return;
        }
        this.sendMessage({
            "type": "CHANNEL_REQUEST",
            "channel": channelId,
            "service": "FEED",
            "parameters": {
                "contract": "AUTO"
            }
        });
        // Dirk added ...
        this.sendMessage({
            "type": "FEED_SETUP",
            "channel": 1,
            "acceptAggregationPeriod": 15,
            "acceptDataFormat": "COMPACT",
            "acceptEventFields": {
                "Quote": ["eventType", "eventSymbol", "bidPrice", "askPrice", "bidSize", "askSize"]
            }
        });
    };
    MarketDataStreamer.prototype.isChannelOpened = function (channelId) {
        return this.isConnected && this.openChannels.has(channelId);
    };
    Object.defineProperty(MarketDataStreamer.prototype, "isReadyToOpenChannels", {
        get: function () {
            return this.isConnected && this.isDxLinkAuthorized;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarketDataStreamer.prototype, "isConnected", {
        get: function () {
            return !lodash_1.default.isNil(this.webSocket);
        },
        enumerable: false,
        configurable: true
    });
    MarketDataStreamer.prototype.scheduleKeepalive = function () {
        this.keepaliveIntervalId = setInterval(this.sendKeepalive, KeepaliveInterval);
    };
    MarketDataStreamer.prototype.sendKeepalive = function () {
        if (lodash_1.default.isNil(this.keepaliveIntervalId)) {
            return;
        }
        this.sendMessage({
            "type": "KEEPALIVE",
            "channel": 0
        });
    };
    MarketDataStreamer.prototype.queueSubscription = function (symbol, options) {
        var subscriptionTypes = options.subscriptionTypes, channelId = options.channelId, subscriptionArgs = options.subscriptionArgs;
        var queue = this.subscriptionsQueue.get(options.channelId);
        if (lodash_1.default.isNil(queue)) {
            queue = [];
            this.subscriptionsQueue.set(channelId, queue);
        }
        queue.push({ symbol: symbol, subscriptionTypes: subscriptionTypes, subscriptionArgs: subscriptionArgs });
    };
    MarketDataStreamer.prototype.dequeueSubscription = function (symbol, options) {
        var queue = this.subscriptionsQueue.get(options.channelId);
        if (lodash_1.default.isNil(queue) || lodash_1.default.isEmpty(queue)) {
            return;
        }
        lodash_1.default.remove(queue, function (queueItem) { return queueItem.symbol === symbol; });
    };
    MarketDataStreamer.prototype.sendQueuedSubscriptions = function (channelId) {
        var _this = this;
        var queuedSubscriptions = this.subscriptionsQueue.get(channelId);
        if (lodash_1.default.isNil(queuedSubscriptions)) {
            return;
        }
        // Clear out queue immediately
        this.subscriptionsQueue.set(channelId, []);
        queuedSubscriptions.forEach(function (subscription) {
            _this.sendSubscriptionMessage(subscription.symbol, subscription.subscriptionTypes, channelId, 'add', subscription.subscriptionArgs);
        });
    };
    /**
     *
     * @param {*} symbol
     * @param {*} subscriptionTypes
     * @param {*} channelId
     * @param {*} direction add or remove
     */
    MarketDataStreamer.prototype.sendSubscriptionMessage = function (symbol, subscriptionTypes, channelId, direction, subscriptionArgs) {
        var _a;
        if (subscriptionArgs === void 0) { subscriptionArgs = {}; }
        var subscriptions = subscriptionTypes.map(function (type) { return (Object.assign({}, { "symbol": symbol, "type": type }, subscriptionArgs !== null && subscriptionArgs !== void 0 ? subscriptionArgs : {})); });
        this.sendMessage((_a = {
                "type": "FEED_SUBSCRIPTION",
                "channel": channelId
            },
            _a[direction] = subscriptions,
            _a));
    };
    MarketDataStreamer.prototype.onError = function (error) {
        console.error('Error received: ', error);
        this.notifyErrorListeners(error);
    };
    MarketDataStreamer.prototype.onOpen = function () {
        this.openChannels.clear();
        this.sendMessage({
            "type": "SETUP",
            "channel": 0,
            "keepaliveTimeout": KeepaliveInterval,
            "acceptKeepaliveTimeout": KeepaliveInterval,
            "version": "0.1-js/1.0.0"
        });
        this.scheduleKeepalive();
    };
    MarketDataStreamer.prototype.onClose = function () {
        this.webSocket = null;
        this.clearKeepalive();
    };
    MarketDataStreamer.prototype.clearKeepalive = function () {
        if (!lodash_1.default.isNil(this.keepaliveIntervalId)) {
            clearInterval(this.keepaliveIntervalId);
        }
        this.keepaliveIntervalId = null;
    };
    Object.defineProperty(MarketDataStreamer.prototype, "isDxLinkAuthorized", {
        get: function () {
            return this.authState === 'AUTHORIZED';
        },
        enumerable: false,
        configurable: true
    });
    MarketDataStreamer.prototype.handleAuthStateMessage = function (data) {
        var _this = this;
        this.authState = data.state;
        this.authStateListeners.forEach(function (listener) { return listener(_this.isDxLinkAuthorized); });
        if (this.isDxLinkAuthorized) {
            this.openFeedChannel(DefaultChannelId);
            // Dirk added ...
            this.sendMessage({
                "type": "FEED_SETUP",
                "channel": 1,
                "acceptAggregationPeriod": 15,
                "acceptDataFormat": "COMPACT",
                "acceptEventFields": {
                    "Quote": ["eventType", "eventSymbol", "bidPrice", "askPrice", "bidSize", "askSize"]
                }
            });
        }
        else {
            this.sendMessage({
                "type": "AUTH",
                "channel": 0,
                "token": this.token
            });
        }
    };
    MarketDataStreamer.prototype.handleChannelOpened = function (jsonData) {
        this.openChannels.add(jsonData.channel);
        this.sendQueuedSubscriptions(jsonData.channel);
    };
    MarketDataStreamer.prototype.notifyListeners = function (jsonData) {
        this.dataListeners.forEach(function (listenerData) {
            if (listenerData.channelId === jsonData.channel || lodash_1.default.isNil(listenerData.channelId)) {
                listenerData.listener(jsonData);
            }
        });
    };
    MarketDataStreamer.prototype.notifyErrorListeners = function (error) {
        this.errorListeners.forEach(function (listener) { return listener(error); });
    };
    MarketDataStreamer.prototype.handleMessageReceived = function (data) {
        var messageData = lodash_1.default.get(data, 'data', '{}');
        var jsonData = JSON.parse(messageData);
        switch (jsonData.type) {
            case 'AUTH_STATE':
                this.handleAuthStateMessage(jsonData);
                break;
            case 'CHANNEL_OPENED':
                this.handleChannelOpened(jsonData);
                break;
            case 'FEED_DATA':
                this.notifyListeners(jsonData);
                break;
        }
    };
    MarketDataStreamer.prototype.sendMessage = function (json) {
        if (lodash_1.default.isNil(this.webSocket)) {
            return;
        }
        this.webSocket.send(JSON.stringify(json));
    };
    return MarketDataStreamer;
}());
exports.default = MarketDataStreamer;
