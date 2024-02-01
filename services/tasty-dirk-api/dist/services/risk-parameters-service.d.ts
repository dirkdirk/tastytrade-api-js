import TastytradeHttpClient from "./tastytrade-http-client";
export default class RiskParametersService {
    private httpClient;
    constructor(httpClient: TastytradeHttpClient);
    getEffectiveMarginRequirements(accountNumber: string, underlyingSymbol: string): Promise<any>;
    getPositionLimit(accountNumber: string): Promise<any>;
}
