export interface TradingPair {
    symbol: string;
    name?: string;
}

export interface TradingSignalsServiceTradingPair {
    symbol: string;
    base_asset: string;
    quote_asset: string;
    status: string;
}

export interface SignalRequest {
    symbol: string;
    timeframe: string;
}

export interface TradingSignalsServicePairsResponse {
    pairs: TradingSignalsServiceTradingPair[];
    timeframes: string[];
    total_pairs: number;
}

export interface SignalIndicators {
    rsi?: number;
    macd?: number;
    macd_signal?: number;
    macd_histogram?: number;
    sma_20?: number;
    sma_50?: number;
    sma_200?: number;
    ema_12?: number;
    ema_26?: number;
    bb_upper?: number;
    bb_middle?: number;
    bb_lower?: number;
    volume?: number;
    [key: string]: number | undefined;
}

export interface TradingSignalsServiceSignalResponse {
    pair: string;
    timeframe: string;
    signal: 'BUY' | 'SELL' | 'HOLD' | 'NEUTRAL';
    confidence?: number;
    price?: number;
    timestamp?: string;
    indicators?: SignalIndicators;
    recommendation?: string;
    analysis?: string;
}

export type SignalResponse = TradingSignalsServiceSignalResponse;

export interface ApiError {
    error: string;
    message?: string;
    statusCode?: number;
}

export interface PairsResponse {
    pairs: TradingPair[];
    timeframes: string[];
}
