import TastytradeHttpClient from "./tastytrade-http-client";
export default class SessionService {
    httpClient: TastytradeHttpClient;
    constructor(httpClient: TastytradeHttpClient);
    login(usernameOrEmail: string, password: string, rememberMe?: boolean): Promise<any>;
    loginWithRememberToken(usernameOrEmail: string, rememberToken: string, rememberMe?: boolean): Promise<any>;
    validate(): Promise<any>;
    logout(): Promise<any>;
}
