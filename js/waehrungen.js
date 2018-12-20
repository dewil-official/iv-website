/*---------------------------------------------------------------/
/     Skript für Vergleich von Wechselkursen                     /
/     -> API für Daten: https://min-api.cryptocompare.com/       /
/---------------------------------------------------------------*/

// Konstante Daten: API und Liste der Währungsnamen
const api_url = "https://min-api.cryptocompare.com/data/";
const currencies =
[
  { tag:"btc", name:"Bitcoin"},
  { tag:"eth", name:"Ethereum"},
  { tag:"ltc", name:"Litecoin"},
  { tag:"xrp", name:"XRP"},
  { tag:"bch", name:"Bitcoin Cash"},
  { tag:"xmr", name:"Monero"},
  { tag:"dash", name:"Dash"},
  { tag:"doge", name:"Dogecoin"},
  { tag:"xlm", name:"Stellar"},
  { tag:"usdt", name:"Tether"},
  { tag:"mkr", name:"Maker"},
  { tag:"zec", name:"Zcash"},
  { tag:"etc", name:"Ethereum Classic"},
  { tag:"bcn", name:"Bytecoin"},
];

// Speichert die aktuelle Auswahl
var leftSelection = "";
var rightSelection = "";

// Ein und Ausklappen der Dropdowns
function toggleDropdown(side) {
  if (side == "left") {
    $(".dropdown:first").toggleClass("is-active");
  } else if (side == "right") {
    $(".dropdown:last").toggleClass("is-active");
  }
}

// Dropdown Auswahl für die einzelnen Währungen
function select(nr, side) {

  // Speichere die Auswahl
  if (side == "left") {
    leftSelection = nr;
  } else if (side == "right") {
    rightSelection = nr;
  }

  // Update den Button Text vom DropDown
  $("#"+side+"-text").html(currencies[nr].name);

  // Schließe das Dropdown Menü
  toggleDropdown(side);

  // URL für Anfrage an CryptoCompare
  var url = api_url + "histoday?fsym=" + currencies[nr].tag.toUpperCase() + "&tsym=EUR&limit=10";

  // Netzwerkanfrage an API -> Bei Antwort ändere HTML
  $.get(url, function(responseText) {

    // Erstellen des HTML Codes für die innere Box
    var obj = "<div class='columns'><div class='column is-two-thirds'>";
    obj += "<canvas id='" + side + "-chart' width='400' height='400'></canvas></div>";
    obj += "<div class='column'><h4 class='title is-4'>"+currencies[nr].name+"</h4></div></div>";
    changeHtml("id", side + "-inner-box", obj);

    // Datenverarbeitung
    var chartData = { prices: [], labels: [] };
    let dayCount = responseText.Data.length - 1;

    // Erstelle Datenobjekt für das Diagramm
    for (let d of responseText.Data) {
      chartData.prices.push(d.close);
      let dt = new Date();
      dt.setDate(dt.getDate() - dayCount);
      chartData.labels.push(dt.getDate() + "." + (dt.getMonth() + 1));
      dayCount -= 1;
    }

    console.log(chartData);

    // Währungsdiagramm
    var ctx = $("#"+side + "-chart")[0].getContext('2d');
    var newChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Kurs in €',
                data: chartData.prices,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    // Einweg Toggle für die Hintergrundfarbe des Dropdowns (Farbdivider)
    if (!$("#" + side + "-bottom-box").hasClass("cbox-active")) {
      $("#" + side + "-bottom-box").addClass("cbox-active");
    }

  });

}

// Hilfsfunktion: Ändere HTML Content
function changeHtml(type, name, html) {
  if (type=="id") {
    document.getElementById(name).innerHTML = html;
  } else if (type=="class") {
    document.getElementByClassName(name).item(0).innerHTML = html;
  }
}
