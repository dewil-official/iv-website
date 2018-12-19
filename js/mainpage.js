/*
    Erstelle den Graphen für den Banner
*/
// API: https://min-api.cryptocompare.com/
const api_url = "https://min-api.cryptocompare.com/data/";

function loaded() {
  // getExchanges();
  getExchanges();
  fallbackExchanges();

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
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

function fallbackExchanges() {
  // Wenn nach 6 Sekunden die Kurse nicht geladen werden konnten, setze alternative Werte vom 19.12.2018
  setTimeout(function () {
    if (document.getElementById("btc-kurs").innerHTML == "Loading...") {
      document.getElementById("btc-kurs").innerHTML = "3343.74€";
      document.getElementById("eth-kurs").innerHTML = "91.47€";
      document.getElementById("ltc-kurs").innerHTML = "26.46€";
      document.getElementById("xrp-kurs").innerHTML = "0.3242€";
      document.getElementById("bch-kurs").innerHTML = "122.03€";
      document.getElementById("xmr-kurs").innerHTML = "42.04€";
      document.getElementById("dash-kurs").innerHTML = "67.86€";
      document.getElementById("doge-kurs").innerHTML = "0.00241€";
    }
  }, 6000);


}
