/*
    Erstelle den Graphen für den Banner
*/
// API: https://min-api.cryptocompare.com/
const btc_url = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR";
const eth_url = "https://api.coinmarketcap.com/v2/ticker/1/?convert=EUR";

function loaded() {
  // getExchanges();
  getExchanges();
}

// Http Request an CryptoCompare für die Daten.
function getExchanges() {

  $.get(btc_url, function(responseText) {
    document.getElementById("btc-kurs").innerHTML = responseText["EUR"] + "€";
  });

}
