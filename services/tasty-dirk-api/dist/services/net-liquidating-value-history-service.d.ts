import TastytradeHttpClient from "./tastytrade-http-client";
export default class NetLiquidatingValueHistoryService {
    private httpClient;
    constructor(httpClient: TastytradeHttpClient);
    getNetLiquidatingValueHistory(accountNumber: string, queryParams?: {}): Promise<any>;
    getNetLiquidatingValue(accountNumber: string): Promise<any>;
}
