export declare enum MarketDataSubscriptionType {
    Candle = "Candle",
    Quote = "Quote",
    Trade = "Trade",
    Summary = "Summary",
    Profile = "Profile",
    Greeks = "Greeks",
    Underlying = "Underlying"
}
export declare enum CandleType {
    Tick = "t",
    Second = "s",
    Minute = "m",
    Hour = "h",
    Day = "d",
    Week = "w",
    Month = "mo",
    ThirdFriday = "o",
    Year = "y",
    Volume = "v",
    Price = "p"
}
export declare type MarketDataListener = (data: any) => void;
export declare type ErrorListener = (error: any) => void;
export declare type AuthStateListener = (isAuthorized: boolean) => void;
export declare type CandleSubscriptionOptions = {
    period: number;
    type: CandleType;
    channelId: number;
};
declare type Remover = () => void;
export default class MarketDataStreamer {
    private webSocket;
    private token;
    private keepaliveIntervalId;
    private dataListeners;
    private openChannels;
    private subscriptionsQueue;
    private authState;
    private errorListeners;
    private authStateListeners;
    addDataListener(dataListener: MarketDataListener, channelId?: number | null): Remover;
    addErrorListener(errorListener: ErrorListener): Remover;
    addAuthStateChangeListener(authStateListener: AuthStateListener): Remover;
    connect(url: string, token: string): void;
    disconnect(): void;
    addSubscription(symbol: string, options?: {
        subscriptionTypes: MarketDataSubscriptionType[];
        channelId: number;
    }): Remover;
    /**
     * Adds a candle subscription (historical data)
     * @param streamerSymbol Get this from an instrument's streamer-symbol json response field
     * @param fromTime Epoch timestamp from where you want to start
     * @param options Period and Type are the grouping you want to apply to the candle data
     * For example, a period/type of 5/m means you want each candle to represent 5 minutes of data
     * From there, setting fromTime to 24 hours ago would give you 24 hours of data grouped in 5 minute intervals
     * @returns
     */
    addCandleSubscription(streamerSymbol: string, fromTime: number, options: CandleSubscriptionOptions): () => void;
    removeSubscription(symbol: string, options?: {
        subscriptionTypes: MarketDataSubscriptionType[];
        channelId: number;
    }): void;
    removeAllSubscriptions(channelId?: number): void;
    openFeedChannel(channelId: number): void;
    isChannelOpened(channelId: number): boolean;
    get isReadyToOpenChannels(): boolean;
    get isConnected(): boolean;
    private scheduleKeepalive;
    private sendKeepalive;
    private queueSubscription;
    private dequeueSubscription;
    private sendQueuedSubscriptions;
    /**
     *
     * @param {*} symbol
     * @param {*} subscriptionTypes
     * @param {*} channelId
     * @param {*} direction add or remove
     */
    private sendSubscriptionMessage;
    private onError;
    private onOpen;
    private onClose;
    private clearKeepalive;
    get isDxLinkAuthorized(): boolean;
    private handleAuthStateMessage;
    private handleChannelOpened;
    private notifyListeners;
    private notifyErrorListeners;
    private handleMessageReceived;
    private sendMessage;
}
export {};
