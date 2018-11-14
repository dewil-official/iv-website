/*
    Erstelle den Graphen für den Banner
*/
async function loaded() {
  getExchanges();
}

// Lade aktuelle Wechselkurse
async function getExchanges() {
  console.log("Getting currency exchanges...");
  // API: https://github.com/ccxt/ccxt
  console.log (ccxt.exchanges)
  // Binance Market
  const binance = new ccxt.binance({
    'enableRateLimit': true,
  });
  console.log(await binance.loadMarkets());
  //console.log(binance.markets['BTC/USD']);

}
