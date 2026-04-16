import "server-only";
import type { GoldRateMap } from "@/lib/pricing";

export type GoldPriceSnapshot = {
  provider: string;
  sourceLabel: string;
  rates: GoldRateMap | null;
  fetchedAt: string | null;
  stale: boolean;
  available: boolean;
};

type MetalsDevLatestResponse = {
  status: string;
  currency: string;
  unit: string;
  metals?: {
    gold?: number;
  };
  timestamp?: string;
};

const DEFAULT_PROVIDER = "metalsdev";
const DEFAULT_REFRESH_SECONDS = 60;

export async function getCurrentGoldSnapshot(): Promise<GoldPriceSnapshot> {
  const provider = process.env.GOLD_PRICE_PROVIDER ?? DEFAULT_PROVIDER;

  if (provider !== "metalsdev") {
    return buildUnavailableSnapshot("unavailable");
  }

  const apiKey = process.env.METALS_DEV_API_KEY;

  if (!apiKey) {
    return buildUnavailableSnapshot("missing_api_key");
  }

  try {
    const refreshSeconds = Number(process.env.GOLD_PRICE_REFRESH_SECONDS ?? DEFAULT_REFRESH_SECONDS);
    const url = new URL("https://api.metals.dev/v1/latest");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("currency", "INR");
    url.searchParams.set("unit", "g");

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json"
      },
      next: {
        revalidate: Number.isFinite(refreshSeconds) ? refreshSeconds : DEFAULT_REFRESH_SECONDS
      }
    });

    if (!response.ok) {
      return buildUnavailableSnapshot("provider_error");
    }

    const payload = (await response.json()) as MetalsDevLatestResponse;
    const pureGoldPrice = payload.metals?.gold;

    if (typeof pureGoldPrice !== "number" || pureGoldPrice <= 0) {
      return buildUnavailableSnapshot("invalid_payload");
    }

    return {
      provider: "metalsdev",
      sourceLabel: "Live gold rate",
      rates: buildPurityRates(pureGoldPrice),
      fetchedAt: payload.timestamp ?? new Date().toISOString(),
      stale: false,
      available: true
    };
  } catch {
    return buildUnavailableSnapshot("network_error");
  }
}

export function buildPurityRates(pureGoldPricePerGram: number): GoldRateMap {
  return {
    "14k": roundRate((pureGoldPricePerGram * 14) / 24),
    "18k": roundRate((pureGoldPricePerGram * 18) / 24)
  };
}

function buildUnavailableSnapshot(provider: string): GoldPriceSnapshot {
  return {
    provider,
    sourceLabel: "Live gold rate unavailable",
    rates: null,
    fetchedAt: null,
    stale: true,
    available: false
  };
}

function roundRate(value: number) {
  return Math.round(value);
}
