/*
    Erstelle den Graphen für den Banner
*/
function loadIndex() {
}

// Lade aktuelle Wechselkurse
function getExchanges() {
  var a = httpGet('https://x-crypto.com/api/ticker/btc/eur');
  console.log(a);
  //document.getElementById('btc-kurs').innerHTML =
}

// Hilfsfunktion zum Erhalten von Webdaten
function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
