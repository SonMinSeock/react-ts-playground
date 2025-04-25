const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function fetchCoinInfo(coinId: string) {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export async function fetchCoinTickers(coinId: string) {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export async function fetchCoinHistory(coinId: string) {
  const response = await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`);

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  const result = await response.json();
  return result;
}
