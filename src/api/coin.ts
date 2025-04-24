export async function fetchCoins() {
  const response = await fetch("https://api.coinpaprika.com/v1/coins");

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}
