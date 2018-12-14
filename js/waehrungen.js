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
  populateDropdown();
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
  console.log("Selected " + nr);
  // Save, what currency is active.
  if (side == "left") {
    leftSelection = nr;
  } else if (side == "right") {
    rightSelection = nr;
  }

  // Update the dropdown box text
  $("#"+side+"-text").html(currencies[nr].name);

  // Update the inner box
  var obj = "";
  changeHtml("id", side + "-inner-box", obj);

  // Update dropdown list to match "is-active"

}

// Http Request an CryptoCompare für die Daten.
function populateDropdown() {

  var content = "";

  // Create Left DropDown Content
  for (i = 0; i < currencies.length; i++) {
    content += '<a class="dropdown-item'
    if (leftSelection==i) { content += ' is-active' }
    // content += ' onclick="select('+i+', 0)">'; // NOT WORKING
    content += '">';
    content += currencies[i].name;
    content += '</a>';
  }
  content = '<div class="dropdown-content">' + content + '</div>';

  changeHtml("id", "dropdown-menu-left", content);

  var content = "";

  // Create Right DropDown Content
  for (i = 0; i < currencies.length; i++) {
    content += '<a class="dropdown-item'
    if (leftSelection==i) { content += ' is-active' }
    // content += ' onclick="select('+i+', 1)">'; // NOT WORKING
    content += '">';
    content += currencies[i].name;
    content += '</a> ';
  }
  content = '<div class="dropdown-content">' + content + '</div>';

  changeHtml("id", "dropdown-menu-right", content);

  // Add Click Functions (Need to do in a function)
  // BUG: i stays the same (13) after the last for() and when "click" is called, i is always 1
  for (i = 0; i < $('#dropdown-menu-right > .dropdown-content > a').length - 1; i++) {
    $('#dropdown-menu-right > .dropdown-content > a').eq(i).click(function(){ select(i,"right"); return false; });
  }
  for (i = 0; i < $('#dropdown-menu-right > .dropdown-content > a').length - 1; i++) {
    $('#dropdown-menu-left > .dropdown-content > a').eq(i).click(function(){ select(i,"left"); return false; });
  }

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

// Helper Functions

function changeHtml(type, name, html) {
  if (type=="id") {
    document.getElementById(name).innerHTML = html;
  } else if (type=="class") {
    document.getElementByClassName(name).item(0).innerHTML = html;
  }
}
