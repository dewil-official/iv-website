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
  const Http = new XMLHttpRequest();

  Http.open("GET", btc_url);
  Http.send();
  Http.onreadystatechange=(e)=>{
    try {
      var obj = JSON.parse(Http.responseText); // Convert response string to object
    } catch (err) { console.log(err); }

    console.log(obj["EUR"]); // Testing
    document.getElementById("btc-kurs").innerHTML = obj["EUR"] + "€"; // Display it on page
  }
}
