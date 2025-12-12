import { SignalRequest, SignalResponse, PairsResponse, TradingSignalsServicePairsResponse, TradingSignalsServiceSignalResponse } from '@/types/trading';

const TRADING_SIGNALS_SERVICE_APIURL = process.env.TRADING_SIGNALS_SERVICE_API_URL;
const TRADING_SIGNALS_SERVICE_APIKEY = process.env.TRADING_SIGNALS_SERVICE_API_KEY;

if (!TRADING_SIGNALS_SERVICE_APIURL || !TRADING_SIGNALS_SERVICE_APIKEY) {
    console.warn('Trading Signals Service API credentials not configured');
}

async function tradingSignalsServiceApiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${TRADING_SIGNALS_SERVICE_APIURL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': TRADING_SIGNALS_SERVICE_APIKEY!,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `Trading Signals Service API error (${response.status}): ${errorText || response.statusText}`
        );
    }

    return response.json();
}

export async function getPairs(): Promise<PairsResponse> {
    try {
        const data = await tradingSignalsServiceApiFetch<TradingSignalsServicePairsResponse>('/api/v1/pairs', {
            method: 'GET',
        });

        return {
            pairs: data.pairs.map((pair) => ({
                symbol: pair.symbol,
                name: `${pair.base_asset}/${pair.quote_asset}`,
            })),
            timeframes: data.timeframes
        };
    } catch (error) {
        console.error('Error fetching pairs:', error);
        throw error;
    }
}

/**
 * Get trading signal for a specific pair and timeframe
 */
export async function getSignal(request: SignalRequest): Promise<SignalResponse> {
    try {
        const data = await tradingSignalsServiceApiFetch<TradingSignalsServiceSignalResponse>('/api/v1/signal', {
            method: 'POST',
            body: JSON.stringify(request),
        });

        return data;
    } catch (error) {
        console.error('Error fetching signal:', error);
        throw error;
    }
}
