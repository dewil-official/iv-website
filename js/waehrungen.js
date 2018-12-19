/*
    Erstelle den Graphen für den Banner
*/
// API: https://min-api.cryptocompare.com/
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
var leftSelection = "";
var rightSelection = "";

function loaded() {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
}

function toggleDropdown(side) {
  if (side == "left") {
    if ($(".dropdown:first").hasClass("is-active")) {
      $(".dropdown:first").removeClass("is-active");
    } else {
      $(".dropdown:first").addClass("is-active");
    }
  } else if (side == "right") {
    if ($(".dropdown:last").hasClass("is-active")) {
      $(".dropdown:last").removeClass("is-active");
    } else {
      $(".dropdown:last").addClass("is-active");
    }
  }
}

function select(nr, side) {

  // Save, what currency is active per variable.
  if (side == "left") {
    leftSelection = nr;
  } else if (side == "right") {
    rightSelection = nr;
  }

  // Update the dropdown box text
  $("#"+side+"-text").html(currencies[nr].name);

  // Close Dropdown Menu
  toggleDropdown(side);

  // URL für Anfrage an CryptoCompare
  var url = api_url + "histoday?fsym=" + currencies[nr].tag.toUpperCase() + "&tsym=EUR&limit=10";

  // Update the inner box -> Wait for network
  $.get(url, function(responseText) {

    // On the answer, create the inner box
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
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        //beginAtZero:true
                    }
                }]
            }
        }
    });

    if (!$("#" + side + "-bottom-box").hasClass("cbox-active")) {
      $("#" + side + "-bottom-box").addClass("cbox-active");
    }

  });

}

// Helper Functions

function changeHtml(type, name, html) {
  if (type=="id") {
    document.getElementById(name).innerHTML = html;
  } else if (type=="class") {
    document.getElementByClassName(name).item(0).innerHTML = html;
  }
}
