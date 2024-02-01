"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STREAMER_STATE = exports.AccountStreamer = exports.CandleType = exports.MarketDataSubscriptionType = exports.MarketDataStreamer = void 0;
var tastytrade_http_client_1 = __importDefault(require("./services/tastytrade-http-client"));
var account_streamer_1 = require("./account-streamer");
Object.defineProperty(exports, "AccountStreamer", { enumerable: true, get: function () { return account_streamer_1.AccountStreamer; } });
Object.defineProperty(exports, "STREAMER_STATE", { enumerable: true, get: function () { return account_streamer_1.STREAMER_STATE; } });
var market_data_streamer_1 = __importStar(require("./market-data-streamer"));
exports.MarketDataStreamer = market_data_streamer_1.default;
Object.defineProperty(exports, "CandleType", { enumerable: true, get: function () { return market_data_streamer_1.CandleType; } });
Object.defineProperty(exports, "MarketDataSubscriptionType", { enumerable: true, get: function () { return market_data_streamer_1.MarketDataSubscriptionType; } });
//Services:
var session_service_1 = __importDefault(require("./services/session-service"));
var account_status_service_1 = __importDefault(require("./services/account-status-service"));
var accounts_and_customers_service_1 = __importDefault(require("./services/accounts-and-customers-service"));
var balances_and_positions_service_1 = __importDefault(require("./services/balances-and-positions-service"));
var instruments_service_1 = __importDefault(require("./services/instruments-service"));
var margin_requirements_service_1 = __importDefault(require("./services/margin-requirements-service"));
var market_metrics_service_1 = __importDefault(require("./services/market-metrics-service"));
var net_liquidating_value_history_service_1 = __importDefault(require("./services/net-liquidating-value-history-service"));
var orders_service_1 = __importDefault(require("./services/orders-service"));
var risk_parameters_service_1 = __importDefault(require("./services/risk-parameters-service"));
var symbol_search_service_1 = __importDefault(require("./services/symbol-search-service"));
var transactions_service_1 = __importDefault(require("./services/transactions-service"));
var watchlists_service_1 = __importDefault(require("./services/watchlists-service"));
var TastytradeClient = /** @class */ (function () {
    // Test
    // public readonly httpClient: TastytradeHttpClient
    // public readonly accountStreamer: AccountStreamer
    // public readonly sessionService: SessionService
    // public readonly accountStatusService: AccountStatusService
    // public readonly accountsAndCustomersService: AccountsAndCustomersService
    // public readonly balancesAndPositionsService: BalancesAndPositionsService
    // public readonly instrumentsService: InstrumentsService
    // public readonly marginRequirementsService: MarginRequirementsService
    // public readonly marketMetricsService: MarketMetricsService
    // public readonly netLiquidatingValueHistoryService: NetLiquidatingValueHistoryService
    // public readonly orderService: OrderService
    // public readonly riskParametersService: RiskParametersService
    // public readonly symbolSearchService: SymbolSearchService
    // public readonly transactionsService: TransactionsService
    // public readonly watchlistsService: WatchlistsService
    function TastytradeClient(baseUrl, accountStreamerUrl) {
        this.baseUrl = baseUrl;
        this.accountStreamerUrl = accountStreamerUrl;
        this.httpClient = new tastytrade_http_client_1.default(baseUrl);
        this.accountStreamer = new account_streamer_1.AccountStreamer(accountStreamerUrl, this.session);
        this.sessionService = new session_service_1.default(this.httpClient);
        this.accountStatusService = new account_status_service_1.default(this.httpClient);
        this.accountsAndCustomersService = new accounts_and_customers_service_1.default(this.httpClient);
        this.balancesAndPositionsService = new balances_and_positions_service_1.default(this.httpClient);
        this.instrumentsService = new instruments_service_1.default(this.httpClient);
        this.marginRequirementsService = new margin_requirements_service_1.default(this.httpClient);
        this.marketMetricsService = new market_metrics_service_1.default(this.httpClient);
        this.netLiquidatingValueHistoryService = new net_liquidating_value_history_service_1.default(this.httpClient);
        this.orderService = new orders_service_1.default(this.httpClient);
        this.riskParametersService = new risk_parameters_service_1.default(this.httpClient);
        this.symbolSearchService = new symbol_search_service_1.default(this.httpClient);
        this.transactionsService = new transactions_service_1.default(this.httpClient);
        this.watchlistsService = new watchlists_service_1.default(this.httpClient);
    }
    Object.defineProperty(TastytradeClient.prototype, "session", {
        get: function () {
            return this.httpClient.session;
        },
        enumerable: false,
        configurable: true
    });
    return TastytradeClient;
}());
exports.default = TastytradeClient;
