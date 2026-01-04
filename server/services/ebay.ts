import axios from "axios";
import qs from "qs";
import NodeCache from "node-cache";

interface EbayListing {
  itemId: string;
  title: string;
  price: {
    value: string;
    currency: string;
  };
  condition: string;
  conditionId: string;
  itemWebUrl: string;
  image?: {
    imageUrl: string;
  };
}

interface EbaySearchResponse {
  total: number;
  itemSummaries?: EbayListing[];
}

interface MarketValueResult {
  estimatedValue: number;
  activeCount: number;
  currency: string;
  strategy: "High-End" | "Mass-Market";
  averagePrice: number;
  medianPrice: number;
  priceRange: { min: number; max: number };
  listings: Array<{
    title: string;
    price: number;
    condition: string;
    url: string;
  }>;
  fromCache: boolean;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export class EbayService {
  private cache: NodeCache;
  private tokenCache: NodeCache;
  private readonly HIGH_END_BRANDS = /Steinway|Bösendorfer|Fazioli|Bechstein|Blüthner|Grotrian/i;
  private readonly EXCLUDE_TERMS = /Digital|Silent|Cover|Bench|Transport|Miete|Rental|Stuhl|Hocker|Lampe|Zubehör|Accessories/i;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
    this.tokenCache = new NodeCache({ stdTTL: 3500 });
  }

  private async getAccessToken(): Promise<string | null> {
    const cachedToken = this.tokenCache.get<string>("ebay_token");
    if (cachedToken) {
      console.log("[eBay] Using cached access token");
      return cachedToken;
    }

    const clientId = process.env.EBAY_APP_ID;
    const clientSecret = process.env.EBAY_CERT_ID;

    if (!clientId || !clientSecret) {
      console.error("[eBay] Missing EBAY_APP_ID or EBAY_CERT_ID environment variables");
      return null;
    }

    try {
      const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
      
      const response = await axios.post<TokenResponse>(
        "https://api.ebay.com/identity/v1/oauth2/token",
        qs.stringify({
          grant_type: "client_credentials",
          scope: "https://api.ebay.com/oauth/api_scope",
        }),
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 10000,
        }
      );

      const token = response.data.access_token;
      const expiresIn = response.data.expires_in || 7200;
      
      this.tokenCache.set("ebay_token", token, expiresIn - 300);
      console.log(`[eBay] Access token obtained, expires in ${expiresIn}s`);
      
      return token;
    } catch (error: any) {
      console.error("[eBay] Token request failed:", error.response?.data || error.message);
      return null;
    }
  }

  async searchActivePianos(query: string): Promise<{ data: EbaySearchResponse; fromCache: boolean } | null> {
    const cacheKey = `search:${query.toLowerCase().trim()}`;
    
    const cachedResult = this.cache.get<EbaySearchResponse>(cacheKey);
    if (cachedResult) {
      console.log(`[eBay] Cache HIT for query: "${query}"`);
      return { data: cachedResult, fromCache: true };
    }

    console.log(`[eBay] Cache MISS for query: "${query}" - fetching from API`);

    const token = await this.getAccessToken();
    if (!token) {
      console.error("[eBay] Cannot search - no valid token");
      return null;
    }

    try {
      const params = {
        q: query,
        category_ids: "43376",
        limit: "20",
        sort: "price",
        filter: "price:[1000..250000],priceCurrency:EUR,conditionIds:{3000|4000|5000|2000|2500},buyingOptions:{FIXED_PRICE|BEST_OFFER}",
      };

      const response = await axios.get<EbaySearchResponse>(
        "https://api.ebay.com/buy/browse/v1/item_summary/search",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-EBAY-C-MARKETPLACE-ID": "EBAY_DE",
            "Content-Type": "application/json",
          },
          params,
          timeout: 15000,
        }
      );

      const result = response.data;
      console.log(`[eBay] Found ${result.total || 0} total listings, returned ${result.itemSummaries?.length || 0}`);
      
      this.cache.set(cacheKey, result, 3600);
      
      return { data: result, fromCache: false };
    } catch (error: any) {
      console.error("[eBay] Search request failed:", error.response?.data || error.message);
      return null;
    }
  }

  calculateMarketValue(listings: EbayListing[], query: string): MarketValueResult | null {
    if (!listings || listings.length === 0) {
      return null;
    }

    const filteredListings = listings.filter((listing) => {
      return !this.EXCLUDE_TERMS.test(listing.title);
    });

    if (filteredListings.length === 0) {
      console.log("[eBay] All listings filtered out by exclusion terms");
      return null;
    }

    const prices = filteredListings
      .map((listing) => parseFloat(listing.price.value))
      .filter((price) => !isNaN(price) && price > 0)
      .sort((a, b) => a - b);

    if (prices.length === 0) {
      return null;
    }

    const isHighEnd = this.HIGH_END_BRANDS.test(query);
    let averagePrice: number;
    let strategy: "High-End" | "Mass-Market";

    if (isHighEnd) {
      strategy = "High-End";
      const midStart = Math.floor(prices.length * 0.25);
      const midEnd = Math.min(midStart + 5, prices.length);
      const medianPrices = prices.slice(midStart, midEnd);
      averagePrice = medianPrices.reduce((sum, p) => sum + p, 0) / medianPrices.length;
      console.log(`[eBay] High-End strategy: Using median 5 prices from index ${midStart} to ${midEnd}`);
    } else {
      strategy = "Mass-Market";
      const lowestPrices = prices.slice(0, Math.min(5, prices.length));
      averagePrice = lowestPrices.reduce((sum, p) => sum + p, 0) / lowestPrices.length;
      console.log(`[eBay] Mass-Market strategy: Using lowest ${lowestPrices.length} prices`);
    }

    const estimatedValue = Math.round(averagePrice * 0.836);

    const medianPrice = prices.length % 2 === 0
      ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2
      : prices[Math.floor(prices.length / 2)];

    return {
      estimatedValue,
      activeCount: filteredListings.length,
      currency: "EUR",
      strategy,
      averagePrice: Math.round(averagePrice),
      medianPrice: Math.round(medianPrice),
      priceRange: {
        min: Math.min(...prices),
        max: Math.max(...prices),
      },
      listings: filteredListings.slice(0, 5).map((listing) => ({
        title: listing.title,
        price: parseFloat(listing.price.value),
        condition: listing.condition || "Unknown",
        url: listing.itemWebUrl,
      })),
      fromCache: false,
    };
  }

  getCacheStats(): { keys: number; hits: number; misses: number } {
    const stats = this.cache.getStats();
    return {
      keys: stats.keys,
      hits: stats.hits,
      misses: stats.misses,
    };
  }
}

export const ebayService = new EbayService();
