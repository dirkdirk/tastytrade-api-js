export default class TastytradeSession {
    authToken: string | null;
    get isValid(): boolean;
    clear(): void;
}
