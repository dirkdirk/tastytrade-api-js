import TastytradeHttpClient from "./tastytrade-http-client";
export default class MarketMetricsService {
    private httpClient;
    constructor(httpClient: TastytradeHttpClient);
    getMarketMetrics(queryParams?: {}): Promise<any>;
    getHistoricalDividendData(symbol: string): Promise<any>;
    getHistoricalEarningsData(symbol: string, queryParams?: {}): Promise<any>;
}
