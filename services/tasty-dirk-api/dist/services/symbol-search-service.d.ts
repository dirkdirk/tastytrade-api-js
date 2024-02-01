import TastytradeHttpClient from "./tastytrade-http-client";
export default class SymbolSearchService {
    private httpClient;
    constructor(httpClient: TastytradeHttpClient);
    getSymbolData(symbol: string): Promise<any>;
}
