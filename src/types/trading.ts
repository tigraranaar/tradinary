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

export interface TradingSignalsServiceSignalResponse {
  symbol: string;
  timeframe: string;
  signal: "buy" | "sell" | "hold";
  timestamp: string;
  indicators: Record<string, number | null>;
}

export interface SignalResponse {
  symbol: string;
  timeframe: string;
  signal: "buy" | "sell" | "hold";
  timestamp: string;
  indicators: Record<string, number | null>;
}

export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

export interface PairsResponse {
  pairs: TradingPair[];
  timeframes: string[];
}
