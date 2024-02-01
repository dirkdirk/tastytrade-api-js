import TastytradeSession from "../models/tastytrade-session";
export default class TastytradeHttpClient {
    private readonly baseUrl;
    readonly session: TastytradeSession;
    private readonly httpsAgent;
    constructor(baseUrl: string);
    private getDefaultHeaders;
    private executeRequest;
    getData(url: string, headers?: object, queryParams?: object): Promise<any>;
    postData(url: string, data: object, headers: object): Promise<any>;
    putData(url: string, data: object, headers: object): Promise<any>;
    patchData(url: string, data: object, headers: object): Promise<any>;
    deleteData(url: string, headers: object): Promise<any>;
}
