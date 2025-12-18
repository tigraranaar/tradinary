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

export type SignalType = "strong_buy" | "buy" | "hold" | "sell" | "strong_sell";

export interface IndicatorVote {
  name: string;
  vote: string;
  value: number | null;
  reason: string;
}

export interface CategoryBreakdown {
  score: number;
  weight: number;
  weighted_score: number;
  indicators: IndicatorVote[];
}

export interface SignalAnalysis {
  signal: SignalType;
  confidence: number;
  score: number;
  market_regime: string;
  regime_confidence: number;
  breakdown: Record<string, CategoryBreakdown>;
}

export interface TradingSignalsServiceSignalResponse {
  symbol: string;
  timeframe: string;
  signal: SignalType;
  confidence: number;
  timestamp: string;
  analysis: SignalAnalysis;
  indicators: Record<string, number | null>;
}

export interface SignalResponse {
  symbol: string;
  timeframe: string;
  signal: SignalType;
  confidence: number;
  timestamp: string;
  analysis: SignalAnalysis;
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
