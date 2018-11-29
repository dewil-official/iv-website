/*
    Erstelle den Graphen für den Banner
*/
// API: https://min-api.cryptocompare.com/
const api_url = "https://min-api.cryptocompare.com/data/";

function loaded() {
  // getExchanges();
  getExchanges();
}

// Http Request an CryptoCompare für die Daten.
function getExchanges() {

  // Bitcoin Kurs
  setCurrency("btc");

  // Bitcoin Kurs
  setCurrency("eth");

  // Litecoin Kurs
  setCurrency("ltc");

  // XRP Kurs
  setCurrency("xrp");

  // Bitcoin Cash Kurs
  setCurrency("bch");

  // Monero Kurs
  setCurrency("xmr");

  // DashCoin Kurs
  setCurrency("dash");

  // Doge Kurs
  setCurrency("doge");

}

function setCurrency(name) {

  /*  Vereinheitlichung der Anfragen:                                    /
  /   Jquery sendet einen HttpRequest an das API, mithilfe einer         /
  /   zusammengesetzten URL aus API, Name und Parametern.               */
  var url = api_url + "price?fsym=" + name.toUpperCase() + "&tsyms=EUR";

  $.get(url, function(responseText) {
    // Bei Erhalt der Daten, aktualisiere die Seite.
    document.getElementById(name + "-kurs").innerHTML = responseText["EUR"] + "€";
  });

}
